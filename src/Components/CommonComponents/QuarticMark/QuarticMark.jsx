import { useEffect, useState } from "react";

/**
 * Quartic Lab — four-node mark (complete graph K₄).
 *
 * animated=true  Nodes materialise from scattered corner positions
 *                and spring-converge into the final graph.
 *                Edges draw in via stroke-dashoffset once settled.
 *
 * Hover          Hovered node lifts to 1.15×; its connected edges
 *                shift to the copper accent. No glow, no flash.
 */

const NODES = [
  { x: 50, y: 18 },
  { x: 82, y: 50 },
  { x: 50, y: 82 },
  { x: 18, y: 50 },
];

/* Each node starts at a distinct corner offset before assembling */
const SCATTER = [
  { x: -26, y: -34 },
  { x: 38, y: -28 },
  { x: 30, y: 34 },
  { x: -40, y: 26 },
];

/* Pre-compute edges with adjacency indices for hover resolution */
const EDGES = [];
NODES.forEach((a, i) => {
  NODES.slice(i + 1).forEach((b, j) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    EDGES.push({
      a,
      ai: i,
      b,
      bi: i + 1 + j,
      key: `${i}-${j}`,
      len: Math.sqrt(dx * dx + dy * dy),
    });
  });
});

function QuarticMark({
  accent = "oklch(58% 0.12 45)",
  animated = false,
  bg = "oklch(95% 0.018 75)",
  edgeColor = "#6b7280",
  fg = "#000",
  size = 40,
}) {
  /*
   * "scatter"  — nodes painted at random offsets, invisible (first frame)
   * "assemble" — CSS transition springs nodes to (0,0) offset + fade in
   * "done"     — nodes settled; edges draw in via stroke-dashoffset
   */
  const [phase, setPhase] = useState(animated ? "scatter" : "done");
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    if (!animated) {
      return;
    }
    /* Two rAFs: ensure "scatter" frame paints before we start moving */
    let raf2, timer;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPhase("assemble");
        /* last node = 0.3 s delay + 0.9 s spring → ~1.35 s total */
        timer = setTimeout(() => setPhase("done"), 1350);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [animated]);

  return (
    <svg
      height={size}
      style={{ overflow: "visible" }}
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── edges ────────────────────────────── */}
      {EDGES.map((e, idx) => {
        const active =
          hoveredNode != null && (hoveredNode === e.ai || hoveredNode === e.bi);
        /* edge takes the color of whichever end-node is hovered */
        const edgeStroke = active
          ? hoveredNode === e.ai
            ? e.ai === 0
              ? accent
              : fg
            : e.bi === 0
              ? accent
              : fg
          : edgeColor;
        const visible = phase === "done";
        return (
          <line
            key={e.key}
            strokeDasharray={e.len}
            style={{
              stroke: edgeStroke,
              strokeDashoffset: visible ? 0 : e.len,
              strokeOpacity: active ? 1 : 0.5,
              strokeWidth: active ? 2 : 1.6,
              transition: visible
                ? `stroke-dashoffset 0.42s ease ${idx * 0.06}s,` +
                  " stroke 0.3s ease, stroke-opacity 0.3s ease," +
                  " stroke-width 0.25s ease"
                : "stroke 0.3s ease, stroke-opacity 0.3s ease," +
                  " stroke-width 0.25s ease",
            }}
            x1={e.a.x}
            x2={e.b.x}
            y1={e.a.y}
            y2={e.b.y}
          />
        );
      })}

      {/* ── nodes ────────────────────────────── */}
      {NODES.map((n, i) => {
        const isHovered = hoveredNode === i;
        const nodeColor = i === 0 ? accent : fg;
        const s = SCATTER[i];
        const tx = phase === "scatter" ? s.x : 0;
        const ty = phase === "scatter" ? s.y : 0;
        const delay = `${i * 0.1}s`;
        return (
          <g
            key={i}
            onPointerEnter={() => setHoveredNode(i)}
            onPointerLeave={() => setHoveredNode(null)}
            style={{
              cursor: "pointer",
              opacity: phase === "scatter" ? 0 : 1,
              transform: `translate(${tx}px,${ty}px)`,
              transition:
                phase === "scatter"
                  ? "none"
                  : `transform 0.9s cubic-bezier(0.34,1.15,0.64,1) ${delay},` +
                    ` opacity 0.35s ease ${delay}`,
            }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              fill={nodeColor}
              r="6.5"
              style={{
                stroke: bg,
                strokeWidth: 2,
                transform: isHovered
                  ? `translate(${n.x}px,${n.y}px) scale(1.18)` +
                    ` translate(-${n.x}px,-${n.y}px)`
                  : "none",
                transition:
                  "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)," +
                  " stroke 0.22s ease",
              }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default QuarticMark;
