import routesPaths from "./routePaths";

const navLinks = [
  { href: routesPaths.home, text: "Home" },
  { hasDropdown: true, href: routesPaths.services, text: "Services" },
  { href: routesPaths.projects, text: "Portfolio" },
  { href: routesPaths.aboutUs, text: "About" },
  { href: routesPaths.blogs, text: "Blog" },
  { href: routesPaths.contactUs, text: "Contact" },
];

/* ── Mega-dropdown service groups ──────────── */
export const SERVICE_DROPDOWN = [
  {
    label: "Development",
    items: [
      {
        desc: "React, Next.js, Node & scalable platforms",
        href: "/services/web-development",
        icon: "web-development",
        text: "Web Development",
      },
      {
        desc: "iOS, Android & cross-platform apps",
        href: "/services/mobile-development",
        icon: "mobile-development",
        text: "Mobile Apps",
      },
      {
        desc: "Smart contracts, DeFi & Web3",
        href: "/services/blockchain-development",
        icon: "blockchain-development",
        text: "Blockchain",
      },
      {
        desc: "Connected devices & edge computing",
        href: "/services/iot-development",
        icon: "iot-development",
        text: "IoT Solutions",
      },
      {
        desc: "Unity, Unreal & immersive experiences",
        href: "/services/game-development",
        icon: "game-development",
        text: "Game Development",
      },
    ],
  },
  {
    label: "AI & Design",
    items: [
      {
        desc: "LLMs, agents, RAG & automation",
        href: "/services/genai-automation",
        icon: "genai-automation",
        text: "GenAI & Automation",
      },
      {
        desc: "ML models, NLP & computer vision",
        href: "/services/ai-ml-development",
        icon: "ai-ml-development",
        text: "AI / ML Development",
      },
      {
        desc: "Interfaces that convert & delight",
        href: "/services/ui-ux-design",
        icon: "ui-ux-design",
        text: "UI/UX Design",
      },
      {
        desc: "CI/CD, Kubernetes & cloud infra",
        href: "/services/devops",
        icon: "devops",
        text: "DevOps & Cloud",
      },
    ],
  },
];

export const HEADER_CTA = {
  label: "Start a project",
  href: "https://calendly.com/request-demo-zweidevs/meeting",
};

export default navLinks;
