import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_URL } from "../utils/siteUrl";
import styles from "../styles/aboutNew.module.css";

/* ── data ────────────────────────────────────────── */

// Aligned with the hero/mission prose (50+ products, 15-person team) and
// the homepage stats block — audit C5.
const stats = [
  { label: "Projects delivered", suffix: "+", target: 50 },
  { label: "Countries served", suffix: "+", target: 12 },
  { label: "Positive reviews", suffix: "+", target: 680 },
  { label: "Client satisfaction", suffix: "%", target: 99 },
];

const values = [
  {
    desc: "From mobile to blockchain to AI — one team, zero outsourcing.",
    title: "Full-stack expertise",
  },
  {
    desc: "Weekly demos, shared dashboards, and no surprises.",
    title: "Radical transparency",
  },
  {
    desc: "Startup speed with enterprise-grade quality and security.",
    title: "Ship fast, ship right",
  },
  {
    desc: "Your idea gets a scope, timeline, and cost within 12 hours.",
    title: "12-hour estimates",
  },
];

const processSteps = [
  {
    day: "Day 0",
    desc: "NDA signed within 4 business hours of first contact. No discovery call starts without one.",
    label: "NDA signed",
  },
  {
    day: "Day 1",
    desc: "We learn your goals, constraints, budget, and timeline.",
    label: "Discovery call",
  },
  {
    day: "Day 3\u20135",
    desc: "Scope, timeline, team composition, and detailed cost breakdown.",
    label: "Proposal & SOW",
  },
  {
    day: "Week 1",
    desc: "Repo setup, sprint board, CI/CD, and full team introduction.",
    label: "Kickoff & sprint planning",
  },
  {
    day: "Week 2+",
    desc: "2-week sprints. Live demo every Friday at 4pm Pakistan / 9am New York. Burndown visible in your Jira instance from day one.",
    label: "Development sprints",
  },
  {
    day: "Final sprint",
    desc: "Full QA, staging environment, and dedicated client testing.",
    label: "QA & staging",
  },
  {
    day: "Final week",
    desc: "Deployment, documentation, and 30-day free support included.",
    label: "Launch & handoff",
  },
];

const engagementModels = [
  {
    ctaLabel: "Start with fixed price",
    includes: [
      "Scoped requirements document",
      "Fixed timeline & budget",
      "2 rounds of revisions included",
      "No hidden costs",
    ],
    timeline: "Typical: 4\u201312 weeks",
    title: "Fixed price",
    when: "Best for well-defined projects with clear scope.",
  },
  {
    ctaLabel: "Start with T&M",
    includes: [
      "Weekly billing",
      "Flexible scope",
      "Direct developer access",
      "Monthly reporting",
    ],
    timeline: "Typical: ongoing",
    title: "Time & material",
    when: "Best when requirements evolve as you build.",
  },
  {
    ctaLabel: "Start with dedicated team",
    includes: [
      "Senior devs + PM",
      "Daily standups",
      "Shared Slack & Jira",
      "30-day scale notice",
    ],
    timeline: "Typical: 3+ months",
    title: "Dedicated team",
    when: "Best for long-term product work needing reliability.",
  },
];

