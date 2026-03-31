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
        emoji: "🌐",
        href: "/services/web-development",
        text: "Web Development",
      },
      {
        desc: "iOS, Android & cross-platform apps",
        emoji: "📱",
        href: "/services/mobile-development",
        text: "Mobile Apps",
      },
      {
        desc: "Smart contracts, DeFi & Web3",
        emoji: "⛓️",
        href: "/services/blockchain-development",
        text: "Blockchain",
      },
      {
        desc: "Connected devices & edge computing",
        emoji: "📡",
        href: "/services/iot-development",
        text: "IoT Solutions",
      },
      {
        desc: "Unity, Unreal & immersive experiences",
        emoji: "🎮",
        href: "/services/game-development",
        text: "Game Development",
      },
    ],
  },
  {
    label: "AI & Design",
    items: [
      {
        desc: "LLMs, agents, RAG & automation",
        emoji: "🤖",
        href: "/services/genai-automation",
        text: "GenAI & Automation",
      },
      {
        desc: "ML models, NLP & computer vision",
        emoji: "🧠",
        href: "/services/ai-ml-development",
        text: "AI / ML Development",
      },
      {
        desc: "Interfaces that convert & delight",
        emoji: "🎨",
        href: "/services/ui-ux-design",
        text: "UI/UX Design",
      },
      {
        desc: "CI/CD, Kubernetes & cloud infra",
        emoji: "☁️",
        href: "/services/devops",
        text: "DevOps & Cloud",
      },
    ],
  },
];

export const HEADER_CTA = {
  label: "Get Estimate in 16 Hrs",
  href: "https://calendly.com/request-demo-zweidevs/meeting",
};

export default navLinks;
