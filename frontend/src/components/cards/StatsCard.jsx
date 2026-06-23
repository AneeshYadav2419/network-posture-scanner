
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