const faqs = [
  {
    a: "We typically start at $5,000. For smaller scopes, we offer fixed-price packages.",
    q: "What\u2019s your minimum project size?",
  },
  {
    a: "Yes, always \u2014 before any discovery or scoping call.",
    q: "Do you sign NDAs?",
  },
  {
    a: "Yes. Every project has a dedicated PM and a shared Slack channel.",
    q: "Will we have a dedicated project manager?",
  },
  {
    a: "Yes. Our dedicated team model starts at $30/hr for senior developers.",
    q: "Can we hire a dedicated developer?",
  },
  {
    a: "30 days of free support is included. After that, we offer monthly retainer plans.",
    q: "What happens after launch?",
  },
  {
    a: "Our core team is in Lahore, Pakistan. We serve clients across North America, Europe, and the Middle East, and regularly overlap working hours with US East Coast, UK, and EU time zones.",
    q: "Where is your team based?",
  },
  {
    a: "You do. IP transfers to the client on final payment. This is standard in our contracts, and we\u2019re happy to sign custom IP assignment docs if your lawyer requires them.",
    q: "Who owns the IP of what you build?",
  },
  {
    a: "We absorb the first 10% of scope creep at no extra charge \u2014 it\u2019s in our standard contract. Beyond that, we pause, present the options (cut scope, extend timeline, or add budget), and only continue with written approval.",
    q: "What happens if the project goes over scope?",
  },
  {
    a: "Yes. Email hello@quarticlab.com and we\u2019ll send you our standard SOW template and MSA within the same business day.",
    q: "Can we see a sample contract before the discovery call?",
  },
  {
    a: "Every project has at least 3 hours of live overlap with the client\u2019s time zone. Our team regularly works US hours (EST\u00a0/\u00a0PST) for US clients, and EU hours for European clients. We never do 100% async handoffs.",
    q: "How do you handle time-zone differences?",
  },
];

/* ── svg helpers ─────────────────────────────────── */

