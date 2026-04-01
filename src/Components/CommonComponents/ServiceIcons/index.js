/**
 * Inline SVG service icons — modern line-art style.
 * Palette: #FF9700 (orange), #2B2A35 (dark).
 * Each icon accepts `size` and `color` props.
 */

/* ── Web Development ──────────────────────── */
export const WebDevIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      height="14"
      rx="2.5"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.1"
      width="18"
      x="3"
      y="4"
    />
    <path d="M3 9h18" stroke={color} strokeLinecap="round" strokeWidth="1.1" />
    <circle cx="5.5" cy="6.5" fill={color} r="0.7" />
    <circle cx="7.8" cy="6.5" fill={color} r="0.7" />
    <circle cx="10.1" cy="6.5" fill={color} r="0.7" />
    <path
      d="M9.5 13l-2 2 2 2M14.5 13l2 2-2 2"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.1"
    />
    <path
      d="M13 12l-2 6"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="0.75"
    />
  </svg>
);

/* ── Mobile App Development ───────────────── */
export const MobileAppIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      height="18"
      rx="3"
      stroke={color}
      strokeWidth="1.1"
      width="12"
      x="6"
      y="3"
    />
    <path
      d="M6 7h12M6 17h12"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.1"
    />
    <circle cx="12" cy="19" fill={color} r="0.8" />
    <rect
      fill={color}
      height="3"
      opacity="0.25"
      rx="0.6"
      width="3"
      x="8.5"
      y="9.5"
    />
    <rect
      fill={color}
      height="3"
      opacity="0.25"
      rx="0.6"
      width="3"
      x="12.5"
      y="9.5"
    />
    <rect
      fill={color}
      height="3"
      opacity="0.4"
      rx="0.6"
      width="3"
      x="8.5"
      y="13.2"
    />
    <rect
      fill={color}
      height="3"
      opacity="0.4"
      rx="0.6"
      width="3"
      x="12.5"
      y="13.2"
    />
  </svg>
);

/* ── Blockchain Development ───────────────── */
export const BlockchainIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.0"
      width="5"
      x="3"
      y="3"
    />
    <rect
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.0"
      width="5"
      x="16"
      y="3"
    />
    <rect
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.0"
      width="5"
      x="9.5"
      y="9.5"
    />
    <rect
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.0"
      width="5"
      x="3"
      y="16"
    />
    <rect
      height="5"
      rx="1"
      stroke={color}
      strokeWidth="1.0"
      width="5"
      x="16"
      y="16"
    />
    <path
      d="M8 5.5h8M8 18.5h8M5.5 8v8M18.5 8v8M8 7l2 3M16 7l-2 3M8 17l2-3M16 17l-2-3"
      stroke={color}
      strokeLinecap="round"
      strokeOpacity="0.5"
      strokeWidth="0.75"
    />
  </svg>
);

/* ── AI / ML Development ──────────────────── */
export const AiMlIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3C7.58 3 4 6.58 4 11c0 2.5 1.2 4.7 3 6.2V20a1 1 0 001 1h8a1 1 0 001-1v-2.8c1.8-1.5 3-3.7 3-6.2 0-4.42-3.58-8-8-8z"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="1.1"
    />
    <circle cx="9.5" cy="10" fill={color} r="1.2" />
    <circle cx="14.5" cy="10" fill={color} r="1.2" />
    <path
      d="M9 14c.8.8 2 1.2 3 1.2s2.2-.4 3-1.2"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="0.9"
    />
    <path
      d="M9 21h6M10 23h4"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="0.9"
    />
    <path
      d="M12 3V1M4.5 6L3 4.5M19.5 6L21 4.5"
      stroke={color}
      strokeLinecap="round"
      strokeOpacity="0.45"
      strokeWidth="0.75"
    />
  </svg>
);

/* ── IoT Development ──────────────────────── */
export const IotIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.1" />
    <circle cx="12" cy="12" fill={color} r="1" />
    <path
      d="M12 5V3M12 21v-2M5 12H3M21 12h-2"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.1"
    />
    <path
      d="M7.05 7.05L5.64 5.64M18.36 5.64l-1.41 1.41M7.05 16.95l-1.41 1.41M18.36 18.36l-1.41-1.41"
      stroke={color}
      strokeLinecap="round"
      strokeOpacity="0.45"
      strokeWidth="0.85"
    />
    <circle
      cx="12"
      cy="12"
      r="7"
      stroke={color}
      strokeDasharray="2 2.5"
      strokeOpacity="0.3"
      strokeWidth="0.75"
    />
  </svg>
);

