import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function SecurityChart({ passCount, failCount }) {
  const total = passCount + failCount;
  const complianceRate = total > 0 ? Math.round((passCount / total) * 100) : 100;

  const data = [
    { name: "Passed Controls", value: passCount },
    { name: "Failed Controls", value: failCount }
  ];

  const COLORS = ["#10b981", "#ef4444"]; // Emerald and Red

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{`${payload[0].name}`}</p>
          <p className="tooltip-value" style={{ color: payload[0].color || COLORS[0] }}>
            {`${payload[0].value} Checks (${total > 0 ? Math.round((payload[0].value / total) * 100) : 0}%)`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="security-chart-container">
      <h2>CIS Compliance Breakdown</h2>
      
      <div className="chart-wrapper" style={{ position: "relative" }}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label for Donut chart */}
        <div className="chart-center-label">
          <div className="rate-num">{complianceRate}%</div>
          <div className="rate-text">Compliant</div>
        </div>
      </div>
    </div>
  );
}

export default SecurityChart;