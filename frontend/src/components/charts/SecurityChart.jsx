import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SecurityChart({
  passCount,
  failCount,
}) {
  const data = [
    {
      name: "PASS",
      value: passCount,
    },
    {
      name: "FAIL",
      value: failCount,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div
      style={{
        background: "#0f172a",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px",
      }}
    >
      <h2>
        Security Compliance
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SecurityChart;