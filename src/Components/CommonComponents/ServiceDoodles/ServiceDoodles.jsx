/**
 * Service-specific animated SVG illustrations for the detail page
 * overview section. Each doodle follows the AboutDoodle pattern:
 * inline SVG with embedded CSS keyframes, oklch colors, and the
 * Quartic Lab design tokens (oxford / copper / linen / parchment).
 */

/* ── shared keyframes injected once ─────────── */
const SHARED_KEYFRAMES = `
  @keyframes sd-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-5px); }
  }
  @keyframes sd-blink {
    0%, 45% { opacity: 1; }
    50%, 95% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes sd-line-appear {
    from { opacity: 0; transform: translateX(-4px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes sd-ping {
    0%   { r: 3; opacity: 0.7; }
    100% { r: 12; opacity: 0; }
  }
  @keyframes sd-glow {
    0%, 100% { opacity: 0.15; }
    50%      { opacity: 0.3; }
  }
  @keyframes sd-arm-type {
    0%, 100% { transform: rotate(0deg); }
    25%      { transform: rotate(-2deg); }
    75%      { transform: rotate(2deg); }
  }
  @keyframes sd-dash {
    to { stroke-dashoffset: 0; }
  }
  @keyframes sd-pulse {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.05); }
  }
  @keyframes sd-rotate {
    to { transform: rotate(360deg); }
  }
  @keyframes sd-signal {
    0%   { opacity: 0; transform: translateY(0); }
    50%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(-8px); }
  }
`;

const OX = "oklch(20% 0.05 255)";
const CU = "oklch(58% 0.12 45)";
const LN = "oklch(95% 0.018 75)";
const PM = "oklch(88% 0.03 70)";
const MN = "oklch(14% 0.04 255)";

/* ─────────────────────────────────────────────
   1 · WEB DEVELOPMENT
   person at desk building a website on monitor
   ───────────────────────────────────────────── */
function WebDevDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 380"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .wd-float { animation: sd-float 4s ease-in-out infinite; transform-origin: 210px 200px; }
          .wd-arm-l { animation: sd-arm-type 0.5s ease-in-out infinite; transform-origin: 185px 258px; }
          .wd-arm-r { animation: sd-arm-type 0.5s ease-in-out infinite reverse; transform-origin: 235px 258px; }
          .wd-cursor { animation: sd-blink 1.1s step-end infinite; }
          .wd-l1 { animation: sd-line-appear 0.35s ease-out 0.3s both; }
          .wd-l2 { animation: sd-line-appear 0.35s ease-out 0.7s both; }
          .wd-l3 { animation: sd-line-appear 0.35s ease-out 1.1s both; }
          .wd-l4 { animation: sd-line-appear 0.35s ease-out 1.5s both; }
          .wd-glow { animation: sd-glow 2.8s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={30 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* desk */}
      <rect
        fill={PM}
        height="10"
        rx="2"
        stroke={OX}
        strokeWidth="1.2"
        width="260"
        x="80"
        y="305"
      />
      <line stroke={OX} strokeWidth="1.4" x1="110" x2="110" y1="315" y2="345" />
      <line stroke={OX} strokeWidth="1.4" x1="310" x2="310" y1="315" y2="345" />

      {/* monitor stand */}
      <rect
        fill={PM}
        height="6"
        rx="1"
        stroke={OX}
        strokeWidth="1"
        width="32"
        x="194"
        y="299"
      />
      <line stroke={OX} strokeWidth="1.2" x1="210" x2="210" y1="286" y2="305" />

      {/* monitor */}
      <rect
        fill={MN}
        height="120"
        rx="3"
        stroke={OX}
        strokeWidth="1.5"
        width="180"
        x="120"
        y="164"
      />
      <rect
        fill="oklch(16% 0.045 255)"
        height="106"
        rx="2"
        width="164"
        x="128"
        y="170"
      />
      <rect
        className="wd-glow"
        fill={CU}
        height="106"
        rx="2"
        width="164"
        x="128"
        y="170"
      />

      {/* browser chrome */}
      <rect
        fill="oklch(22% 0.04 255)"
        height="14"
        rx="1"
        width="164"
        x="128"
        y="170"
      />
      <circle cx="136" cy="177" fill="oklch(55% 0.15 25)" r="2" />
      <circle cx="144" cy="177" fill="oklch(70% 0.12 90)" r="2" />
      <circle cx="152" cy="177" fill="oklch(55% 0.12 145)" r="2" />

      {/* website layout blocks on screen */}
      <g fontFamily="IBM Plex Mono, monospace">
        {/* nav bar */}
        <rect
          className="wd-l1"
          fill="oklch(30% 0.05 255)"
          height="8"
          rx="1"
          width="148"
          x="136"
          y="190"
        />
        {/* hero block */}
        <rect
          className="wd-l2"
          fill={CU}
          height="26"
          opacity="0.4"
          rx="1"
          width="148"
          x="136"
          y="204"
        />
        <text className="wd-l2" fill={LN} fontSize="7" x="178" y="220">
          hero section
        </text>
        {/* content columns */}
        <rect
          className="wd-l3"
          fill="oklch(28% 0.04 255)"
          height="22"
          rx="1"
          width="68"
          x="136"
          y="236"
        />
        <rect
          className="wd-l3"
          fill="oklch(28% 0.04 255)"
          height="22"
          rx="1"
          width="68"
          x="216"
          y="236"
        />
        {/* footer */}
        <rect
          className="wd-l4"
          fill="oklch(25% 0.04 255)"
          height="8"
          rx="1"
          width="148"
          x="136"
          y="264"
        />
      </g>

      {/* cursor */}
      <rect
        className="wd-cursor"
        fill={CU}
        height="8"
        width="5"
        x="200"
        y="248"
      />

      {/* person */}
      <g className="wd-float">
        <rect
          fill={PM}
          height="55"
          rx="6"
          stroke={OX}
          strokeWidth="1.3"
          width="46"
          x="187"
          y="245"
        />
        <rect
          fill={PM}
          height="8"
          rx="2"
          stroke={OX}
          strokeWidth="1"
          width="12"
          x="204"
          y="238"
        />
        <ellipse
          cx="210"
          cy="224"
          fill={PM}
          rx="18"
          ry="20"
          stroke={OX}
          strokeWidth="1.3"
        />
        <path d="M194 218 C194 202 226 202 226 218" fill={OX} opacity="0.7" />
        <ellipse cx="204" cy="223" fill={OX} rx="1.8" ry="2.2" />
        <ellipse cx="216" cy="223" fill={OX} rx="1.8" ry="2.2" />
        {/* glasses */}
        <rect
          fill="none"
          height="6"
          rx="1.5"
          stroke={CU}
          strokeWidth="1"
          width="10"
          x="199"
          y="220"
        />
        <rect
          fill="none"
          height="6"
          rx="1.5"
          stroke={CU}
          strokeWidth="1"
          width="10"
          x="211"
          y="220"
        />
        <line
          stroke={CU}
          strokeWidth="0.8"
          x1="209"
          x2="211"
          y1="223"
          y2="223"
        />

        {/* arms */}
        <g className="wd-arm-l">
          <path
            d="M189 258 L170 278 L162 296"
            stroke={OX}
            strokeLinecap="round"
            strokeWidth="4.5"
          />
          <ellipse
            cx="160"
            cy="299"
            fill={PM}
            rx="6"
            ry="4.5"
            stroke={OX}
            strokeWidth="1"
          />
        </g>
        <g className="wd-arm-r">
          <path
            d="M231 258 L250 278 L258 296"
            stroke={OX}
            strokeLinecap="round"
            strokeWidth="4.5"
          />
          <ellipse
            cx="261"
            cy="299"
            fill={PM}
            rx="6"
            ry="4.5"
            stroke={OX}
            strokeWidth="1"
          />
        </g>
      </g>

      {/* keyboard */}
      <rect
        fill={PM}
        height="12"
        rx="2"
        stroke={OX}
        strokeWidth="1"
        width="90"
        x="165"
        y="298"
      />
      {[0, 1, 2, 3, 4].map(i => (
        <rect
          fill="oklch(80% 0.025 70)"
          height="3.5"
          key={`k1-${i}`}
          rx="1"
          stroke={OX}
          strokeWidth="0.4"
          width="10"
          x={172 + i * 14}
          y="301"
        />
      ))}

      {/* floating tag bubbles */}
      <g
        style={{
          animation: "sd-float 3.4s ease-in-out 0.3s infinite",
          transformOrigin: "72px 200px",
        }}
      >
        <circle
          cx="72"
          cy="200"
          fill={LN}
          r="22"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="72"
          y="197"
        >
          HTML
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          opacity="0.5"
          textAnchor="middle"
          x="72"
          y="208"
        >
          markup
        </text>
      </g>

      <g
        style={{
          animation: "sd-float 3.8s ease-in-out 1s infinite",
          transformOrigin: "360px 185px",
        }}
      >
        <circle
          cx="360"
          cy="185"
          fill={LN}
          r="22"
          stroke={CU}
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="360"
          y="182"
        >
          REACT
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          opacity="0.5"
          textAnchor="middle"
          x="360"
          y="193"
        >
          ui layer
        </text>
        <circle
          className="sd-ping"
          cx="360"
          cy="185"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="1"
          style={{ animation: "sd-ping 2s ease-out infinite" }}
        />
      </g>

      <g
        style={{
          animation: "sd-float 4.2s ease-in-out 1.8s infinite",
          transformOrigin: "355px 100px",
        }}
      >
        <circle
          cx="355"
          cy="100"
          fill={LN}
          r="18"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="355"
          y="98"
        >
          API
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          opacity="0.5"
          textAnchor="middle"
          x="355"
          y="108"
        >
          rest
        </text>
      </g>

      {/* connector lines */}
      <line
        opacity="0.15"
        stroke={OX}
        strokeDasharray="3 3"
        strokeWidth="1"
        x1="94"
        x2="170"
        y1="200"
        y2="230"
      />
      <line
        opacity="0.15"
        stroke={OX}
        strokeDasharray="3 3"
        strokeWidth="1"
        x1="338"
        x2="260"
        y1="185"
        y2="220"
      />

      {/* annotation */}
      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="372"
      >
        quartic lab · building the web
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   2 · BLOCKCHAIN DEVELOPMENT
   ledger / chain links with blocks and hash
   ───────────────────────────────────────────── */
function BlockchainDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .bc-block { animation: sd-pulse 3s ease-in-out infinite; }
          .bc-b2 { animation-delay: 0.6s; }
          .bc-b3 { animation-delay: 1.2s; }
          .bc-chain { stroke-dasharray: 6 4; stroke-dashoffset: 40; animation: sd-dash 2s ease-out 0.5s forwards; }
          .bc-hash { animation: sd-line-appear 0.4s ease-out both; }
          .bc-h1 { animation-delay: 0.4s; }
          .bc-h2 { animation-delay: 0.9s; }
          .bc-h3 { animation-delay: 1.4s; }
          .bc-glow { animation: sd-glow 3s ease-in-out infinite; }
          .bc-node-ring { animation: sd-ping 2.2s ease-out infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={20 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* chain links */}
      <line
        className="bc-chain"
        stroke={CU}
        strokeWidth="2"
        x1="145"
        x2="190"
        y1="160"
        y2="160"
      />
      <line
        className="bc-chain"
        stroke={CU}
        strokeWidth="2"
        style={{ animationDelay: "0.8s" }}
        x1="290"
        x2="335"
        y1="160"
        y2="160"
      />

      {/* block 1 */}
      <g className="bc-block" style={{ transformOrigin: "100px 160px" }}>
        <rect
          fill={MN}
          height="80"
          rx="3"
          stroke={OX}
          strokeWidth="1.5"
          width="90"
          x="55"
          y="120"
        />
        <rect
          fill="oklch(18% 0.04 255)"
          height="16"
          rx="1"
          width="80"
          x="60"
          y="124"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="66"
          y="135"
        >
          BLOCK 01
        </text>
        <text
          className="bc-hash bc-h1"
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          opacity="0.7"
          x="64"
          y="154"
        >
          0x7f3a...c8e1
        </text>
        <text
          className="bc-hash bc-h1"
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          opacity="0.5"
          x="64"
          y="166"
        >
          nonce: 48291
        </text>
        <text
          className="bc-hash bc-h1"
          fill="oklch(65% 0.12 145)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          x="64"
          y="178"
        >
          ✓ verified
        </text>
        <rect
          className="bc-glow"
          fill={CU}
          height="80"
          opacity="0.05"
          rx="3"
          width="90"
          x="55"
          y="120"
        />
      </g>

      {/* block 2 */}
      <g className="bc-block bc-b2" style={{ transformOrigin: "245px 160px" }}>
        <rect
          fill={MN}
          height="80"
          rx="3"
          stroke={OX}
          strokeWidth="1.5"
          width="90"
          x="200"
          y="120"
        />
        <rect
          fill="oklch(18% 0.04 255)"
          height="16"
          rx="1"
          width="80"
          x="205"
          y="124"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="211"
          y="135"
        >
          BLOCK 02
        </text>
        <text
          className="bc-hash bc-h2"
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          opacity="0.7"
          x="209"
          y="154"
        >
          0xa2d9...f4b7
        </text>
        <text
          className="bc-hash bc-h2"
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          opacity="0.5"
          x="209"
          y="166"
        >
          nonce: 73104
        </text>
        <text
          className="bc-hash bc-h2"
          fill="oklch(65% 0.12 145)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          x="209"
          y="178"
        >
          ✓ verified
        </text>
        <rect
          className="bc-glow"
          fill={CU}
          height="80"
          opacity="0.05"
          rx="3"
          width="90"
          x="200"
          y="120"
        />
      </g>

      {/* block 3 */}
      <g className="bc-block bc-b3" style={{ transformOrigin: "390px 160px" }}>
        <rect
          fill={MN}
          height="80"
          rx="3"
          stroke={CU}
          strokeWidth="1.5"
          width="90"
          x="345"
          y="120"
        />
        <rect
          fill="oklch(18% 0.04 255)"
          height="16"
          rx="1"
          width="80"
          x="350"
          y="124"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="356"
          y="135"
        >
          BLOCK 03
        </text>
        <text
          className="bc-hash bc-h3"
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          opacity="0.7"
          x="354"
          y="154"
        >
          0x1b8c...9ae3
        </text>
        <text
          className="bc-hash bc-h3"
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          opacity="0.5"
          x="354"
          y="166"
        >
          nonce: 15820
        </text>
        <rect
          className="bc-glow"
          fill={CU}
          height="80"
          opacity="0.05"
          rx="3"
          width="90"
          x="345"
          y="120"
        />
        <rect
          className="wd-cursor"
          fill={CU}
          height="8"
          style={{ animation: "sd-blink 1.1s step-end infinite" }}
          width="5"
          x="354"
          y="176"
        />
      </g>

      {/* network nodes above */}
      <g
        style={{
          animation: "sd-float 3.6s ease-in-out infinite",
          transformOrigin: "130px 60px",
        }}
      >
        <circle
          cx="130"
          cy="60"
          fill={LN}
          r="20"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="130"
          y="58"
        >
          NODE
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="130"
          y="68"
        >
          validator
        </text>
        <circle
          className="bc-node-ring"
          cx="130"
          cy="60"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="1"
        />
      </g>

      <g
        style={{
          animation: "sd-float 4s ease-in-out 0.8s infinite",
          transformOrigin: "290px 50px",
        }}
      >
        <circle
          cx="290"
          cy="50"
          fill={LN}
          r="20"
          stroke={CU}
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="290"
          y="48"
        >
          PEER
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="290"
          y="58"
        >
          consensus
        </text>
        <circle
          className="bc-node-ring"
          cx="290"
          cy="50"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="1"
          style={{ animationDelay: "0.7s" }}
        />
      </g>

      {/* connector lines to chain */}
      <line
        opacity="0.15"
        stroke={OX}
        strokeDasharray="3 3"
        strokeWidth="1"
        x1="130"
        x2="100"
        y1="80"
        y2="120"
      />
      <line
        opacity="0.15"
        stroke={OX}
        strokeDasharray="3 3"
        strokeWidth="1"
        x1="290"
        x2="245"
        y1="70"
        y2="120"
      />
      <line
        opacity="0.15"
        stroke={OX}
        strokeDasharray="3 3"
        strokeWidth="1"
        x1="290"
        x2="390"
        y1="70"
        y2="120"
      />

      {/* distributed ledger label */}
      <rect
        fill={PM}
        height="24"
        rx="2"
        stroke={OX}
        strokeWidth="1"
        width="140"
        x="140"
        y="240"
      />
      <text
        dominantBaseline="middle"
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7.5"
        letterSpacing="1.5"
        textAnchor="middle"
        x="210"
        y="253"
      >
        DISTRIBUTED LEDGER
      </text>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="332"
      >
        quartic lab · on-chain
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   3 · MOBILE DEVELOPMENT
   phone with app screens + notifications
   ───────────────────────────────────────────── */
function MobileDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 380"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .mb-phone { animation: sd-float 4.2s ease-in-out infinite; transform-origin: 210px 190px; }
          .mb-notif { animation: sd-signal 2.5s ease-in-out infinite; }
          .mb-n2 { animation-delay: 0.8s; }
          .mb-n3 { animation-delay: 1.6s; }
          .mb-l1 { animation: sd-line-appear 0.35s ease-out 0.3s both; }
          .mb-l2 { animation: sd-line-appear 0.35s ease-out 0.7s both; }
          .mb-l3 { animation: sd-line-appear 0.35s ease-out 1.1s both; }
          .mb-glow { animation: sd-glow 3s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={30 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* phone body */}
      <g className="mb-phone">
        {/* outer frame */}
        <rect
          fill={MN}
          height="220"
          rx="14"
          stroke={OX}
          strokeWidth="2"
          width="120"
          x="150"
          y="70"
        />
        {/* screen */}
        <rect
          fill="oklch(16% 0.045 255)"
          height="195"
          rx="10"
          width="108"
          x="156"
          y="80"
        />
        <rect
          className="mb-glow"
          fill={CU}
          height="195"
          rx="10"
          width="108"
          x="156"
          y="80"
        />

        {/* status bar */}
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          opacity="0.6"
          x="165"
          y="93"
        >
          9:41
        </text>
        <circle cx="250" cy="89" fill="oklch(65% 0.12 145)" r="2.5" />

        {/* app header */}
        <rect
          className="mb-l1"
          fill="oklch(22% 0.04 255)"
          height="18"
          rx="2"
          width="96"
          x="162"
          y="100"
        />
        <text
          className="mb-l1"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="178"
          y="112"
        >
          DASHBOARD
        </text>

        {/* stat cards */}
        <rect
          className="mb-l2"
          fill="oklch(25% 0.04 255)"
          height="32"
          rx="2"
          width="44"
          x="162"
          y="124"
        />
        <text
          className="mb-l2"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="12"
          fontWeight="600"
          x="170"
          y="145"
        >
          47
        </text>
        <text
          className="mb-l2"
          fill={LN}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          x="170"
          y="153"
        >
          tasks
        </text>

        <rect
          className="mb-l2"
          fill="oklch(25% 0.04 255)"
          height="32"
          rx="2"
          width="44"
          x="214"
          y="124"
        />
        <text
          className="mb-l2"
          fill="oklch(65% 0.12 145)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="12"
          fontWeight="600"
          x="222"
          y="145"
        >
          92
        </text>
        <text
          className="mb-l2"
          fill={LN}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          x="222"
          y="153"
        >
          done
        </text>

        {/* list items */}
        {[0, 1, 2, 3].map(i => (
          <g
            className="mb-l3"
            key={`li-${i}`}
            style={{ animationDelay: `${1.1 + i * 0.2}s` }}
          >
            <rect
              fill="oklch(22% 0.04 255)"
              height="20"
              rx="2"
              width="96"
              x="162"
              y={164 + i * 24}
            />
            <circle
              cx="174"
              cy={174 + i * 24}
              fill={i < 2 ? CU : "oklch(40% 0.04 255)"}
              r="4"
            />
            <rect
              fill="oklch(40% 0.03 255)"
              height="4"
              rx="1"
              width={40 + (i % 3) * 10}
              x="184"
              y={172 + i * 24}
            />
          </g>
        ))}

        {/* home indicator */}
        <rect
          fill={LN}
          height="3"
          opacity="0.3"
          rx="1.5"
          width="36"
          x="192"
          y="268"
        />
      </g>

      {/* notification bubbles floating up */}
      <g className="mb-notif" style={{ transformOrigin: "120px 140px" }}>
        <rect
          fill={LN}
          height="28"
          rx="8"
          stroke={OX}
          strokeWidth="1"
          width="70"
          x="60"
          y="120"
        />
        <circle cx="76" cy="134" fill={CU} r="5" />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5"
          fontWeight="600"
          x="76"
          y="136"
        >
          ✓
        </text>
        <rect
          fill={OX}
          height="3"
          opacity="0.3"
          rx="1"
          width="32"
          x="86"
          y="130"
        />
        <rect
          fill={OX}
          height="3"
          opacity="0.2"
          rx="1"
          width="22"
          x="86"
          y="136"
        />
      </g>

      <g className="mb-notif mb-n2" style={{ transformOrigin: "330px 180px" }}>
        <rect
          fill={LN}
          height="28"
          rx="8"
          stroke={CU}
          strokeWidth="1"
          width="70"
          x="290"
          y="170"
        />
        <circle cx="306" cy="184" fill="oklch(65% 0.12 145)" r="5" />
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          x="300"
          y="186"
        >
          ↑
        </text>
        <rect
          fill={OX}
          height="3"
          opacity="0.3"
          rx="1"
          width="28"
          x="316"
          y="180"
        />
        <rect
          fill={OX}
          height="3"
          opacity="0.2"
          rx="1"
          width="18"
          x="316"
          y="186"
        />
      </g>

      {/* floating tech tags */}
      <g
        style={{
          animation: "sd-float 3.6s ease-in-out 0.5s infinite",
          transformOrigin: "80px 280px",
        }}
      >
        <circle
          cx="80"
          cy="280"
          fill={LN}
          r="20"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="80"
          y="278"
        >
          iOS
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="80"
          y="288"
        >
          swift
        </text>
      </g>

      <g
        style={{
          animation: "sd-float 4s ease-in-out 1.4s infinite",
          transformOrigin: "350px 290px",
        }}
      >
        <circle
          cx="350"
          cy="290"
          fill={LN}
          r="20"
          stroke={CU}
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="350"
          y="288"
        >
          ANDROID
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="350"
          y="298"
        >
          kotlin
        </text>
        <circle
          cx="350"
          cy="290"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="1"
          style={{ animation: "sd-ping 2s ease-out infinite" }}
        />
      </g>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="372"
      >
        quartic lab · native experience
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   4 · UI/UX DESIGN
   design tool canvas with layers and pen tool
   ───────────────────────────────────────────── */
function UIUXDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .ux-canvas { animation: sd-float 4.5s ease-in-out infinite; transform-origin: 210px 170px; }
          .ux-pen { animation: sd-float 3s ease-in-out 0.6s infinite; transform-origin: 320px 100px; }
          .ux-l1 { animation: sd-line-appear 0.4s ease-out 0.2s both; }
          .ux-l2 { animation: sd-line-appear 0.4s ease-out 0.5s both; }
          .ux-l3 { animation: sd-line-appear 0.4s ease-out 0.8s both; }
          .ux-l4 { animation: sd-line-appear 0.4s ease-out 1.1s both; }
          .ux-cursor-move {
            animation: sd-float 2.5s ease-in-out infinite;
            transform-origin: 260px 200px;
          }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={20 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* artboard / canvas */}
      <g className="ux-canvas">
        <rect
          fill={LN}
          height="180"
          rx="3"
          stroke={OX}
          strokeWidth="1.5"
          width="240"
          x="90"
          y="70"
        />

        {/* design grid lines */}
        {[0, 1, 2].map(i => (
          <line
            key={`vg-${i}`}
            opacity="0.06"
            stroke={OX}
            strokeWidth="0.8"
            x1={150 + i * 60}
            x2={150 + i * 60}
            y1="70"
            y2="250"
          />
        ))}
        {[0, 1, 2].map(i => (
          <line
            key={`hg-${i}`}
            opacity="0.06"
            stroke={OX}
            strokeWidth="0.8"
            x1="90"
            x2="330"
            y1={110 + i * 45}
            y2={110 + i * 45}
          />
        ))}

        {/* wireframe elements */}
        {/* header placeholder */}
        <rect
          className="ux-l1"
          fill={PM}
          height="28"
          rx="2"
          stroke={OX}
          strokeDasharray="4 2"
          strokeWidth="0.8"
          width="210"
          x="105"
          y="82"
        />
        <rect
          className="ux-l1"
          fill={CU}
          height="6"
          opacity="0.5"
          rx="1"
          width="50"
          x="115"
          y="93"
        />

        {/* image placeholder */}
        <rect
          className="ux-l2"
          fill={PM}
          height="60"
          rx="2"
          stroke={OX}
          strokeDasharray="4 2"
          strokeWidth="0.8"
          width="95"
          x="105"
          y="118"
        />
        {/* cross inside image placeholder */}
        <line
          className="ux-l2"
          opacity="0.15"
          stroke={OX}
          strokeWidth="0.8"
          x1="105"
          x2="200"
          y1="118"
          y2="178"
        />
        <line
          className="ux-l2"
          opacity="0.15"
          stroke={OX}
          strokeWidth="0.8"
          x1="200"
          x2="105"
          y1="118"
          y2="178"
        />

        {/* text block placeholder */}
        <rect
          className="ux-l2"
          fill={PM}
          height="8"
          rx="1"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="0.5"
          width="95"
          x="210"
          y="118"
        />
        <rect
          className="ux-l2"
          fill={PM}
          height="8"
          rx="1"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="0.5"
          width="75"
          x="210"
          y="132"
        />
        <rect
          className="ux-l2"
          fill={PM}
          height="8"
          rx="1"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="0.5"
          width="85"
          x="210"
          y="146"
        />

        {/* button placeholder */}
        <rect
          className="ux-l3"
          fill={CU}
          height="20"
          opacity="0.3"
          rx="2"
          width="60"
          x="210"
          y="164"
        />
        <text
          className="ux-l3"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="7"
          fontWeight="600"
          x="222"
          y="178"
        >
          button
        </text>

        {/* card row */}
        {[0, 1, 2].map(i => (
          <rect
            className="ux-l4"
            fill={PM}
            height="32"
            key={`card-${i}`}
            rx="2"
            stroke={OX}
            strokeDasharray="3 2"
            strokeWidth="0.6"
            width="60"
            x={110 + i * 70}
            y="198"
          />
        ))}

        {/* selection handles on active element */}
        <rect
          fill="none"
          height="64"
          rx="1"
          stroke={CU}
          strokeWidth="1.2"
          width="99"
          x="103"
          y="116"
        />
        {[
          [103, 116],
          [202, 116],
          [103, 180],
          [202, 180],
          [152, 116],
          [152, 180],
          [103, 148],
          [202, 148],
        ].map(([cx, cy], i) => (
          <rect
            fill={CU}
            height="4"
            key={`h-${i}`}
            rx="1"
            width="4"
            x={cx - 2}
            y={cy - 2}
          />
        ))}
      </g>

      {/* pen tool cursor */}
      <g className="ux-pen">
        <path
          d="M320 85 L315 108 L320 104 L325 108 Z"
          fill={CU}
          stroke={OX}
          strokeWidth="1"
        />
        <circle cx="320" cy="82" fill={CU} r="3" />
      </g>

      {/* layers panel */}
      <g
        style={{
          animation: "sd-float 3.8s ease-in-out 1s infinite",
          transformOrigin: "48px 170px",
        }}
      >
        <rect
          fill={LN}
          height="80"
          rx="3"
          stroke={OX}
          strokeWidth="1"
          width="55"
          x="20"
          y="130"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          x="26"
          y="143"
        >
          LAYERS
        </text>
        {["header", "hero img", "copy", "cta btn"].map((label, i) => (
          <g key={label}>
            <rect
              fill={i === 0 ? "oklch(58% 0.12 45 / 0.15)" : "transparent"}
              height="12"
              rx="1"
              width="45"
              x="25"
              y={148 + i * 14}
            />
            <text
              fill={OX}
              fontFamily="Space Grotesk, sans-serif"
              fontSize="5.5"
              opacity={i === 0 ? 1 : 0.5}
              x="29"
              y={157 + i * 14}
            >
              {label}
            </text>
          </g>
        ))}
      </g>

      {/* color tokens */}
      <g
        style={{
          animation: "sd-float 3.2s ease-in-out 1.6s infinite",
          transformOrigin: "380px 260px",
        }}
      >
        <circle cx="370" cy="260" fill={OX} r="8" stroke={LN} strokeWidth="1" />
        <circle cx="388" cy="260" fill={CU} r="8" stroke={LN} strokeWidth="1" />
        <circle cx="379" cy="245" fill={LN} r="8" stroke={OX} strokeWidth="1" />
      </g>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="332"
      >
        quartic lab · pixel craft
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   5 · GAME DEVELOPMENT
   game controller + level design canvas
   ───────────────────────────────────────────── */
function GameDevDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .gd-screen { animation: sd-float 4s ease-in-out infinite; transform-origin: 210px 150px; }
          .gd-char { animation: sd-float 2s ease-in-out infinite; transform-origin: 200px 160px; }
          .gd-l1 { animation: sd-line-appear 0.35s ease-out 0.3s both; }
          .gd-l2 { animation: sd-line-appear 0.35s ease-out 0.7s both; }
          .gd-l3 { animation: sd-line-appear 0.35s ease-out 1.1s both; }
          .gd-sparkle { animation: sd-ping 1.6s ease-out infinite; }
          .gd-glow { animation: sd-glow 2.5s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={20 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* game screen */}
      <g className="gd-screen">
        <rect
          fill={MN}
          height="140"
          rx="4"
          stroke={OX}
          strokeWidth="1.5"
          width="200"
          x="110"
          y="60"
        />
        <rect
          fill="oklch(16% 0.045 255)"
          height="126"
          rx="2"
          width="186"
          x="117"
          y="66"
        />
        <rect
          className="gd-glow"
          fill={CU}
          height="126"
          rx="2"
          width="186"
          x="117"
          y="66"
        />

        {/* pixel ground */}
        <rect
          className="gd-l1"
          fill="oklch(28% 0.05 255)"
          height="20"
          width="186"
          x="117"
          y="172"
        />
        {/* platform blocks */}
        <rect
          className="gd-l2"
          fill="oklch(35% 0.06 255)"
          height="14"
          rx="1"
          width="40"
          x="140"
          y="148"
        />
        <rect
          className="gd-l2"
          fill="oklch(35% 0.06 255)"
          height="14"
          rx="1"
          width="40"
          x="220"
          y="130"
        />
        <rect
          className="gd-l3"
          fill="oklch(35% 0.06 255)"
          height="14"
          rx="1"
          width="30"
          x="180"
          y="115"
        />

        {/* character (simple pixel person) */}
        <g className="gd-char">
          {/* body */}
          <rect fill={CU} height="12" rx="1" width="8" x="196" y="136" />
          {/* head */}
          <rect fill={CU} height="8" rx="4" width="8" x="196" y="127" />
          {/* legs */}
          <line
            stroke={CU}
            strokeLinecap="round"
            strokeWidth="2"
            x1="198"
            x2="196"
            y1="148"
            y2="155"
          />
          <line
            stroke={CU}
            strokeLinecap="round"
            strokeWidth="2"
            x1="202"
            x2="204"
            y1="148"
            y2="155"
          />
        </g>

        {/* collectible coins */}
        <circle
          className="gd-l3"
          cx="230"
          cy="122"
          fill="oklch(75% 0.14 90)"
          r="4"
          stroke="oklch(60% 0.12 90)"
          strokeWidth="0.8"
        />
        <circle
          className="gd-l3"
          cx="245"
          cy="122"
          fill="oklch(75% 0.14 90)"
          r="4"
          stroke="oklch(60% 0.12 90)"
          strokeWidth="0.8"
        />
        <circle
          className="gd-sparkle"
          cx="230"
          cy="122"
          fill="none"
          r="3"
          stroke="oklch(75% 0.14 90)"
          strokeWidth="0.8"
        />

        {/* HUD */}
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          x="125"
          y="80"
        >
          SCORE: 2400
        </text>
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          opacity="0.5"
          x="245"
          y="80"
        >
          LVL 03
        </text>

        {/* stars */}
        {[0, 1, 2].map(i => (
          <text
            fill="oklch(75% 0.14 90)"
            fontSize="6"
            key={`star-${i}`}
            x={270 + i * 8}
            y="80"
          >
            ★
          </text>
        ))}
      </g>

      {/* controller */}
      <g
        style={{
          animation: "sd-float 3.5s ease-in-out 0.5s infinite",
          transformOrigin: "210px 260px",
        }}
      >
        <ellipse
          cx="210"
          cy="260"
          fill={PM}
          rx="70"
          ry="30"
          stroke={OX}
          strokeWidth="1.3"
        />
        {/* d-pad */}
        <rect fill={OX} height="18" rx="1" width="6" x="175" y="251" />
        <rect fill={OX} height="6" rx="1" width="18" x="169" y="257" />
        {/* buttons */}
        <circle cx="240" cy="254" fill={CU} r="4" />
        <circle cx="250" cy="260" fill="oklch(65% 0.12 145)" r="4" />
        <circle cx="240" cy="266" fill="oklch(55% 0.12 255)" r="4" />
        {/* center label */}
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5"
          fontWeight="600"
          letterSpacing="1"
          opacity="0.4"
          textAnchor="middle"
          x="210"
          y="262"
        >
          QUARTIC
        </text>
      </g>

      {/* floating tags */}
      <g
        style={{
          animation: "sd-float 3.8s ease-in-out 1.2s infinite",
          transformOrigin: "65px 120px",
        }}
      >
        <circle
          cx="65"
          cy="120"
          fill={LN}
          r="20"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="65"
          y="118"
        >
          UNITY
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="65"
          y="128"
        >
          engine
        </text>
      </g>

      <g
        style={{
          animation: "sd-float 4.2s ease-in-out 2s infinite",
          transformOrigin: "370px 110px",
        }}
      >
        <circle
          cx="370"
          cy="110"
          fill={LN}
          r="18"
          stroke={CU}
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="370"
          y="108"
        >
          UNREAL
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="370"
          y="118"
        >
          render
        </text>
      </g>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="332"
      >
        quartic lab · game engine
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   6 · IoT DEVELOPMENT
   connected devices hub with sensor signals
   ───────────────────────────────────────────── */
function IoTDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .iot-hub { animation: sd-pulse 3.5s ease-in-out infinite; transform-origin: 210px 170px; }
          .iot-signal { animation: sd-ping 2s ease-out infinite; }
          .iot-s2 { animation-delay: 0.6s; }
          .iot-s3 { animation-delay: 1.2s; }
          .iot-device { animation: sd-float 3.8s ease-in-out infinite; }
          .iot-d2 { animation-delay: 0.5s; }
          .iot-d3 { animation-delay: 1s; }
          .iot-d4 { animation-delay: 1.5s; }
          .iot-wave1 { animation: sd-ping 2.5s ease-out 0s infinite; }
          .iot-wave2 { animation: sd-ping 2.5s ease-out 0.8s infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={20 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* central hub */}
      <g className="iot-hub">
        <circle
          cx="210"
          cy="170"
          fill={MN}
          r="40"
          stroke={OX}
          strokeWidth="1.5"
        />
        <circle cx="210" cy="170" fill="oklch(16% 0.045 255)" r="34" />
        <circle
          className="iot-wave1"
          cx="210"
          cy="170"
          fill="none"
          r="5"
          stroke={CU}
          strokeWidth="1"
        />
        <circle
          className="iot-wave2"
          cx="210"
          cy="170"
          fill="none"
          r="5"
          stroke={CU}
          strokeWidth="0.8"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="8"
          fontWeight="600"
          letterSpacing="1.5"
          textAnchor="middle"
          x="210"
          y="167"
        >
          HUB
        </text>
        <text
          dominantBaseline="middle"
          fill={LN}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6.5"
          opacity="0.5"
          textAnchor="middle"
          x="210"
          y="180"
        >
          gateway
        </text>
      </g>

      {/* device 1 — sensor (top left) */}
      <g className="iot-device" style={{ transformOrigin: "90px 80px" }}>
        <rect
          fill={LN}
          height="50"
          rx="3"
          stroke={OX}
          strokeWidth="1"
          width="60"
          x="60"
          y="55"
        />
        <circle cx="90" cy="70" fill={CU} r="4" />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="90"
          y="84"
        >
          SENSOR
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          opacity="0.6"
          textAnchor="middle"
          x="90"
          y="96"
        >
          23.4°C
        </text>
        <circle
          className="iot-signal"
          cx="90"
          cy="70"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="0.8"
        />
        <line
          opacity="0.2"
          stroke={OX}
          strokeDasharray="4 3"
          strokeWidth="1"
          x1="120"
          x2="178"
          y1="80"
          y2="155"
        />
      </g>

      {/* device 2 — camera (top right) */}
      <g
        className="iot-device iot-d2"
        style={{ transformOrigin: "340px 90px" }}
      >
        <rect
          fill={LN}
          height="50"
          rx="3"
          stroke={OX}
          strokeWidth="1"
          width="60"
          x="310"
          y="65"
        />
        {/* camera lens */}
        <circle
          cx="340"
          cy="80"
          fill="none"
          r="8"
          stroke={OX}
          strokeWidth="1.2"
        />
        <circle cx="340" cy="80" fill={MN} r="5" />
        <circle cx="340" cy="80" fill={CU} opacity="0.4" r="2.5" />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="340"
          y="100"
        >
          CAMERA
        </text>
        <circle
          className="iot-signal iot-s2"
          cx="340"
          cy="80"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="0.8"
        />
        <line
          opacity="0.2"
          stroke={OX}
          strokeDasharray="4 3"
          strokeWidth="1"
          x1="310"
          x2="245"
          y1="90"
          y2="155"
        />
      </g>

      {/* device 3 — actuator (bottom left) */}
      <g
        className="iot-device iot-d3"
        style={{ transformOrigin: "100px 270px" }}
      >
        <rect
          fill={LN}
          height="46"
          rx="3"
          stroke={CU}
          strokeWidth="1"
          width="56"
          x="72"
          y="250"
        />
        {/* gear icon */}
        <circle
          cx="100"
          cy="265"
          fill="none"
          r="7"
          stroke={OX}
          strokeWidth="1.2"
        />
        <circle cx="100" cy="265" fill={OX} r="3" />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="100"
          y="283"
        >
          ACTUATOR
        </text>
        <line
          opacity="0.2"
          stroke={OX}
          strokeDasharray="4 3"
          strokeWidth="1"
          x1="128"
          x2="185"
          y1="272"
          y2="195"
        />
      </g>

      {/* device 4 — display (bottom right) */}
      <g
        className="iot-device iot-d4"
        style={{ transformOrigin: "330px 265px" }}
      >
        <rect
          fill={LN}
          height="46"
          rx="3"
          stroke={OX}
          strokeWidth="1"
          width="56"
          x="302"
          y="245"
        />
        <rect fill={MN} height="22" rx="1" width="40" x="310" y="250" />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          x="315"
          y="264"
        >
          OK
        </text>
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="330"
          y="284"
        >
          DISPLAY
        </text>
        <line
          opacity="0.2"
          stroke={OX}
          strokeDasharray="4 3"
          strokeWidth="1"
          x1="302"
          x2="240"
          y1="268"
          y2="195"
        />
      </g>

      {/* data flow label */}
      <rect
        fill={PM}
        height="22"
        rx="2"
        stroke={OX}
        strokeWidth="1"
        width="100"
        x="160"
        y="24"
      />
      <text
        dominantBaseline="middle"
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        letterSpacing="1.5"
        textAnchor="middle"
        x="210"
        y="36"
      >
        MESH NETWORK
      </text>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="332"
      >
        quartic lab · connected
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   7 · AI / ML DEVELOPMENT
   neural network layers with data flowing
   ───────────────────────────────────────────── */
function AIDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .ai-node { animation: sd-pulse 3s ease-in-out infinite; }
          .ai-n1 { animation-delay: 0s; }
          .ai-n2 { animation-delay: 0.3s; }
          .ai-n3 { animation-delay: 0.6s; }
          .ai-edge { stroke-dasharray: 60; stroke-dashoffset: 60; animation: sd-dash 1.5s ease-out forwards; }
          .ai-e2 { animation-delay: 0.3s; }
          .ai-e3 { animation-delay: 0.6s; }
          .ai-e4 { animation-delay: 0.9s; }
          .ai-label { animation: sd-line-appear 0.4s ease-out both; }
          .ai-la1 { animation-delay: 0.5s; }
          .ai-la2 { animation-delay: 1s; }
          .ai-la3 { animation-delay: 1.5s; }
          .ai-output { animation: sd-glow 2.5s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={20 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* neural network visualization */}
      {/* input layer (3 nodes) */}
      {[90, 160, 230].map((y, i) => (
        <g key={`in-${i}`}>
          {/* edges to hidden layer */}
          {[110, 170, 230].map((hy, j) => (
            <line
              className={`ai-edge ${j > 0 ? `ai-e${j + 1}` : ""}`}
              key={`e1-${i}-${j}`}
              stroke={CU}
              strokeOpacity="0.25"
              strokeWidth="1"
              x1="90"
              x2="190"
              y1={y}
              y2={hy}
            />
          ))}
          <circle
            className={`ai-node ai-n${(i % 3) + 1}`}
            cx="70"
            cy={y}
            fill={LN}
            r="14"
            stroke={OX}
            strokeWidth="1.2"
            style={{ transformOrigin: `70px ${y}px` }}
          />
          <text
            dominantBaseline="middle"
            fill={OX}
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6"
            opacity="0.6"
            textAnchor="middle"
            x="70"
            y={y}
          >
            x{i + 1}
          </text>
        </g>
      ))}

      {/* hidden layer (3 nodes) */}
      {[110, 170, 230].map((y, i) => (
        <g key={`hid-${i}`}>
          {/* edges to output */}
          {[140, 200].map((oy, j) => (
            <line
              className={`ai-edge ai-e${j + 3}`}
              key={`e2-${i}-${j}`}
              stroke={CU}
              strokeOpacity="0.25"
              strokeWidth="1"
              x1="210"
              x2="310"
              y1={y}
              y2={oy}
            />
          ))}
          <circle
            className={`ai-node ai-n${(i % 3) + 1}`}
            cx="210"
            cy={y}
            fill={LN}
            r="14"
            stroke={CU}
            strokeWidth="1.2"
            style={{ transformOrigin: `210px ${y}px` }}
          />
          <text
            dominantBaseline="middle"
            fill={CU}
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6"
            fontWeight="600"
            textAnchor="middle"
            x="210"
            y={y}
          >
            h{i + 1}
          </text>
        </g>
      ))}

      {/* output layer (2 nodes) */}
      {[140, 200].map((y, i) => (
        <g key={`out-${i}`}>
          <circle
            className="ai-output"
            cx="340"
            cy={y}
            fill={CU}
            opacity="0.15"
            r="20"
            style={{ transformOrigin: `340px ${y}px` }}
          />
          <circle
            cx="340"
            cy={y}
            fill={LN}
            r="14"
            stroke={OX}
            strokeWidth="1.2"
          />
          <text
            dominantBaseline="middle"
            fill={OX}
            fontFamily="IBM Plex Mono, monospace"
            fontSize="6"
            fontWeight="600"
            textAnchor="middle"
            x="340"
            y={y}
          >
            y{i + 1}
          </text>
        </g>
      ))}

      {/* layer labels */}
      <text
        className="ai-label ai-la1"
        dominantBaseline="middle"
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        letterSpacing="1"
        opacity="0.4"
        textAnchor="middle"
        x="70"
        y="268"
      >
        INPUT
      </text>
      <text
        className="ai-label ai-la2"
        dominantBaseline="middle"
        fill={CU}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        letterSpacing="1"
        opacity="0.6"
        textAnchor="middle"
        x="210"
        y="268"
      >
        HIDDEN
      </text>
      <text
        className="ai-label ai-la3"
        dominantBaseline="middle"
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        letterSpacing="1"
        opacity="0.4"
        textAnchor="middle"
        x="340"
        y="248"
      >
        OUTPUT
      </text>

      {/* floating metrics */}
      <g
        style={{
          animation: "sd-float 3.5s ease-in-out infinite",
          transformOrigin: "210px 40px",
        }}
      >
        <rect
          fill={PM}
          height="28"
          rx="2"
          stroke={OX}
          strokeWidth="1"
          width="120"
          x="150"
          y="26"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          textAnchor="middle"
          x="210"
          y="37"
        >
          ACCURACY: 97.2%
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          opacity="0.5"
          textAnchor="middle"
          x="210"
          y="49"
        >
          epoch 42 / 50
        </text>
      </g>

      {/* loss curve mini chart */}
      <g
        style={{
          animation: "sd-float 4s ease-in-out 1.2s infinite",
          transformOrigin: "370px 300px",
        }}
      >
        <rect
          fill={LN}
          height="40"
          rx="2"
          stroke={OX}
          strokeWidth="1"
          width="60"
          x="340"
          y="275"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5"
          fontWeight="600"
          letterSpacing="1"
          x="348"
          y="285"
        >
          LOSS
        </text>
        <polyline
          fill="none"
          points="348,310 355,305 362,298 369,296 376,294 383,293 390,292"
          stroke={CU}
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </g>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="332"
      >
        quartic lab · neural inference
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   8 · DEVOPS
   CI/CD pipeline with stages and deployment
   ───────────────────────────────────────────── */
function DevOpsDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 340"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .do-pipe { stroke-dasharray: 8 4; stroke-dashoffset: 48; animation: sd-dash 2s ease-out forwards; }
          .do-p2 { animation-delay: 0.6s; }
          .do-p3 { animation-delay: 1.2s; }
          .do-p4 { animation-delay: 1.8s; }
          .do-stage { animation: sd-line-appear 0.4s ease-out both; }
          .do-s1 { animation-delay: 0.2s; }
          .do-s2 { animation-delay: 0.7s; }
          .do-s3 { animation-delay: 1.2s; }
          .do-s4 { animation-delay: 1.7s; }
          .do-s5 { animation-delay: 2.2s; }
          .do-spin { animation: sd-rotate 8s linear infinite; transform-origin: 370px 90px; }
          .do-pulse { animation: sd-pulse 2.5s ease-in-out infinite; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={20 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* pipeline arrows */}
      <line
        className="do-pipe"
        stroke={CU}
        strokeWidth="2"
        x1="106"
        x2="138"
        y1="165"
        y2="165"
      />
      <line
        className="do-pipe do-p2"
        stroke={CU}
        strokeWidth="2"
        x1="218"
        x2="250"
        y1="165"
        y2="165"
      />
      <line
        className="do-pipe do-p3"
        stroke={CU}
        strokeWidth="2"
        x1="330"
        x2="362"
        y1="165"
        y2="165"
      />

      {/* stage 1 — code / commit */}
      <g className="do-stage do-s1">
        <rect
          fill={MN}
          height="70"
          rx="3"
          stroke={OX}
          strokeWidth="1.3"
          width="80"
          x="26"
          y="130"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="36"
          y="150"
        >
          COMMIT
        </text>
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          opacity="0.5"
          x="36"
          y="163"
        >
          git push
        </text>
        <text
          fill="oklch(65% 0.12 145)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          x="36"
          y="176"
        >
          ✓ main
        </text>
        {/* git branch icon */}
        <circle cx="86" cy="145" fill={CU} r="3" />
        <line stroke={CU} strokeWidth="1" x1="86" x2="86" y1="148" y2="158" />
        <circle cx="86" cy="161" fill={OX} r="2" />
      </g>

      {/* stage 2 — build */}
      <g className="do-stage do-s2">
        <rect
          fill={MN}
          height="70"
          rx="3"
          stroke={OX}
          strokeWidth="1.3"
          width="80"
          x="138"
          y="130"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="148"
          y="150"
        >
          BUILD
        </text>
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          opacity="0.5"
          x="148"
          y="163"
        >
          npm run build
        </text>
        <text
          fill="oklch(65% 0.12 145)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          x="148"
          y="176"
        >
          ✓ 0 errors
        </text>
        {/* progress bar */}
        <rect
          fill="oklch(25% 0.04 255)"
          height="4"
          rx="2"
          width="50"
          x="148"
          y="185"
        />
        <rect fill={CU} height="4" rx="2" width="42" x="148" y="185" />
      </g>

      {/* stage 3 — test */}
      <g className="do-stage do-s3">
        <rect
          fill={MN}
          height="70"
          rx="3"
          stroke={OX}
          strokeWidth="1.3"
          width="80"
          x="250"
          y="130"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="260"
          y="150"
        >
          TEST
        </text>
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          opacity="0.5"
          x="260"
          y="163"
        >
          142 passing
        </text>
        <text
          fill="oklch(65% 0.12 145)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          x="260"
          y="176"
        >
          ✓ coverage 94%
        </text>
        {/* test indicator */}
        <circle cx="310" cy="148" fill="oklch(65% 0.12 145)" r="3.5" />
      </g>

      {/* stage 4 — deploy */}
      <g className="do-stage do-s4">
        <rect
          fill={MN}
          height="70"
          rx="3"
          stroke={CU}
          strokeWidth="1.5"
          width="80"
          x="362"
          y="130"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          letterSpacing="1"
          x="372"
          y="150"
        >
          DEPLOY
        </text>
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          opacity="0.5"
          x="372"
          y="163"
        >
          production
        </text>
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          x="372"
          y="176"
        >
          → live
        </text>
        <circle
          className="do-pulse"
          cx="425"
          cy="148"
          fill={CU}
          r="4"
          style={{ transformOrigin: "425px 148px" }}
        />
      </g>

      {/* monitoring dashboard above */}
      <g
        style={{
          animation: "sd-float 3.5s ease-in-out infinite",
          transformOrigin: "160px 60px",
        }}
      >
        <rect
          fill={LN}
          height="50"
          rx="3"
          stroke={OX}
          strokeWidth="1"
          width="120"
          x="100"
          y="35"
        />
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          letterSpacing="1"
          x="112"
          y="50"
        >
          MONITORING
        </text>
        {/* mini chart */}
        <polyline
          fill="none"
          points="112,72 125,65 138,68 151,60 164,63 177,58 190,56 203,55"
          stroke={CU}
          strokeLinecap="round"
          strokeWidth="1.2"
        />
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          x="112"
          y="80"
        >
          uptime 99.9%
        </text>
      </g>

      {/* spinning gear */}
      <g className="do-spin">
        <circle
          cx="370"
          cy="90"
          fill="none"
          r="12"
          stroke={OX}
          strokeDasharray="4 3"
          strokeWidth="1.2"
        />
        <circle cx="370" cy="90" fill={PM} r="5" stroke={OX} strokeWidth="1" />
      </g>

      {/* container icon */}
      <g
        style={{
          animation: "sd-float 4s ease-in-out 1s infinite",
          transformOrigin: "55px 260px",
        }}
      >
        <rect
          fill={LN}
          height="36"
          rx="2"
          stroke={OX}
          strokeWidth="1"
          width="50"
          x="30"
          y="244"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="55"
          y="258"
        >
          DOCKER
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="55"
          y="270"
        >
          image
        </text>
      </g>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="332"
      >
        quartic lab · ship it
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   9 · GENAI & AUTOMATION
   person receiving smart notifications on phone
   with AI pipeline flowing behind
   ───────────────────────────────────────────── */
function GenAIDoodle() {
  return (
    <svg
      fill="none"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
      viewBox="0 0 420 380"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          ${SHARED_KEYFRAMES}
          .ga-float { animation: sd-float 4s ease-in-out infinite; transform-origin: 210px 200px; }
          .ga-notif { animation: sd-signal 2.8s ease-in-out infinite; }
          .ga-n2 { animation-delay: 0.9s; }
          .ga-n3 { animation-delay: 1.8s; }
          .ga-spark { animation: sd-ping 1.8s ease-out infinite; }
          .ga-l1 { animation: sd-line-appear 0.35s ease-out 0.3s both; }
          .ga-l2 { animation: sd-line-appear 0.35s ease-out 0.7s both; }
          .ga-l3 { animation: sd-line-appear 0.35s ease-out 1.1s both; }
          .ga-glow { animation: sd-glow 2.8s ease-in-out infinite; }
          .ga-pipe { stroke-dasharray: 6 4; stroke-dashoffset: 40; animation: sd-dash 2s ease-out 0.5s forwards; }
        `}</style>
      </defs>

      {/* dot grid */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={30 + c * 46}
            cy={30 + r * 52}
            fill={OX}
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* person with phone */}
      <g className="ga-float">
        {/* body */}
        <rect
          fill={PM}
          height="58"
          rx="6"
          stroke={OX}
          strokeWidth="1.3"
          width="46"
          x="187"
          y="230"
        />
        {/* neck */}
        <rect
          fill={PM}
          height="8"
          rx="2"
          stroke={OX}
          strokeWidth="1"
          width="12"
          x="204"
          y="223"
        />
        {/* head */}
        <ellipse
          cx="210"
          cy="210"
          fill={PM}
          rx="18"
          ry="20"
          stroke={OX}
          strokeWidth="1.3"
        />
        <path d="M194 204 C194 188 226 188 226 204" fill={OX} opacity="0.7" />
        {/* eyes */}
        <ellipse cx="204" cy="209" fill={OX} rx="1.8" ry="2.2" />
        <ellipse cx="216" cy="209" fill={OX} rx="1.8" ry="2.2" />
        {/* glasses */}
        <rect
          fill="none"
          height="6"
          rx="1.5"
          stroke={CU}
          strokeWidth="1"
          width="10"
          x="199"
          y="206"
        />
        <rect
          fill="none"
          height="6"
          rx="1.5"
          stroke={CU}
          strokeWidth="1"
          width="10"
          x="211"
          y="206"
        />
        <line
          stroke={CU}
          strokeWidth="0.8"
          x1="209"
          x2="211"
          y1="209"
          y2="209"
        />

        {/* right arm holding phone */}
        <path
          d="M231 244 L256 234 L268 228"
          stroke={OX}
          strokeLinecap="round"
          strokeWidth="4.5"
        />
        {/* phone in hand */}
        <rect
          fill={MN}
          height="48"
          rx="4"
          stroke={OX}
          strokeWidth="1.2"
          width="28"
          x="258"
          y="208"
        />
        <rect
          fill="oklch(16% 0.045 255)"
          height="40"
          rx="2"
          width="22"
          x="261"
          y="212"
        />
        <rect
          className="ga-glow"
          fill={CU}
          height="40"
          rx="2"
          width="22"
          x="261"
          y="212"
        />

        {/* phone screen content */}
        <text
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="4.5"
          fontWeight="600"
          x="264"
          y="222"
        >
          AI ALERT
        </text>
        <rect
          fill="oklch(25% 0.04 255)"
          height="6"
          rx="1"
          width="18"
          x="263"
          y="226"
        />
        <rect
          fill="oklch(25% 0.04 255)"
          height="6"
          rx="1"
          width="18"
          x="263"
          y="234"
        />
        <circle cx="268" cy="244" fill={CU} r="2" />

        {/* left arm relaxed */}
        <path
          d="M189 245 L168 262 L165 280"
          stroke={OX}
          strokeLinecap="round"
          strokeWidth="4.5"
        />
        <ellipse
          cx="163"
          cy="283"
          fill={PM}
          rx="6"
          ry="4.5"
          stroke={OX}
          strokeWidth="1"
        />
      </g>

      {/* AI pipeline flowing behind */}
      <line
        className="ga-pipe"
        stroke={CU}
        strokeWidth="1.5"
        x1="50"
        x2="110"
        y1="100"
        y2="100"
      />
      <line
        className="ga-pipe"
        stroke={CU}
        strokeWidth="1.5"
        style={{ animationDelay: "0.8s" }}
        x1="160"
        x2="250"
        y1="100"
        y2="100"
      />
      <line
        className="ga-pipe"
        stroke={CU}
        strokeWidth="1.5"
        style={{ animationDelay: "1.2s" }}
        x1="300"
        x2="380"
        y1="100"
        y2="100"
      />

      {/* pipeline stages */}
      <g
        style={{
          animation: "sd-float 3.4s ease-in-out 0.2s infinite",
          transformOrigin: "135px 100px",
        }}
      >
        <rect
          fill={LN}
          height="30"
          rx="2"
          stroke={OX}
          strokeWidth="1"
          width="50"
          x="110"
          y="85"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="135"
          y="97"
        >
          INGEST
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          textAnchor="middle"
          x="135"
          y="109"
        >
          data
        </text>
      </g>

      <g
        style={{
          animation: "sd-float 3.8s ease-in-out 0.8s infinite",
          transformOrigin: "275px 100px",
        }}
      >
        <rect
          fill={LN}
          height="30"
          rx="2"
          stroke={CU}
          strokeWidth="1"
          width="50"
          x="250"
          y="85"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="275"
          y="97"
        >
          LLM
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          textAnchor="middle"
          x="275"
          y="109"
        >
          reason
        </text>
        <circle
          className="ga-spark"
          cx="275"
          cy="85"
          fill="none"
          r="3"
          stroke={CU}
          strokeWidth="0.8"
        />
      </g>

      {/* output bubble: smart notification */}
      <g className="ga-notif" style={{ transformOrigin: "90px 190px" }}>
        <rect
          fill={LN}
          height="32"
          rx="8"
          stroke={OX}
          strokeWidth="1"
          width="80"
          x="50"
          y="175"
        />
        <circle cx="68" cy="191" fill={CU} r="6" />
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="7"
          fontWeight="600"
          x="63"
          y="194"
        >
          ✓
        </text>
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          x="80"
          y="188"
        >
          task complete
        </text>
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          x="80"
          y="198"
        >
          auto-resolved
        </text>
      </g>

      <g className="ga-notif ga-n2" style={{ transformOrigin: "360px 186px" }}>
        <rect
          fill={LN}
          height="28"
          rx="8"
          stroke={CU}
          strokeWidth="1"
          width="70"
          x="320"
          y="172"
        />
        <circle cx="336" cy="186" fill="oklch(65% 0.12 145)" r="5" />
        <text
          fill={LN}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          x="331"
          y="189"
        >
          ↑
        </text>
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          x="346"
          y="184"
        >
          priority
        </text>
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          x="346"
          y="194"
        >
          escalated
        </text>
      </g>

      <g className="ga-notif ga-n3" style={{ transformOrigin: "90px 290px" }}>
        <rect
          fill={LN}
          height="28"
          rx="8"
          stroke={OX}
          strokeWidth="1"
          width="76"
          x="50"
          y="278"
        />
        <circle cx="68" cy="292" fill={CU} r="5" />
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          x="80"
          y="289"
        >
          report ready
        </text>
        <text
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          x="80"
          y="299"
        >
          3 insights
        </text>
      </g>

      {/* data source label */}
      <g
        style={{
          animation: "sd-float 4s ease-in-out 1.5s infinite",
          transformOrigin: "40px 100px",
        }}
      >
        <circle
          cx="40"
          cy="100"
          fill={LN}
          r="16"
          stroke={OX}
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="40"
          y="98"
        >
          RAW
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          textAnchor="middle"
          x="40"
          y="108"
        >
          input
        </text>
      </g>

      {/* output action */}
      <g
        style={{
          animation: "sd-float 3.6s ease-in-out 2s infinite",
          transformOrigin: "390px 100px",
        }}
      >
        <circle
          cx="390"
          cy="100"
          fill={LN}
          r="16"
          stroke={CU}
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill={CU}
          fontFamily="IBM Plex Mono, monospace"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="390"
          y="98"
        >
          ACT
        </text>
        <text
          dominantBaseline="middle"
          fill={OX}
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5"
          opacity="0.5"
          textAnchor="middle"
          x="390"
          y="108"
        >
          notify
        </text>
      </g>

      <text
        fill={OX}
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="372"
      >
        quartic lab · intelligent automation
      </text>
    </svg>
  );
}

/* ── slug → doodle map ──────────────────────── */
const SERVICE_DOODLE_MAP = {
  "ai-ml-development": AIDoodle,
  "blockchain-development": BlockchainDoodle,
  devops: DevOpsDoodle,
  "game-development": GameDevDoodle,
  "genai-automation": GenAIDoodle,
  "iot-development": IoTDoodle,
  "mobile-development": MobileDoodle,
  "ui-ux-design": UIUXDoodle,
  "web-development": WebDevDoodle,
};

export default function ServiceDoodle({ slug }) {
  const Comp = SERVICE_DOODLE_MAP[slug];
  if (!Comp) {
    return null;
  }
  return <Comp />;
}
