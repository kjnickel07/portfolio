/**
 * All site copy lives here — one file to read, one file to correct.
 *
 * Sourced from: Karl_Nickel_Cover_Letter_BAE_Systems.docx, the ServiceUNSW
 * and Terracast repositories on this machine, and their public READMEs.
 * The full CV PDFs could not be parsed on this machine (no poppler/pdftotext
 * installed) — dates, exact titles and earlier roles below are drafted, not
 * lifted verbatim, and are marked accordingly. Correct freely; nothing else
 * in the codebase needs to change.
 */

export const site = {
  name: "Karl Nickel",
  role: "Software Engineer",
  location: "Sydney, Australia",
  email: "kj.nickel0157@gmail.com",
  github: "https://github.com/kjnickel07",
  linkedin: "https://www.linkedin.com/in/karl-nickel/",
};

export const hero = {
  eyebrow: "Hey there! I'm",
  name: "Karl Nickel",
  role: "Software Engineer",
  thesis:
    "Building thoughtful software with a focus on interaction, performance, and creating software people genuinely enjoy using.",
};

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a third-year Software Engineering student at UNSW, based in Sydney.",
    "Most of what's on this page came out of two team projects: leading development on Service UNSW, a campus app built inside UNSW's Virtually Integrated Projects program, and building the ingestion and risk-scoring pipeline behind TerraCast, an agricultural weather platform, for SENG3011.",
    "Outside of coursework I've spent time at Telstra diagnosing technical problems under pressure, and as a UNSW Student Equity Ambassador presenting to audiences considerably larger than my comfort zone. Both taught me the same lesson from different angles: explain the complicated thing plainly, or it doesn't count as understood.",
  ],
};

export const experience = {
  heading: "Experience",
  roles: [
    {
      title: "Team Lead — Service UNSW",
      org: "UNSW Virtually Integrated Projects (VIP)",
      period: "2025 — Present",
      description:
        "Coordinating frontend and backend workstreams for a student-facing campus app — timetable, campus map, room bookings and student ID — built on Expo Router and React Native.",
    },
    {
      title: "Software Engineer — TerraCast",
      org: "UNSW SENG3011",
      period: "2025",
      description:
        "Built the weather ingestion and risk-scoring pipeline for a vineyard weather-intelligence platform: AWS Lambda microservices, DynamoDB and S3 archival, CI/CD and integration testing against LocalStack.",
    },
    {
      title: "Technical Support",
      org: "Telstra",
      period: "2024 — 2025",
      description:
        "Diagnosed and resolved complex technical issues under time pressure, routinely exceeding performance targets by up to 50%.",
    },
    {
      title: "Student Equity Ambassador",
      org: "UNSW",
      period: "2024 — Present",
      description:
        "Presenting to large, diverse audiences and coordinating groups of up to fifteen peers to run campus-wide equity events.",
    },
    {
      title: "B.Software Engineering",
      org: "UNSW Sydney",
      period: "2023 — 2026 (expected)",
      description: "Third-year undergraduate, Software Engineering.",
    },
  ],
};

export const serviceUnsw = {
  id: "serviceunsw",
  eyebrow: "UNSW Vertically Integrated Project",
  name: "Service UNSW",
  role: "Team Lead",
  summary:
    "A campus companion for UNSW students, rebuilt from the ground up: timetable, campus map, room bookings, quick links and a digital student ID, all inside one Expo Router app.",
  stack: [
    "Expo Router",
    "React Native 0.85",
    "React 19",
    "Reanimated",
    "Mapbox",
    "AsyncStorage",
  ],
  beats: [
    {
      range: "Login",
      title: "One yellow arrival",
      body: "The whole page opens in UNSW yellow — a hero panel, two soft translucent shapes, the wordmark, and a white sheet holding just a zID and a password.",
    },
    {
      range: "Turning",
      title: "Off the page",
      body: "As you scroll, the frame lifts and turns in 3D. Nothing here is a screenshot — every layer is real markup, animating independently.",
    },
    {
      range: "Home",
      title: "Login becomes home",
      body: "The yellow hero collapses into a banner. The student ID card springs into place. Favourites and today's classes stagger in, and the tab bar rises last to close the scene.",
    },
  ],
  links: {
    repo: "https://github.com/kjnickel07/ServiceUNSW",
  },
};

export const terracast = {
  id: "terracast",
  eyebrow: "Agritrech at UNSW",
  name: "TerraCast",
  role: "Software Engineer",
  summary:
    "Weather intelligence for vineyards: sixteen-day forecasts, frost and hail risk scoring across NSW, and a planting advisor built on a serverless AWS pipeline.",
  stack: [
    "Next.js 16",
    "AWS Lambda",
    "DynamoDB",
    "S3",
    "EventBridge",
    "SNS",
  ],
  paragraphs: [
    "Every night, an EventBridge cron rule triggers a Lambda that scans the day's weather data out of DynamoDB, archives it to S3, and clears the table for the next cycle, the same pipeline that feeds a live frost, heat, hail, rain and wind risk score across sixty-five locations in NSW.",
    "I built the ingestion and risk-scoring services behind that pipeline: ingesting Open-Meteo data, deriving the risk indicators, and testing the whole path end-to-end against LocalStack before it ever touched production AWS.",
  ],
  links: {
    repo: "https://github.com/kjnickel07/Terracast",
  },
};

export const diseaseMcp = {
  id: "disease-risk-mcp",
  eyebrow: "Terracast MCP",
  name: "Disease-Risk MCP Server",
  role: "TerraCast · Model Context Protocol",
  summary:
    "A Model Context Protocol server that lets an AI assistant reason about vineyard disease risk — comparing forecasting models for downy mildew, powdery mildew and botrytis under a chosen decision policy.",
  tools: [
    "list_models",
    "score_models_for_period",
    "compare_models",
    "explain_model_difference",
    "recommend_operational_model",
  ],
  policies: [
    {
      key: "minimize_misses",
      label: "Minimize misses",
      note: "Favours the model that catches the most true outbreaks, tolerating more false alarms.",
    },
    {
      key: "balanced",
      label: "Balanced",
      note: "Weighs missed outbreaks and false alarms evenly — the default operating point.",
    },
    {
      key: "minimize_false_alarms",
      label: "Minimize false alarms",
      note: "Favours the model that stays quiet unless it's confident, at the cost of a slower warning.",
    },
  ],
};

export const also = {
  heading: "Also",
  items: [
    {
      title: "Aftermarket head unit teardown",
      description:
        "Rooted and reverse-engineered an aftermarket Android car head unit — dumping its package table and activity resolver to work out what could safely be replaced.",
    },
    {
      title: "Smaller repos",
      description: "Coursework, experiments and one-off tools live on GitHub.",
      href: site.github,
    },
  ],
};

export const colophon = {
  heading: "Colophon",
  paragraphs: [
    "Set in the system font stack — no webfont loads on this page. Built with Next.js, Framer Motion and Lenis. Colour, gradients and shadow are reserved for the two case-study illustrations above; everything else on the page is flat, sharp-cornered paper.",
  ],
  links: [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
  ],
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Service UNSW", href: `#${serviceUnsw.id}` },
  { label: "TerraCast", href: `#${terracast.id}` },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#colophon" },
];
