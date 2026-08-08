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
  eyebrow: "Hi I'm",
  name: "Karl Nickel",
  role: "Software Engineer",
  thesis:
    "Full stack software engineer. Cloud enthusiast. Penultimate year student at UNSW. Team lead at Service UNSW.",
};

export const about = {
  heading: "About",
  paragraphs: [
    "I'm a third-year Software Engineering student at UNSW, based in Sydney.",
    "As a passionate technologist, I love all things tech and have recently taken an interest in mobile app development and cloud architecture. This love has stemmed from two major projects.",
    "Leading development on Service UNSW, a campus app built inside UNSW's Virtually Integrated Projects program, and building the ingestion and risk-scoring pipeline behind Terracast, an agricultural weather platform, for SENG3011.",
    "Outside of coursework I'm a Sales Consultant at Telstra, and as a former UNSW Student Equity Ambassador I have presented to audiences considerably larger than my comfort zone. Both taught me the same lesson from different angles: explain the complicated thing plainly or it doesn't count as understood.",
  ],
};

export const experience = {
  heading: "Experience",
  roles: [
    {
      title: "Team Lead @ Service UNSW",
      org: "UNSW Virtually Integrated Projects (VIP)",
      period: "January 2026 - Present",
      description:
        "Coordinating frontend and backend workstreams for a student-facing campus app with wallet-style UX integrating timetable, campus map, room bookings and student ID. Built on Expo Router and React Native.",
    },
    {
      title: "Lead Architect @ Terracast",
      org: "UNSW SENG3011",
      period: "February 2026 - May 2026",
      description:
        "Built the weather ingestion and risk-scoring pipeline for a vineyard weather-intelligence platform. AWS Lambda microservices, DynamoDB and S3 archival, CI/CD and integration testing.",
    },
    {
      title: "Retail Sales Consultant",
      org: "Telstra",
      period: "June 2024 - Present",
      description:
        "Diagnosed and resolved complex technical issues under time pressure, routinely exceeding performance targets by up to 50%.",
    },
    {
      title: "Student Equity Ambassador",
      org: "UNSW",
      period: "December 2024 - December 2025",
      description:
        "Presenting to large, diverse audiences and coordinating groups of up to fifteen peers to run campus-wide equity events.",
    },
    {
      title: "B.Software Engineering (Honours)",
      org: "UNSW Sydney",
      period: "2024 - 2028",
      description: "Third-year undergraduate pursuing a Bachelor of Software Engineering (Honours). Coursework completion due December 2027.",
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
      body: "Service UNSW welcomes you to login to view your UNSW services with a classy yet simple login screen.",
    },
    {
      range: "Hi (again)",
      title: "I hope you appreciate this animation",
      body: "As you scroll, the frame lifts and turns in 3D. Nothing here is a screenshot. Every layer is real markup, animating independently.",
    },
    {
      range: "Home",
      title: "Welcome to Service UNSW",
      body: "Tested and iterated upon vigorously with real student UAT to validate features and design. A real solution to a real problem.",
    },
  ],
  links: {
    repo: "https://github.com/kjnickel07/ServiceUNSW",
  },
};

export const terracast = {
  id: "terracast",
  eyebrow: "Lead Cloud Architect",
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
    "Used an industry standard cloud architecture pattern (serverless event-driven microservices) to implement an agritech solution for winefarmers, powered by the standard modern practice of Infrastructure-as-Code (IAC).",
    "I architected the solution end-to-end and built the ingestion and risk-scoring services behind that pipeline: ingesting Open-Meteo data, deriving the risk indicators, and testing the whole path end-to-end loaclly before it ever touched production AWS.",
  ],
  links: {
    repo: "https://github.com/kjnickel07/Terracast",
  },
};

export const also = {
  heading: "Also",
  items: [
    {
      title: "Aftermarket head unit teardown",
      description:
        "Reverse-engineered an aftermarket Android car head unit by exploiting a vulnerability in a deprecated pre-installed APK, dumping its package table and activity resolver to work out what could safely be replaced and performing an end-to-end analysis of the device's security and the safety of its users.",
    },
  ],
};

export const colophon = {
  heading: "Reach Out",
  paragraphs: [
    "Thank you for stopping by. If you want to stay in touch, I'm reachable here."
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
