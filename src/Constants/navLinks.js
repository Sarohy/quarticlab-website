import routesPaths from "./routePaths";

const navLinks = [
  { href: routesPaths.home, text: "Home" },
  { href: routesPaths.services, text: "Services" },
  { href: routesPaths.aiServices, text: "AI Services" },
  { href: routesPaths.projects, text: "Portfolio" },
  { href: routesPaths.aboutUs, text: "About" },
  { href: routesPaths.howWeWork, text: "How We Work" },
  { href: routesPaths.blogs, text: "Blog" },
  { href: routesPaths.contactUs, text: "Contact" },
];

export const HEADER_CTA = {
  label: "Book a Free Call",
  href: "https://calendly.com/request-demo-zweidevs/meeting",
};

export default navLinks;
