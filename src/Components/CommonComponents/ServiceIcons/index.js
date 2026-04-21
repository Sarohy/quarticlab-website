/**
 * Inline SVG service icons — modern line-art style.
 * Palette: oklch(58% 0.12 45) (copper), oklch(20% 0.05 255) (oxford).
 * Each icon accepts `size` and `color` props.
 */

/* ── Web Development ──────────────────────── */
export const WebDevIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
export const MobileAppIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
export const BlockchainIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
export const AiMlIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Input layer */}
    <circle
      cx="3"
      cy="7"
      fill={color}
      fillOpacity="0.2"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      cx="3"
      cy="12"
      fill={color}
      fillOpacity="0.2"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      cx="3"
      cy="17"
      fill={color}
      fillOpacity="0.2"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    {/* Hidden layer */}
    <circle
      cx="12"
      cy="5"
      fill={color}
      fillOpacity="0.2"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="10.5"
      fill={color}
      fillOpacity="0.2"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="16"
      fill={color}
      fillOpacity="0.2"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      cx="12"
      cy="21"
      fill={color}
      fillOpacity="0.15"
      r="1.6"
      stroke={color}
      strokeOpacity="0.5"
      strokeWidth="0.85"
    />
    {/* Output layer */}
    <circle
      cx="21"
      cy="9"
      fill={color}
      fillOpacity="0.25"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    <circle
      cx="21"
      cy="15"
      fill={color}
      fillOpacity="0.25"
      r="1.6"
      stroke={color}
      strokeWidth="1"
    />
    {/* Edges: input → hidden */}
    <path
      d="M4.6 7.4L10.4 5.3"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 7.6L10.4 10.2"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 8L10.4 15.6"
      stroke={color}
      strokeOpacity="0.2"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 12L10.4 10.8"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 12L10.4 16"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 17L10.4 16.3"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 17L10.4 10.8"
      stroke={color}
      strokeOpacity="0.2"
      strokeWidth="0.7"
    />
    <path
      d="M4.6 17.4L10.4 21"
      stroke={color}
      strokeOpacity="0.25"
      strokeWidth="0.7"
    />
    {/* Edges: hidden → output */}
    <path
      d="M13.6 5.3L19.4 9"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M13.6 10.5L19.4 9.3"
      stroke={color}
      strokeOpacity="0.4"
      strokeWidth="0.7"
    />
    <path
      d="M13.6 10.7L19.4 14.8"
      stroke={color}
      strokeOpacity="0.35"
      strokeWidth="0.7"
    />
    <path
      d="M13.6 16L19.4 15.2"
      stroke={color}
      strokeOpacity="0.4"
      strokeWidth="0.7"
    />
    <path
      d="M13.6 16L19.4 9.5"
      stroke={color}
      strokeOpacity="0.2"
      strokeWidth="0.7"
    />
    <path
      d="M13.6 21L19.4 15.4"
      stroke={color}
      strokeOpacity="0.25"
      strokeWidth="0.7"
    />
  </svg>
);

/* ── IoT Development ──────────────────────── */
export const IotIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
export const GameDevIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
export const GenAiIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Gear / cog */}
    <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" stroke={color} strokeWidth="1.1" />
    <circle cx="12" cy="12" fill={color} r="1.4" />
    <path
      d="M12 2v2M12 20v2M2 12h2M20 12h2"
      stroke={color}
      strokeLinecap="round"
      strokeWidth="1.1"
    />
    <path
      d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41
         M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      stroke={color}
      strokeLinecap="round"
      strokeOpacity="0.45"
      strokeWidth="0.9"
    />
    {/* Lightning bolt overlay — AI spark */}
    <path
      d="M13.5 9.5l-2.5 3h2l-1 3"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
    />
  </svg>
);

/* ── UI/UX Design ─────────────────────────── */
export const UiUxIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
export const DevOpsIcon = ({
  color = "oklch(58% 0.12 45)",
  size = 24,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
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
