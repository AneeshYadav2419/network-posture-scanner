// function StatsCard({
//   title,
//   value,
//   color,
// }) {
//   return (
//     <div
//       style={{
//         background: "#1e293b",
//         padding: "20px",
//         borderRadius: "12px",
//         borderLeft: `5px solid ${color}`,
//       }}
//     >
//       <h2>{value}</h2>
//       <p>{title}</p>
//     </div>
//   );
// }

// export default StatsCard;
function StatsCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="stats-card"
      style={{
        borderLeft: `5px solid ${color}`,
      }}
    >
      <div className="stats-icon">
        {icon}
      </div>

      <div className="stats-value">
        {value}
      </div>

      <div className="stats-title">
        {title}
      </div>
    </div>
  );
}

export default StatsCard;