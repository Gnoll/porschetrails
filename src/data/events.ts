import type { EventItem } from "./types";

// Dates change every year. `when` describes the usual slot; the official site is the source of truth.
export const events: EventItem[] = [
  {
    slug: "targa-tasmania",
    lat: -41.4332,
    lng: 147.1441,
    name: "Targa Tasmania",
    kind: "Tarmac rally",
    where: "Tasmania, Australia",
    when: "November (returned in 2025 after a two-year pause)",
    summary:
      "The best-known tarmac rally in the world, first run in 1992 over closed public roads across Tasmania. After fatal accidents in 2021 and 2022 the event was suspended and its rules were reviewed; it returned in a revised format in November 2025. The 2026 edition runs in November from Launceston to Hobart and adds a three-day Targa Trofeo sub-event in the north of the island.",
    marque:
      "No marque has a stronger record here. Jim Richards and Barry Oliver won the event eight times in Porsches, and 911s of every generation fill the entry list. The touring categories let you drive the closed stages at a controlled pace in a standard road car, and Porsche clubs have often entered as groups.",
    url: "https://targa.com.au/",
    image: "event-targa-tasmania",
    imageAlt: "A competition car on a closed-road stage of Targa Tasmania",
    relatedTrail: "lyell-highway-tasmania",
  },
  {
    slug: "targa-newfoundland",
    lat: 47.5615,
    lng: -52.7126,
    name: "Targa Newfoundland",
    kind: "Tarmac rally",
    where: "Newfoundland, Canada",
    when: "September",
    summary:
      "North America's only Targa-style rally, held since 2002 on closed roads through the fishing villages and coastal highways of eastern Newfoundland. The 2026 event ran from 10 to 18 September out of St. John's, with an eight-day and a six-day competition.",
    marque:
      "The stages run through small towns with tight junctions and narrow streets, where an older, narrower 911 or a Cayman is easier to place than a current wide-body car. The event has always welcomed entry-level crews, with a time-speed-distance class that does not need a fully prepared rally car.",
    url: "https://targanfld.com/",
    image: "event-targa-newfoundland",
    imageAlt: "A rally car at speed on a wet stage of Targa Newfoundland",
    relatedTrail: "cabot-trail",
  },
  {
    slug: "targa-florio-classica",
    lat: 38.1157,
    lng: 13.3615,
    name: "Targa Florio Classica",
    kind: "Tarmac rally",
    where: "Sicily, Italy",
    when: "October",
    summary:
      "The modern successor to the oldest sports car race in the world. The original Targa Florio ran from 1906 to 1977. Today's event is a regularity rally for historic cars on the same Madonie roads, starting from Palermo, with a companion category for modern GT cars.",
    marque:
      "Porsche won the original race outright eleven times and named the 911 Targa after it, so a Porsche is as appropriate here as any car can be. Regularity events reward precision over power, and you do not need a competition licence for most categories. Even if you never enter, the public roads of the circuit are open all year.",
    url: "https://www.targaflorio.it/",
    image: "event-targa-florio",
    imageAlt: "The historic refuelling pits of the Targa Florio at Floriopoli, Sicily",
    relatedTrail: "targa-florio-circuit",
  },
  {
    slug: "tarmac-west",
    lat: -31.9523,
    lng: 115.8613,
    name: "Tarmac West (formerly Targa West)",
    kind: "Tarmac rally",
    where: "Perth, Western Australia",
    when: "September",
    summary:
      "Western Australia's four-day tarmac rally, long known as Targa West, now runs as Tarmac West. Stages are held in the Perth Hills, Toodyay and the Swan Valley, with a finale in the streets of the city. The 2026 event ran from 17 to 20 September.",
    marque:
      "Short, technical stages with a city-centre finish. Porsches have long been among the most numerous cars in the modern and classic classes, and the Porsche Club of Western Australia is a good first contact for anyone thinking of entering.",
    url: "https://tarmacevents.com.au/",
    image: "event-tarmac-west",
    imageAlt: "A competitor in the Targa West rally in Western Australia",
  },
  {
    slug: "adelaide-rally",
    lat: -34.9285,
    lng: 138.6007,
    name: "Adelaide Rally",
    kind: "Tarmac rally",
    where: "Adelaide Hills, South Australia",
    when: "Late November",
    summary:
      "A tarmac rally through the Adelaide Hills that grew out of the Classic Adelaide. It combines competitive closed-road stages with large touring categories and a street party in the city's east end.",
    marque:
      "The hills stages, on roads such as Gorge Road and Corkscrew Road, are narrow and twisty. The tour categories are among the most accessible ways to drive closed roads in a standard car, and they attract Porsches from air-cooled 911s to current GT models.",
    url: "https://www.adelaiderally.com.au/",
    image: "event-adelaide-rally",
    imageAlt: "Gorge Road winding through the Adelaide Hills, a stage used by the rally",
  },
  {
    slug: "silver-fern-tarmac-rally",
    name: "Targa New Zealand / NZ Silver Fern Tarmac Rally",
    kind: "Tarmac rally",
    where: "New Zealand",
    when: "Biennial from 2027",
    summary:
      "Targa New Zealand ran annually from 1995. Its organisers have announced a rebrand to the NZ Silver Fern Tarmac Rally and a move to a biennial format from 2027, with two-day, five-day and seven-day options covering up to about 1,050 km of special stages.",
    marque:
      "New Zealand's closed-road stages are fast, flowing and cambered, which suits a 911, and the event has always had a concurrent tour for road cars.",
    url: "https://targa.nz/",
    image: "event-silver-fern",
    imageAlt: "Competition cars lined up at Targa New Zealand",
    relatedTrail: "crown-range-road",
  },
  {
    slug: "tour-de-corse-historique",
    lat: 42.3063,
    lng: 9.1497,
    name: "Tour de Corse Historique",
    kind: "Tarmac rally",
    where: "Corsica, France",
    when: "October",
    summary:
      "A week-long historic rally around Corsica, the 'rally of ten thousand corners'. It runs competition and regularity categories for cars from earlier eras over the same mountain roads that hosted the World Rally Championship.",
    marque:
      "Historic 911s are among the most popular and most competitive cars in the field, as they are in most European historic tarmac rallies. Corsica's roads are narrow, bumpy and endlessly twisting. Out of season, they make one of Europe's best driving holidays.",
    url: "https://www.tourdecorse-historique.fr/",
    image: "event-tour-de-corse",
    imageAlt: "The D81 coast road cut into the red cliffs of the Calanques de Piana, Corsica",
  },
  {
    slug: "rennsport-reunion",
    name: "Porsche Rennsport Reunion",
    kind: "Gathering",
    where: "United States (most recently WeatherTech Raceway Laguna Seca, California)",
    when: "Held every few years; no fixed date",
    summary:
      "The largest gathering of Porsche racing cars and the people who drove them. The first was held at Lime Rock Park in 2001, and the event has since been run by Porsche Cars North America at Daytona and Laguna Seca. The seventh, at Laguna Seca from 28 September to 1 October 2023, marked 75 years of Porsche sports cars. At the time of writing we could not find an announced date for the next one.",
    marque:
      "Historic racing, demonstration runs and a paddock you can walk through, with cars from the 550 Spyder to the 919 Hybrid and thousands of owners' cars parked in model-specific corrals. If one is announced, book accommodation on the Monterey Peninsula immediately, and allow time for Highway 1 through Big Sur.",
    url: "https://newsroom.porsche.com/en.html",
    urlLabel: "Porsche Newsroom",
    image: "event-rennsport-reunion",
    imageAlt: "A white 1968 Porsche 907 in the paddock at Rennsport Reunion IV at Laguna Seca in 2011",
    relatedTrail: "pacific-coast-highway-big-sur",
  },
  {
    slug: "luftgekuhlt",
    name: "Luftgekühlt",
    kind: "Gathering",
    where: "United States (location changes each year)",
    when: "Usually autumn; Luft 12 is on 10 October 2026 near Atlanta",
    summary:
      "A curated show of air-cooled Porsches, founded in Los Angeles in 2014 by the racing driver Patrick Long and the creative director Howie Idelson. Each edition takes over an unusual venue, from a lumber yard to a film studio backlot, and the cars are arranged as much for how they look together as for what they are. Luft 12 is scheduled for Saturday 10 October 2026 at the Town at Trilith in Fayetteville, Georgia, south of Atlanta.",
    marque:
      "The name is German for 'air-cooled', so the show covers the 356, 914 and every 911 up to the 993, along with air-cooled racing cars. Tickets are sold in advance and have sold out in past years. The venue changes, so check the organisers' site before making plans.",
    url: "https://luftgekuhlt.com/",
    image: "event-luftgekuhlt",
    imageAlt: "Aerial view of the Porsche Cars North America headquarters and Experience Center in Atlanta, the city hosting Luftgekühlt in 2026",
  },
  {
    slug: "porsche-parade",
    name: "PCA Porsche Parade and Treffen",
    kind: "Gathering",
    where: "North America (location changes each year)",
    when: "Parade in early summer; Treffen weekends in spring and autumn",
    summary:
      "Porsche Parade is the annual national convention of the Porsche Club of America, first held in 1956. It lasts a week and combines a concours, an autocross, a time-speed-distance rally, technical sessions and organised drives. The 70th Parade was held at Lake Placid, New York, from 14 to 20 June 2026. Treffen is the club's shorter, resort-based touring weekend, held at different destinations.",
    marque:
      "Parade is open to PCA members and is the best single place to meet North American owners of every model, from 356s to Taycans. The driving tours are planned by local members who know the roads. Registration opens months ahead and the popular events fill quickly.",
    url: "https://porscheparade.org/",
    image: "event-porsche-parade",
    imageAlt: "A black Porsche 911 RS America among other air-cooled cars at a Porsche Club of America event",
    relatedTrail: "blue-ridge-parkway",
  },
  {
    slug: "porsche-supercup",
    name: "Porsche Mobil 1 Supercup",
    kind: "Race series",
    where: "European Formula 1 circuits",
    when: "May to September",
    summary:
      "Porsche's international one-make series, run since 1993 as a support race at Formula 1 Grands Prix in Europe. Every driver uses an identical 911 Cup car. The 2026 season comprised seven race weekends, including Monaco, Spa-Francorchamps, Zandvoort and a finale at Monza.",
    marque:
      "The top step of Porsche's one-make ladder and the closest racing you will see between 911s. Because the series travels with Formula 1, tickets are Grand Prix tickets. A round at Spa or the Red Bull Ring combines well with a road trip through the Ardennes or the Alps.",
    url: "https://racing.porsche.com/",
    urlLabel: "Porsche Motorsport",
    image: "event-supercup",
    imageAlt: "Porsche 911 GT3 Cup cars following the safety car at the Hungaroring during a Porsche Supercup race in 2019",
    relatedTrail: "nurburgring-nordschleife",
  },
  {
    slug: "porsche-carrera-cup",
    name: "Porsche Carrera Cup",
    kind: "Race series",
    where: "National series in Germany, Great Britain, France, Italy, North America, Australia, Asia and elsewhere",
    when: "Spring to autumn (varies by country)",
    summary:
      "The national and regional championships below the Supercup, all using the 911 Cup car. Carrera Cup Deutschland, the oldest, dates from 1990, and Carrera Cup Great Britain has supported the British Touring Car Championship for most of its history. Calendars and support packages differ by country and change each season.",
    marque:
      "The most accessible way to watch 911s raced hard at a circuit near you, usually on a ticket that also covers a touring car or GT meeting. Many drivers who went on to factory careers started here.",
    url: "https://racing.porsche.com/",
    urlLabel: "Porsche Motorsport",
    image: "event-carrera-cup",
    imageAlt: "Two Porsche 911 Cup cars racing at Thruxton in the 2026 Porsche Carrera Cup Great Britain",
  },
  {
    slug: "porsche-sprint-challenge",
    name: "Porsche Sprint Challenge and Sports Cup",
    kind: "Race series",
    where: "Regional series in Europe, North America and elsewhere",
    when: "Spring to autumn (varies by region)",
    summary:
      "The entry level of Porsche's one-make racing, aimed at amateur drivers. Sprint Challenge series run in several regions with 911 Cup and 718 Cayman GT4 Clubsport cars, and in Germany the Porsche Sports Cup offers sprint and endurance races together with timed sessions for road-registered cars. In North America, the Porsche Club of America's Club Racing programme fills a similar role.",
    marque:
      "If you want to go beyond track days, this is where the factory ladder starts. The Sports Cup in particular has had classes for standard road-going GT cars, so you can take part in the car you drove to the circuit. Regulations and eligibility change, so check with the organiser for your region.",
    url: "https://racing.porsche.com/",
    urlLabel: "Porsche Motorsport",
    image: "event-sprint-challenge",
    imageAlt: "The start of a Porsche Sprint Challenge race at the Nürburgring with a full grid of 911 Cup cars",
    relatedTrail: "nurburgring-nordschleife",
  },
  {
    slug: "le-mans-classic",
    lat: 47.95,
    lng: 0.2244,
    name: "Le Mans Classic",
    kind: "Hill climb & festival",
    where: "Circuit de la Sarthe, Le Mans, France",
    when: "Early July, now annual",
    summary:
      "Historic racing on the full 24 Hours circuit, organised by Peter Auto with the Automobile Club de l'Ouest. It was held every two years from 2002 and became annual in 2026, alternating between two formats: Le Mans Classic Legend, for cars of 1976 to 2015, first held from 2 to 5 July 2026, and Le Mans Classic Heritage, for cars of 1923 to 1975, announced for 1 to 4 July 2027.",
    marque:
      "Porsche has won the 24 Hours outright more often than any other manufacturer, and the grids here show it: 917s and 911 RSRs in the Heritage years, 935s, 956s and 962s in the Legend years. Club parking inside the circuit is a show in itself, and Porsche clubs bring some of the largest contingents.",
    url: "https://www.lemansclassic.com/en/",
    image: "event-le-mans-classic",
    imageAlt: "Rows of Porsches in a club parking area at Le Mans Classic in 2018",
  },
  {
    slug: "goodwood-festival-of-speed",
    lat: 50.859,
    lng: -0.7417,
    name: "Goodwood Festival of Speed",
    kind: "Hill climb & festival",
    where: "West Sussex, United Kingdom",
    when: "July",
    summary:
      "The largest motoring garden party in the world, built around a 1.16-mile hill climb through the grounds of Goodwood House. Porsche has been the featured marque more than once, with its cars suspended on the central sculpture in front of the house, and regularly uses the event to show new models. The organisers list the 2027 Festival for 15 to 18 July.",
    marque:
      "The Porsche Museum usually sends cars from its collection to run on the hill, often with the drivers who raced them. The Goodwood Revival in September and the Members' Meeting in spring are the places to see 904s, 906s and early 911s raced in period style. Book early; tickets sell out.",
    url: "https://www.goodwood.com/motorsport/festival-of-speed/",
    image: "event-goodwood",
    imageAlt: "A Gulf-liveried Porsche 917K in the paddock at the Goodwood Festival of Speed in 2011",
  },
  {
    slug: "pikes-peak",
    lat: 38.9217,
    lng: -105.037,
    name: "Pikes Peak International Hill Climb",
    kind: "Hill climb & festival",
    where: "Colorado, United States",
    when: "Late June",
    summary:
      "The 'Race to the Clouds': 12.42 miles and 156 turns from 9,390 ft to the 14,115 ft summit of Pikes Peak, first run in 1916 and fully paved since 2012. Outside race week the Pikes Peak Highway is a public toll road.",
    marque:
      "Porsches have a long record of class wins on the mountain, notably in the hands of Jeff Zwart, and the event has run a one-make class for the Cayman GT4 Clubsport. You can drive the same road as a visitor on most days of the year, at tourist speeds. The thin air at the top costs a naturally aspirated engine well over a third of its power; a turbocharged car loses far less.",
    url: "https://ppihc.org/",
    image: "event-pikes-peak",
    imageAlt: "The Pikes Peak Highway curving through pine forest",
    relatedTrail: "million-dollar-highway",
  },
];
