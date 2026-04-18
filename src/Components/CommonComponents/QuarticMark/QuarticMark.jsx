/**
 * Quartic Lab — four-node mark (complete graph K₄).
 * Top node uses the copper accent; the rest match `fg`.
 */
function QuarticMark({
  accent = "oklch(58% 0.12 45)",
  bg = "oklch(95% 0.018 75)",
  fg = "oklch(20% 0.05 255)",
  size = 40,
}) {
  const nodes = [
    { x: 50, y: 18 },
    { x: 82, y: 50 },
    { x: 50, y: 82 },
    { x: 18, y: 50 },
  ];
  return (
    <svg
      height={size}
      viewBox="0 0 100 100"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {nodes.map((a, i) =>
        nodes
          .slice(i + 1)
          .map((b, j) => (
            <line
              key={`${i}-${j}`}
              stroke={fg}
              strokeWidth="1.6"
              x1={a.x}
              x2={b.x}
              y1={a.y}
              y2={b.y}
            />
          )),
      )}
      {nodes.map((n, i) => (
        <circle
          cx={n.x}
          cy={n.y}
          fill={i === 0 ? accent : fg}
          key={i}
          r="6.5"
          stroke={bg}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export default QuarticMark;
