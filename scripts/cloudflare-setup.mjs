// One-off, idempotent Cloudflare setup for this site: R2 bucket, custom domains, rewrite and
// redirect rules, HTTPS and bot settings. Safe to re-run. Usage: node scripts/cloudflare-setup.mjs
import { cf, account, bucket, domain, zoneId } from "./cf.mjs";

const zone = await zoneId();
const report = (label, r) => console.log(r.ok ? "ok  " : "FAIL", label, r.ok ? "" : JSON.stringify(r.errors));

// 1. Bucket and custom domains
const buckets = await cf("GET", `/accounts/${account}/r2/buckets`);
if (!buckets.result.buckets.some((b) => b.name === bucket)) report(`create bucket ${bucket}`, await cf("POST", `/accounts/${account}/r2/buckets`, { name: bucket }));
const attached = (await cf("GET", `/accounts/${account}/r2/buckets/${bucket}/domains/custom`)).result?.domains?.map((d) => d.domain) ?? [];
for (const d of [domain, `www.${domain}`]) {
  if (attached.includes(d)) continue;
  report(`attach ${d}`, await cf("POST", `/accounts/${account}/r2/buckets/${bucket}/domains/custom`, { domain: d, zoneId: zone, enabled: true, minTLS: "1.2" }));
}

// 2. Rules. Each PUT replaces the whole phase, so these are the complete rule sets for the zone.
const phase = (name, rules) => cf("PUT", `/zones/${zone}/rulesets/phases/${name}/entrypoint`, { rules });

// Agents that send "Accept: text/markdown" get the markdown twin of a page; everyone else gets HTML.
// The three conditions are mutually exclusive so rule order does not matter.
const wantsMd = 'any(http.request.headers["accept"][*] contains "text/markdown")';
const isDir = 'ends_with(http.request.uri.path, "/")';
const rewrite = (description, expression, path) => ({ description, expression, action: "rewrite", action_parameters: { uri: { path } } });
report("rewrite: index.html for directories, markdown for agents", await phase("http_request_transform", [
  rewrite("Serve index.html for directory URLs", `(${isDir} and not ${wantsMd})`, { expression: 'concat(http.request.uri.path, "index.html")' }),
  rewrite("Markdown for agents: home page", `(http.request.uri.path eq "/" and ${wantsMd})`, { value: "/index.md" }),
  rewrite("Markdown for agents: other pages", `(${isDir} and http.request.uri.path ne "/" and ${wantsMd})`, { expression: 'concat(substring(http.request.uri.path, 0, -1), ".md")' }),
]));

// Response headers: advertise the machine-readable resources (RFC 8288 Link headers), tell caches
// that pages vary by Accept, and point each markdown twin back at its HTML page as canonical.
const header = (description, expression, headers) => ({ description, expression, action: "rewrite", action_parameters: { headers } });
report("headers: Link, Vary and canonical", await phase("http_response_headers_transform", [
  // raw.* is the URL as requested, before the rewrites above.
  header("Discovery links and Vary on pages", 'ends_with(raw.http.request.uri.path, "/")', {
    Link: { operation: "set", value: '</llms.txt>; rel="describedby"; type="text/plain", </sitemap-index.xml>; rel="sitemap"; type="application/xml", </rss.xml>; rel="alternate"; type="application/rss+xml"' },
    Vary: { operation: "set", value: "Accept" },
  }),
  header("Canonical for markdown twins", '(ends_with(http.request.uri.path, ".md") and http.request.uri.path ne "/index.md")', {
    Link: { operation: "set", expression: `concat("<https://${domain}", substring(http.request.uri.path, 0, -3), "/>; rel=\\"canonical\\"")` },
  }),
]));

report("redirect: www to apex, and add missing trailing slashes", await phase("http_request_dynamic_redirect", [
  {
    description: "Redirect www to apex",
    expression: `(http.host eq "www.${domain}")`,
    action: "redirect",
    action_parameters: { from_value: { status_code: 301, target_url: { expression: `concat("https://${domain}", http.request.uri.path)` }, preserve_query_string: true } },
  },
  {
    // /trails/stelvio-pass -> /trails/stelvio-pass/ (R2 has no directory index, so the bare path would 404)
    description: "Add trailing slash to extensionless paths",
    expression: '(not ends_with(http.request.uri.path, "/") and not http.request.uri.path contains ".")',
    action: "redirect",
    action_parameters: { from_value: { status_code: 301, target_url: { expression: 'concat(http.request.uri.path, "/")' }, preserve_query_string: true } },
  },
]));

report("cache: cache HTML at the edge, honouring origin headers", await phase("http_request_cache_settings", [{
  description: "Cache everything, including HTML",
  expression: "true",
  action: "set_cache_settings",
  action_parameters: { cache: true },
}]));

// 3. HTTPS and performance settings
const setting = (id, value) => cf("PATCH", `/zones/${zone}/settings/${id}`, { value });
for (const [id, value] of Object.entries({
  always_use_https: "on",
  automatic_https_rewrites: "on",
  min_tls_version: "1.2",
  tls_1_3: "on",
  http3: "on",
  "0rtt": "on",
  early_hints: "on",
  brotli: "on",
  browser_check: "off", // Browser Integrity Check blocks some legitimate crawlers
  email_obfuscation: "off", // otherwise Cloudflare injects a script on every page that shows the contact address
  security_level: "essentially_off",
  security_header: { strict_transport_security: { enabled: true, max_age: 15552000, include_subdomains: false, preload: false, nosniff: true } },
})) report(`setting ${id}`, await setting(id, value));

// 4. Bots: let every crawler in, including AI crawlers, and serve our own robots.txt
report("bots: allow all crawlers", await cf("PUT", `/zones/${zone}/bot_management`, {
  fight_mode: false,
  ai_bots_protection: "disabled",
  crawler_protection: "disabled",
  is_robots_txt_managed: false,
  cf_robots_variant: "off", // do not inject Cloudflare policy text into robots.txt
  enable_js: false,
}));

// 5. Email: forward contact@<domain> to the private address in CONTACT_FORWARD_TO (.env).
// The destination has to click a verification email from Cloudflare once before forwarding works.
const forwardTo = process.env.CONTACT_FORWARD_TO;
if (forwardTo) {
  const addresses = (await cf("GET", `/accounts/${account}/email/routing/addresses?per_page=50`)).result ?? [];
  const existing = addresses.find((a) => a.email === forwardTo);
  if (!existing) report(`email: add destination (verification email sent)`, await cf("POST", `/accounts/${account}/email/routing/addresses`, { email: forwardTo }));
  else console.log(existing.verified ? "ok   email: destination verified" : "WAIT email: destination not verified yet, click the link Cloudflare emailed");
  const routing = await cf("GET", `/zones/${zone}/email/routing`);
  if (routing.result?.enabled !== true || routing.result?.status !== "ready") report("email: enable routing and add MX/SPF records", await cf("POST", `/zones/${zone}/email/routing/dns`, {}));
  const contact = `contact@${domain}`;
  const rules = (await cf("GET", `/zones/${zone}/email/routing/rules?per_page=50`)).result ?? [];
  const rule = { name: `Forward ${contact}`, enabled: true, matchers: [{ type: "literal", field: "to", value: contact }], actions: [{ type: "forward", value: [forwardTo] }] };
  const old = rules.find((r) => r.matchers?.some((m) => m.value === contact));
  report(`email: ${contact} forwards to the private address`, old ? await cf("PUT", `/zones/${zone}/email/routing/rules/${old.id}`, rule) : await cf("POST", `/zones/${zone}/email/routing/rules`, rule));
}