function StatIcon({ index }) {
  const icons = [
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="layers"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>,
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="globe"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="chat"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="m9 10 2 2 4-4" />
    </svg>,
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="target"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

function ValueIcon({ index }) {
  const icons = [
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="crosshair"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" x2="18" y1="12" y2="12" />
      <line x1="6" x2="2" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
    </svg>,
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="eye"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="zap"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>,
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      key="clock"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="28"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>,
  ];
  return icons[index] || icons[0];
}

function MissionDoodle() {
  return (
    <svg
      aria-hidden="true"
      className={styles.missionDoodle}
      fill="none"
      focusable="false"
      viewBox="0 0 420 420"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          @keyframes ab-float {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-5px); }
          }
          @keyframes ab-blink {
            0%, 45% { opacity: 1; }
            50%, 95% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes ab-line-appear {
            from { opacity: 0; transform: translateX(-4px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes ab-ping {
            0%   { r: 3; opacity: 0.7; }
            100% { r: 12; opacity: 0; }
          }
          @keyframes ab-glow {
            0%, 100% { opacity: 0.15; }
            50%      { opacity: 0.3; }
          }
          @keyframes ab-orbit {
            to { transform: rotate(360deg); }
          }
          @keyframes ab-dash-flow {
            to { stroke-dashoffset: -20; }
          }
          @keyframes ab-arm-type {
            0%, 100% { transform: rotate(0deg); }
            25%      { transform: rotate(-2deg); }
            75%      { transform: rotate(2deg); }
          }
          .ab-orbit-ring {
            animation: ab-orbit 30s linear infinite;
            transform-origin: 210px 210px;
          }
          .ab-orbit-ring-r {
            animation: ab-orbit 25s linear infinite reverse;
            transform-origin: 210px 210px;
          }
          .ab-float-person {
            animation: ab-float 4s ease-in-out infinite;
            transform-origin: 140px 260px;
          }
          .ab-float-person2 {
            animation: ab-float 4.4s ease-in-out 0.8s infinite;
            transform-origin: 290px 250px;
          }
          .ab-arm-l { animation: ab-arm-type 0.5s ease-in-out infinite; transform-origin: 120px 275px; }
          .ab-arm-r { animation: ab-arm-type 0.5s ease-in-out infinite reverse; transform-origin: 160px 275px; }
          .ab-arm2-l { animation: ab-arm-type 0.55s ease-in-out 0.2s infinite; transform-origin: 270px 268px; }
          .ab-arm2-r { animation: ab-arm-type 0.55s ease-in-out 0.2s infinite reverse; transform-origin: 310px 268px; }
          .ab-cursor { animation: ab-blink 1.1s step-end infinite; }
          .ab-l1 { animation: ab-line-appear 0.35s ease-out 0.3s both; }
          .ab-l2 { animation: ab-line-appear 0.35s ease-out 0.7s both; }
          .ab-l3 { animation: ab-line-appear 0.35s ease-out 1.1s both; }
          .ab-l4 { animation: ab-line-appear 0.35s ease-out 1.5s both; }
          .ab-glow { animation: ab-glow 2.8s ease-in-out infinite; }
          .ab-ping1 { animation: ab-ping 2s ease-out infinite; }
          .ab-ping2 { animation: ab-ping 2s ease-out 0.7s infinite; }
          .ab-flow-line {
            stroke-dasharray: 6 4;
            animation: ab-dash-flow 1.5s linear infinite;
          }
        `}</style>
      </defs>

      {/* ── faint dot grid ── */}
      {Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle
            cx={25 + c * 46}
            cy={25 + r * 56}
            fill="oklch(20% 0.05 255)"
            key={`g-${r}-${c}`}
            opacity="0.04"
            r="1.2"
          />
        )),
      )}

      {/* ── central orbital ring system ── */}
      <circle
        className="ab-orbit-ring"
        cx="210"
        cy="210"
        fill="none"
        r="146"
        stroke="oklch(20% 0.05 255)"
        strokeDasharray="4 6"
        strokeOpacity="0.1"
        strokeWidth="1"
      />
      <circle
        className="ab-orbit-ring-r"
        cx="210"
        cy="210"
        fill="none"
        r="120"
        stroke="oklch(58% 0.12 45)"
        strokeDasharray="3 5"
        strokeOpacity="0.12"
        strokeWidth="1"
      />

      {/* ── shared whiteboard / screen (centre) ── */}
      <rect
        fill="oklch(14% 0.04 255)"
        height="100"
        rx="3"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.5"
        width="130"
        x="145"
        y="110"
      />
      <rect
        fill="oklch(16% 0.045 255)"
        height="86"
        rx="2"
        width="118"
        x="151"
        y="116"
      />
      <rect
        className="ab-glow"
        fill="oklch(58% 0.12 45)"
        height="86"
        rx="2"
        width="118"
        x="151"
        y="116"
      />

      {/* whiteboard content — sprint board */}
      <text
        className="ab-l1"
        fill="oklch(58% 0.12 45)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="6.5"
        fontWeight="600"
        letterSpacing="1"
        x="160"
        y="131"
      >
        SPRINT 14
      </text>

      {/* columns */}
      <text
        className="ab-l1"
        fill="oklch(95% 0.018 75)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="5"
        opacity="0.5"
        x="160"
        y="142"
      >
        todo
      </text>
      <text
        className="ab-l1"
        fill="oklch(95% 0.018 75)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="5"
        opacity="0.5"
        x="200"
        y="142"
      >
        doing
      </text>
      <text
        className="ab-l1"
        fill="oklch(95% 0.018 75)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="5"
        opacity="0.5"
        x="240"
        y="142"
      >
        done
      </text>

      {/* task cards */}
      <rect
        className="ab-l2"
        fill="oklch(25% 0.04 255)"
        height="14"
        rx="1"
        width="30"
        x="158"
        y="148"
      />
      <rect
        className="ab-l2"
        fill="oklch(25% 0.04 255)"
        height="14"
        rx="1"
        width="30"
        x="158"
        y="165"
      />
      <rect
        className="ab-l2"
        fill="oklch(30% 0.05 255)"
        height="14"
        rx="1"
        width="30"
        x="198"
        y="148"
      />
      <rect
        className="ab-l3"
        fill="oklch(58% 0.12 45 / 0.25)"
        height="14"
        rx="1"
        width="30"
        x="238"
        y="148"
      />
      <rect
        className="ab-l3"
        fill="oklch(58% 0.12 45 / 0.25)"
        height="14"
        rx="1"
        width="30"
        x="238"
        y="165"
      />
      <rect
        className="ab-l4"
        fill="oklch(58% 0.12 45 / 0.25)"
        height="14"
        rx="1"
        width="30"
        x="238"
        y="182"
      />

      {/* check marks on done cards */}
      <text
        className="ab-l3"
        fill="oklch(65% 0.12 145)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        x="250"
        y="158"
      >
        ✓
      </text>
      <text
        className="ab-l3"
        fill="oklch(65% 0.12 145)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        x="250"
        y="175"
      >
        ✓
      </text>
      <text
        className="ab-l4"
        fill="oklch(65% 0.12 145)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="7"
        x="250"
        y="192"
      >
        ✓
      </text>

      {/* blinking cursor on doing card */}
      <rect
        className="ab-cursor"
        fill="oklch(58% 0.12 45)"
        height="8"
        width="4"
        x="222"
        y="151"
      />

      {/* monitor stand */}
      <line
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.2"
        x1="210"
        x2="210"
        y1="210"
        y2="228"
      />
      <rect
        fill="oklch(88% 0.03 70)"
        height="5"
        rx="1"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="0.8"
        width="30"
        x="195"
        y="226"
      />

      {/* ── desk surface ── */}
      <rect
        fill="oklch(88% 0.03 70)"
        height="8"
        rx="2"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1"
        width="240"
        x="90"
        y="310"
      />
      <line
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.3"
        x1="120"
        x2="120"
        y1="318"
        y2="345"
      />
      <line
        stroke="oklch(20% 0.05 255)"
        strokeWidth="1.3"
        x1="300"
        x2="300"
        y1="318"
        y2="345"
      />

      {/* ── person 1 (left, designer) ── */}
      <g className="ab-float-person">
        {/* torso */}
        <rect
          fill="oklch(88% 0.03 70)"
          height="50"
          rx="5"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1.2"
          width="40"
          x="120"
          y="255"
        />
        {/* neck */}
        <rect
          fill="oklch(88% 0.03 70)"
          height="7"
          rx="2"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="0.8"
          width="11"
          x="135"
          y="249"
        />
        {/* head */}
        <ellipse
          cx="140"
          cy="237"
          fill="oklch(88% 0.03 70)"
          rx="16"
          ry="18"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1.2"
        />
        {/* hair */}
        <path
          d="M126 231 C126 217 154 217 154 231"
          fill="oklch(20% 0.05 255)"
          opacity="0.7"
        />
        {/* eyes */}
        <ellipse cx="135" cy="236" fill="oklch(20% 0.05 255)" rx="1.5" ry="2" />
        <ellipse cx="145" cy="236" fill="oklch(20% 0.05 255)" rx="1.5" ry="2" />
        {/* glasses */}
        <rect
          fill="none"
          height="5"
          rx="1.5"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="0.9"
          width="9"
          x="131"
          y="233"
        />
        <rect
          fill="none"
          height="5"
          rx="1.5"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="0.9"
          width="9"
          x="141"
          y="233"
        />
        <line
          stroke="oklch(58% 0.12 45)"
          strokeWidth="0.7"
          x1="140"
          x2="141"
          y1="236"
          y2="236"
        />

        {/* left arm */}
        <g className="ab-arm-l">
          <path
            d="M122 268 L104 286 L98 302"
            stroke="oklch(20% 0.05 255)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <ellipse
            cx="96"
            cy="304"
            fill="oklch(88% 0.03 70)"
            rx="5"
            ry="4"
            stroke="oklch(20% 0.05 255)"
            strokeWidth="0.8"
          />
        </g>

        {/* right arm */}
        <g className="ab-arm-r">
          <path
            d="M158 268 L174 286 L180 302"
            stroke="oklch(20% 0.05 255)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <ellipse
            cx="183"
            cy="304"
            fill="oklch(88% 0.03 70)"
            rx="5"
            ry="4"
            stroke="oklch(20% 0.05 255)"
            strokeWidth="0.8"
          />
        </g>
      </g>

      {/* person 1 keyboard */}
      <rect
        fill="oklch(88% 0.03 70)"
        height="10"
        rx="2"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="0.8"
        width="66"
        x="100"
        y="300"
      />
      {[0, 1, 2, 3].map(i => (
        <rect
          fill="oklch(80% 0.025 70)"
          height="3"
          key={`k1-${i}`}
          rx="0.5"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="0.3"
          width="10"
          x={106 + i * 13}
          y="303"
        />
      ))}

      {/* ── person 2 (right, developer) ── */}
      <g className="ab-float-person2">
        {/* torso */}
        <rect
          fill="oklch(88% 0.03 70)"
          height="50"
          rx="5"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1.2"
          width="40"
          x="270"
          y="248"
        />
        {/* neck */}
        <rect
          fill="oklch(88% 0.03 70)"
          height="7"
          rx="2"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="0.8"
          width="11"
          x="285"
          y="242"
        />
        {/* head */}
        <ellipse
          cx="290"
          cy="230"
          fill="oklch(88% 0.03 70)"
          rx="16"
          ry="18"
          stroke="oklch(20% 0.05 255)"
          strokeWidth="1.2"
        />
        {/* hair — shorter */}
        <path
          d="M276 224 C276 210 304 210 304 224"
          fill="oklch(20% 0.05 255)"
          opacity="0.6"
        />
        {/* eyes */}
        <ellipse cx="285" cy="229" fill="oklch(20% 0.05 255)" rx="1.5" ry="2" />
        <ellipse cx="295" cy="229" fill="oklch(20% 0.05 255)" rx="1.5" ry="2" />

        {/* left arm */}
        <g className="ab-arm2-l">
          <path
            d="M272 261 L254 280 L248 296"
            stroke="oklch(20% 0.05 255)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <ellipse
            cx="246"
            cy="298"
            fill="oklch(88% 0.03 70)"
            rx="5"
            ry="4"
            stroke="oklch(20% 0.05 255)"
            strokeWidth="0.8"
          />
        </g>

        {/* right arm */}
        <g className="ab-arm2-r">
          <path
            d="M308 261 L324 280 L330 296"
            stroke="oklch(20% 0.05 255)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <ellipse
            cx="333"
            cy="298"
            fill="oklch(88% 0.03 70)"
            rx="5"
            ry="4"
            stroke="oklch(20% 0.05 255)"
            strokeWidth="0.8"
          />
        </g>
      </g>

      {/* person 2 laptop */}
      <rect
        fill="oklch(14% 0.04 255)"
        height="8"
        rx="1"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="0.8"
        width="46"
        x="267"
        y="296"
      />
      <rect
        fill="oklch(88% 0.03 70)"
        height="3"
        rx="1"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="0.5"
        width="56"
        x="262"
        y="304"
      />
      {/* screen glow on laptop */}
      <rect
        className="ab-glow"
        fill="oklch(58% 0.12 45)"
        height="8"
        rx="1"
        width="46"
        x="267"
        y="296"
      />

      {/* ── data flow lines connecting to board ── */}
      <line
        className="ab-flow-line"
        stroke="oklch(58% 0.12 45)"
        strokeOpacity="0.3"
        strokeWidth="1"
        x1="166"
        x2="180"
        y1="300"
        y2="210"
      />
      <line
        className="ab-flow-line"
        stroke="oklch(58% 0.12 45)"
        strokeOpacity="0.3"
        strokeWidth="1"
        x1="267"
        x2="240"
        y1="296"
        y2="210"
      />

      {/* ── floating concept bubbles ── */}
      {/* bubble 1 — data */}
      <g
        style={{
          animation: "ab-float 3.6s ease-in-out 0.4s infinite",
          transformOrigin: "60px 150px",
        }}
      >
        <circle
          cx="60"
          cy="150"
          fill="oklch(95% 0.018 75)"
          r="24"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="60"
          y="147"
        >
          SCOPE
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          opacity="0.5"
          textAnchor="middle"
          x="60"
          y="158"
        >
          define
        </text>
        <circle
          className="ab-ping1"
          cx="60"
          cy="150"
          fill="none"
          r="3"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
        />
        <line
          opacity="0.15"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 3"
          strokeWidth="1"
          x1="84"
          x2="145"
          y1="155"
          y2="170"
        />
      </g>

      {/* bubble 2 — build */}
      <g
        style={{
          animation: "ab-float 4.2s ease-in-out 1.2s infinite",
          transformOrigin: "370px 130px",
        }}
      >
        <circle
          cx="370"
          cy="130"
          fill="oklch(95% 0.018 75)"
          r="24"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1.2"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="370"
          y="127"
        >
          BUILD
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="6"
          opacity="0.5"
          textAnchor="middle"
          x="370"
          y="138"
        >
          sprint
        </text>
        <circle
          className="ab-ping2"
          cx="370"
          cy="130"
          fill="none"
          r="3"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
        />
        <line
          opacity="0.15"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 3"
          strokeWidth="1"
          x1="346"
          x2="275"
          y1="140"
          y2="170"
        />
      </g>

      {/* bubble 3 — ship */}
      <g
        style={{
          animation: "ab-float 3s ease-in-out 2s infinite",
          transformOrigin: "60px 60px",
        }}
      >
        <circle
          cx="60"
          cy="60"
          fill="oklch(95% 0.018 75)"
          r="20"
          stroke="oklch(20% 0.05 255)"
          strokeDasharray="3 2"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="60"
          y="58"
        >
          SHIP
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="60"
          y="68"
        >
          deploy
        </text>
      </g>

      {/* bubble 4 — iterate */}
      <g
        style={{
          animation: "ab-float 3.8s ease-in-out 0.8s infinite",
          transformOrigin: "370px 55px",
        }}
      >
        <circle
          cx="370"
          cy="55"
          fill="oklch(95% 0.018 75)"
          r="20"
          stroke="oklch(58% 0.12 45)"
          strokeWidth="1"
        />
        <text
          dominantBaseline="middle"
          fill="oklch(58% 0.12 45)"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="6"
          fontWeight="600"
          letterSpacing="1"
          textAnchor="middle"
          x="370"
          y="53"
        >
          ITERATE
        </text>
        <text
          dominantBaseline="middle"
          fill="oklch(20% 0.05 255)"
          fontFamily="Space Grotesk, sans-serif"
          fontSize="5.5"
          opacity="0.5"
          textAnchor="middle"
          x="370"
          y="63"
        >
          improve
        </text>
      </g>

      {/* ── coffee mug (small detail on desk) ── */}
      <rect
        fill="oklch(88% 0.03 70)"
        height="10"
        rx="2"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="0.8"
        width="8"
        x="198"
        y="300"
      />
      <path
        d="M206 303 Q210 303 210 307 Q210 311 206 311"
        fill="none"
        stroke="oklch(20% 0.05 255)"
        strokeWidth="0.6"
      />

      {/* ── progress bar at bottom of board ── */}
      <rect
        fill="oklch(25% 0.04 255)"
        height="3"
        rx="1.5"
        width="80"
        x="170"
        y="198"
      />
      <rect
        className="ab-l4"
        fill="oklch(58% 0.12 45)"
        height="3"
        rx="1.5"
        width="58"
        x="170"
        y="198"
      />

      {/* ── foot annotation ── */}
      <text
        fill="oklch(20% 0.05 255)"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="8"
        letterSpacing="1.5"
        opacity="0.18"
        textAnchor="end"
        x="416"
        y="410"
      >
        quartic lab · team in session
      </text>
    </svg>
  );
}

/* ── hooks ───────────────────────────────────────── */

function useReveal(selector) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ────────────────────────────────────────── */

export default function AboutPage() {
  const router = useRouter();
  useReveal(`.${styles.reveal}`);
  const [openFaq, setOpenFaq] = useState(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/about#faq`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>About Us &mdash; Quartic Lab</title>
        <meta
          content="Quartic Lab is a research-driven software studio from Lahore. Learn about our values, process, engagement models, and what it is like to work with us."
          key="description"
          name="description"
        />
        <meta
          content="About Us — Quartic Lab"
          key="og:title"
          property="og:title"
        />
        <meta
          content="Quartic Lab is a research-driven software studio from Lahore. 15+ engineers serving clients across the US, Europe, and MENA since 2020."
          key="og:description"
          property="og:description"
        />
        <meta
          content="About Us — Quartic Lab"
          key="twitter:title"
          name="twitter:title"
        />
        <meta
          content="Quartic Lab is a research-driven software studio from Lahore. 15+ engineers serving clients across the US, Europe, and MENA since 2020."
          key="twitter:description"
          name="twitter:description"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          type="application/ld+json"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <span className={styles.heroBadge}>About Quartic Lab</span>
            <h1 className={styles.heroH1}>
              We build software that{" "}
              <span className={styles.heroAccent}>actually ships</span>
            </h1>
            <p className={styles.heroSub}>
              Founded in 2020. A senior team of 15+ engineers, designers, and
              PMs in Lahore, Pakistan &mdash; serving clients across the US,
              Europe, and MENA. 50+ products shipped in web, mobile, AI,
              blockchain, and IoT.
            </p>
            <div className={styles.heroCtas}>
              <button
                className={styles.btnPrimary}
                onClick={() => router.push("/contact")}
              >
                Start a project
              </button>
              <a
                className={styles.btnOutline}
                href="https://calendly.com/quarticlab/meeting"
                rel="noopener noreferrer"
                target="_blank"
              >
                Get estimate in 12 hrs
              </a>
            </div>
            <div className={styles.heroScroll}>
              <span className={styles.scrollDot} />
            </div>
          </div>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── MISSION ──────────────────────────── */}
      <MissionSection />

      {/* ─── VALUES ───────────────────────────── */}
      <ValuesSection />

      {/* ─── STATS ────────────────────────────── */}
      <StatsSection />

      {/* ─── PROCESS TIMELINE ─────────────────── */}
      <ProcessSection />

      {/* ─── ENGAGEMENT MODELS ────────────────── */}
      <ModelsSection router={router} />

      {/* ─── FAQ ──────────────────────────────── */}
      <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />

      {/* ─── CTA ──────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={`${styles.ctaBanner} ${styles.reveal}`}>
            <h2 className={styles.ctaTitle}>
              Send us a brief. Get a scope back in 12 hours.
            </h2>
            <p className={styles.ctaDesc}>
              No sales call. No “let’s set up a discovery meeting.” Just a real
              estimate from a senior engineer.
            </p>
            <div className={styles.ctaBtns}>
              <button
                className={styles.btnPrimary}
                onClick={() => router.push("/contact")}
              >
                Send your brief
              </button>
              <a
                className={styles.ctaBtnSecondary}
                href="https://calendly.com/quarticlab/meeting"
                rel="noopener noreferrer"
                target="_blank"
              >
                Or book a 30-min call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── section components ──────────────────────────── */

function MissionSection() {
  return (
    <section className={styles.missionSec}>
      <div className={`${styles.container} ${styles.missionInner}`}>
        <div className={`${styles.missionVisual} ${styles.reveal}`}>
          <MissionDoodle />
        </div>
        <div className={`${styles.missionText} ${styles.reveal}`}>
          <span className={styles.sectionTag}>Who we are</span>
          <h2 className={styles.sectionTitle}>
            Your engineering partner, not just a vendor
          </h2>
          <p className={styles.missionDesc}>
            Quartic Lab started in 2020 as a freelance partnership between two
            engineers who kept getting the same complaint from clients: “great
            developers are impossible to find, and the ones you find disappear
            after launch.” We built the agency we’d want to hire &mdash; senior
            engineers who take ownership, push back on weak scope, and stick
            around long enough to see what we built actually work in production.
          </p>
          <p className={styles.missionDesc}>
            Five years in, we’re a 15-person team working in 2-week sprints with
            weekly demos. We’ve shipped 50+ products across five continents, and
            we’ve never lost a client mid-project.
          </p>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className={styles.valuesSec}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Why Quartic Lab</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            What sets us apart
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Four principles that define every project we take on.
          </p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div
              className={`${styles.valueCard} ${styles.reveal}`}
              key={v.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.valueIcon}>
                <ValueIcon index={i} />
              </span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ delay, index, s }) {
  // Initialise with the final target so SSR and no-JS users
  // see the real number, not "0+". The count-up is progressive enhancement.
  const [count, setCount] = useState(s.target);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.statVisible);
            if (!started.current) {
              started.current = true;
              const duration = 1600;
              const target = s.target;
              const startTime = performance.now();
              const tick = now => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.round(eased * target));
                if (progress < 1) {
                  requestAnimationFrame(tick);
                }
              };
              requestAnimationFrame(tick);
            }
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.statCard}
      ref={ref}
      style={{ transitionDelay: delay }}
    >
      <span className={styles.statIcon}>
        <StatIcon index={index} />
      </span>
      <div className={styles.statNum}>
        {count}
        {s.suffix}
      </div>
      <span className={styles.statLabel}>{s.label}</span>
    </div>
  );
}

function StatsSection() {
  return (
    <section className={styles.statsSec}>
      <div className={styles.statsBgDots} />
      <div className={styles.container}>
        <div className={styles.statsHeader}>
          <span className={styles.sectionTag}>Impact &amp; scale</span>
          <h2 className={`${styles.sectionTitle} ${styles.statsTitleReveal}`}>
            Numbers that speak
            <br />
            <span className={styles.statsAccentText}>for themselves</span>
          </h2>
        </div>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <StatCard delay={`${i * 110}ms`} index={i} key={s.label} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Our process</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            How a typical project works
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Transparent milestones from first call to launch day.
          </p>
        </div>
        <div className={styles.timeline}>
          {processSteps.map((step, i) => (
            <div
              className={`${styles.timelineItem} ${styles.reveal}`}
              key={step.label}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={styles.timelineDot}>{i + 1}</div>
              <div className={styles.timelineContent}>
                <span className={styles.timelineBadge}>{step.day}</span>
                <h3 className={styles.timelineLabel}>{step.label}</h3>
                <p className={styles.timelineDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.supportCallout} ${styles.reveal}`}>
          <span className={styles.supportCalloutIcon}>
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              height="22"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              width="22"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          <div>
            <strong className={styles.supportCalloutHeading}>
              Every launch includes 30 days of free support
            </strong>
            <p className={styles.supportCalloutBody}>
              Bug fixes, deploy issues, and minor changes &mdash; handled by the
              same team that built it, at no charge, for 30 days after launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ModelsSection({ router }) {
  return (
    <section className={styles.modelsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Engagement models</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Choose how we work together
          </h2>
          <p className={`${styles.sectionSubtitle} ${styles.reveal}`}>
            Flexible models designed to fit your stage, budget, and timeline.
          </p>
        </div>
        <div className={styles.modelsGrid}>
          {engagementModels.map((m, i) => (
            <div
              className={`${styles.modelCard} ${styles.reveal}`}
              key={m.title}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className={styles.modelTimeline}>{m.timeline}</span>
              <h3 className={styles.modelTitle}>{m.title}</h3>
              <p className={styles.modelWhen}>{m.when}</p>
              <ul className={styles.modelList}>
                {m.includes.map(item => (
                  <li className={styles.modelListItem} key={item}>
                    <span className={styles.modelCheck}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                className={styles.modelCardBtn}
                onClick={() => router.push("/contact")}
              >
                {m.ctaLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ openFaq, setOpenFaq }) {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>FAQ</span>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Common questions
          </h2>
        </div>
        <div className={styles.faqList}>
          {faqs.map((faq, i) => (
            <div
              className={`${styles.faqItem} ${
                openFaq === i ? styles.faqItemOpen : ""
              }`}
              key={faq.q}
            >
              <button
                aria-controls={`faq-answer-${i}`}
                aria-expanded={openFaq === i}
                className={styles.faqQuestion}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenFaq(openFaq === i ? null : i);
                  }
                }}
              >
                {faq.q}
                <span
                  aria-hidden="true"
                  className={`${styles.faqChevron} ${
                    openFaq === i ? styles.faqChevronOpen : ""
                  }`}
                >
                  &#9660;
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${
                  openFaq === i ? styles.faqAnswerOpen : ""
                }`}
                id={`faq-answer-${i}`}
                role="region"
              >
                <p className={styles.faqAnswerText}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