/* ── Game Development ─────────────────────── */
export const GameDevIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 11h4M8 9v4"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.1"
    />
    <circle cx="16" cy="10" fill={color} r="1" />
    <circle cx="18" cy="12" fill={color} r="1" />
    <path
      d="M2 12a5 5 0 015-5h10a5 5 0 013.5 8.56l-2 2A3 3 0 0116.38 19H15l-1.5-2h-3L9 19H7.62a3 3 0 01-2.12-.88l-2-2A5 5 0 012 12z"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="1.1"
    />
  </svg>
);

/* ── GenAI & Automation ───────────────────── */
export const GenAiIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"
      fill={color}
      fillOpacity="0.15"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="0.9"
    />
    <path
      d="M18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="0.75"
    />
    <path
      d="M5 16l.7 2.1L7.8 19l-2.1.7L5 21.8l-.7-2.1L2.2 19l2.1-.7L5 16z"
      fill={color}
      fillOpacity="0.2"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="0.65"
    />
  </svg>
);

/* ── UI/UX Design ─────────────────────────── */
export const UiUxIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 19l7-7 3 3-7 7-3-3z"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="1.1"
    />
    <path
      d="M19 12l-1.5-1.5"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.1"
    />
    <path
      d="M2 2l6.5 16L11 13l5-2.5L2 2z"
      fill={color}
      fillOpacity="0.1"
      stroke={color}
      strokeLinejoin="round"
      strokeWidth="1.1"
    />
  </svg>
);

/* ── DevOps & Cloud ───────────────────────── */
export const DevOpsIcon = ({ color = "#FF9700", size = 24, ...props }) => (
  <svg
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 7c2.76 0 5 1.57 5 3.5S14.76 14 12 14 7 12.43 7 10.5 9.24 7 12 7z"
      stroke={color}
      strokeWidth="1.1"
    />
    <path
      d="M12 14c-2.76 0-5 1.57-5 3.5S9.24 21 12 21s5-1.57 5-3.5"
      stroke={color}
      strokeWidth="1.1"
    />
    <path
      d="M7 10.5C4.24 10.5 2 12.07 2 14s2.24 3.5 5 3.5"
      stroke={color}
      strokeOpacity="0.45"
      strokeWidth="0.85"
    />
    <path
      d="M17 10.5c2.76 0 5 1.57 5 3.5s-2.24 3.5-5 3.5"
      stroke={color}
      strokeOpacity="0.45"
      strokeWidth="0.85"
    />
    <circle cx="12" cy="4" fill={color} r="1.2" />
    <path
      d="M12 5.2v1.8"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="0.9"
    />
    <path
      d="M14.5 10.5l2.5-3"
      stroke={color}
      strokeLinecap="round"
      strokeOpacity="0.4"
      strokeWidth="0.75"
    />
    <path
      d="M9.5 10.5l-2.5-3"
      stroke={color}
      strokeLinecap="round"
      strokeOpacity="0.4"
      strokeWidth="0.75"
    />
  </svg>
);

/* ── Icon lookup map ──────────────────────── */
export const SERVICE_ICON_MAP = {
  // Current Firestore titles
  "AI/ML Development": AiMlIcon,
  "Blockchain Development": BlockchainIcon,
  DevOps: DevOpsIcon,
  "Game Development": GameDevIcon,
  "GenAI & Automation": GenAiIcon,
  "IoT Development": IotIcon,
  "Mobile App Development": MobileAppIcon,
  "UI/UX Design": UiUxIcon,
  "Web Development": WebDevIcon,
  // Legacy Firestore title aliases
  "Artificial Intelligence & Machine Learning": AiMlIcon,
  "DevOps & Cloud Services": DevOpsIcon,
  "IOT Devices": IotIcon,
  "UI/UX Development": UiUxIcon,
};

/* ── Slug-based lookup (for header/dropdown) ─ */
export const SERVICE_ICON_BY_SLUG = {
  "ai-ml-development": AiMlIcon,
  "blockchain-development": BlockchainIcon,
  devops: DevOpsIcon,
  "game-development": GameDevIcon,
  "genai-automation": GenAiIcon,
  "iot-development": IotIcon,
  "mobile-development": MobileAppIcon,
  "ui-ux-design": UiUxIcon,
  "web-development": WebDevIcon,
};
