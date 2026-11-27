// Everything the site says. Edit this file to update your profile, the five cards and the pages behind them.
export const PROFILE = {
  name: "Vinh Tran",
  eyebrow: "Software Engineer · Northeastern",
  email: "officiallyvt@gmail.com",
  linkedin: "https://linkedin.com/in/viinh",
  github: "https://github.com/v-iinh",
};

export const CARDS = [
  { id: "education", label: "Education", numeral: "IX", arcana: "The Hermit" },
  { id: "work", label: "Work", numeral: "X", arcana: "Wheel of Fortune" },
  { id: "about", label: "About", numeral: "I", arcana: "The Magician" },
  { id: "projects", label: "Projects", numeral: "XVII", arcana: "The Star" },
  { id: "contact", label: "Contact", numeral: "XIX", arcana: "The Sun" },
];

export const WORK = [
  {
    role: "Software Engineer Co-op",
    org: "SPD Hospitality",
    when: "Nov 2026 – Now",
    text: "Developing web applications across multiple brands, optimizing for performance, user experience, and SEO. Building automation tools to streamline operational and marketing workflows."
  },
  {
    role: "Data & Development Intern",
    org: "Hillel International",
    when: "Sep 2026 – Nov 2026",
    text: "Supported database management and research to inform fundraising efforts. Analyzed and filtered donor records to identify high-potential prospects based on giving history, connections, and other relevant data."
  },
  {
    role: "Information Technology Intern",
    org: "Boston Water & Sewer Commission",
    when: "Jul 2026 – Sep 2026",
    text: "Provided technical troubleshooting and network monitoring support. Modernized a legacy GIS dashboard and automated inventory tracking, reducing hours of manual asset management."
  },
  {
    role: "Software Developer",
    org: "Artists for Humanity",
    when: "Oct 2023 – Aug 2025",
    text: "Developed interactive software for live events engaging 600+ attendees. Built and deployed full-stack, CMS-integrated web applications with a focus on SEO optimization and responsive performance."
  },
];

export const PROJECTS = [
  {
    name: "Socratic",
    when: "Dec 2024 – Now",
    stack: "Next.js, Clerk, React, Neon, Drizzle ORM",
    text: "An AI learning platform with sign-in, course management and video lessons. I also wrote a research paper and case study on AI in education and presented it to 400+ students." },
  {
    name: "Relief Route",
    when: "Jul 2024 - Nov 2024",
    stack: "Groq, Google Maps API, React",
    text: "Finds nearby emergency food resources in one map, with an admin dashboard to manage 200+ unregistered pantries and track engagement." },
  {
    name: "Instagram Data Tracker",
    when: "Jan 2025 – Mar 2025",
    stack: "JavaScript, GraphQL, Fetch API",
    text: "Pulls follower data through GraphQL endpoints and compares snapshots over time to find new followers, unfollows and one-way connections, all client-side." },
];

export const EDUCATION = [
  {
    institution: "Northeastern University",
    degree: "B.S. Computer Science, Systems Concentration",
    when: "2025 - 2029",
    text: "Undergraduate student at Northeastern's Khoury College of Computer Sciences with a concentration in Systems. Experiential learning includes research projects and co-op programs.",
  },
  {
    institution: "Boston Latin School",
    degree: "High School Diploma",
    when: "2019 - 2025",
    text: "Completed a full honors curriculum with a focus on research and STEM extracurriculars. Received national recognition in programming competitions (USACO, ACSL) and community service (InnerView).",
  },
];

export const ABOUT = {
  description: "I enjoy building software that is reliable and scalable. I'm always open to making new connections and expanding my technical skills, so feel free to reach out!",
  content: [
    {
      category: "Languages",
      text: "Java, Python, C/C++, SQL, TypeScript, JavaScript, HTML/CSS",
    },
    {
      category: "Frameworks & Libraries",
      text: "React, Next.js, Node.js, Tailwind CSS, Material-UI, Bootstrap, Three.js",
    },
    {
      category: "Tools & Platforms",
      text: "Git, Linux, Firebase, PostgreSQL, ArcGIS, VS Code, Vercel, Netlify, TouchDesigner, Figma",
    },
  ],
};
