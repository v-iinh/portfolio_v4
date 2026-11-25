// Everything the site says. Edit this file to update your profile, the five cards and the pages behind them.

export const PROFILE = {
  name: "Vinh Tran",
  eyebrow: "Software engineer · Northeastern",
  tagline: "Data tools, web apps and interactive installations, built for the organizations that keep Boston running.",
  email: "tran.v1@northeastern.edu",
  linkedin: "https://linkedin.com/in/viinh",
  github: "https://github.com/v-iinh",
};

// Left to right in the spread. Each section is one card of the Major Arcana.
export const CARDS = [
  { id: "education", label: "Education", numeral: "IX", arcana: "The Hermit", blurb: "Computer science at Northeastern, systems concentration, class of 2029." },
  { id: "work", label: "Work", numeral: "X", arcana: "Wheel of Fortune", blurb: "Four teams, from a city water utility to a youth arts studio." },
  { id: "about", label: "About", numeral: "I", arcana: "The Magician", blurb: "Who I am and the tools I work with." },
  { id: "projects", label: "Projects", numeral: "XVII", arcana: "The Star", blurb: "Three things I built on my own time." },
  { id: "contact", label: "Contact", numeral: "XIX", arcana: "The Sun", blurb: "Email is the quickest way to reach me." },
];

export const WORK = [
  { role: "Data & Development Intern", org: "Hillel International", when: "Sep 2026 – now",
    text: "Cleaned, standardized and migrated 1,400+ donor records to Hillel’s updated platform, cutting redundant entries by 10%. Analyzed giving history to build a targeted outreach list of 200+ high-potential donors." },
  { role: "Information Technology Intern", org: "Boston Water & Sewer Commission", when: "Jul – Sep 2026",
    text: "Modernized legacy GIS applications with React tools on the ArcGIS REST API. Built a QR-code asset tracking system that automated device transfers, and resolved 20+ support tickets across 5 departments." },
  { role: "Software Developer", org: "Artists for Humanity", when: "Oct 2023 – Aug 2025",
    text: "Built a React and Firebase work tracker used by 15 interns. Delivered 5+ CMS-backed client sites and cut load times by up to 200ms. Installed interactive projection mapping with OpenCV, MediaPipe and TouchDesigner for 600+ attendees." },
  { role: "Application Developer", org: "Unity Provisions", when: "Jul – Nov 2024",
    text: "Led development of Relief Route, which uses Groq and the Google Maps API to gather nearby emergency food resources and helped raise $5,000 in grants at the 2025 YMCA Changemakers Summit." },
];

export const PROJECTS = [
  { name: "Socratic", when: "Dec 2024 – now", stack: "Next.js, Clerk, React, Neon, Drizzle ORM",
    text: "An AI learning platform with sign-in, course management and video lessons. I also wrote a research paper and case study on AI in education and presented it to 400+ students." },
  { name: "Relief Route", when: "2024", stack: "Groq, Google Maps API, React",
    text: "Finds nearby emergency food resources in one map, with an admin dashboard to manage 200+ unregistered pantries and track engagement." },
  { name: "Instagram Data Tracker", when: "Jan – Mar 2025", stack: "JavaScript, GraphQL, Fetch API",
    text: "Pulls follower data through GraphQL endpoints and compares snapshots over time to find new followers, unfollows and one-way connections, all client-side." },
];

export const COURSES = ["Algorithms and Design", "Computer Systems", "Introduction to Databases", "Fundamentals of Software Engineering",
  "Program Design & Implementation", "Foundations of Cybersecurity", "Discrete Structures"];

export const SKILLS = [
  ["Languages", "Java, Python, C/C++, SQL, TypeScript, JavaScript, HTML/CSS"],
  ["Frameworks", "React, Next.js, Node.js, Tailwind CSS, Material-UI, Bootstrap, Three.js"],
  ["Tools", "Git, Linux, Firebase, PostgreSQL, ArcGIS, VS Code, Vercel, Netlify, TouchDesigner, Figma"],
];