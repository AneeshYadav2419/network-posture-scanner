function FirewallRulesTable({
  firewallRules,
}) {
  return (
    <div
      style={{
        marginTop: "30px",
      }}
    >
      <h2>Firewall Rules</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Action</th>
            <th>Protocol</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Port</th>
          </tr>
        </thead>

        <tbody>
          {firewallRules.map(
            (rule, index) => (
              <tr key={index}>
                <td>
                  {rule.action}
                </td>

                <td>
                  {rule.protocol}
                </td>

                <td>
                  {rule.source}
                </td>

                <td>
                  {
                    rule.destination
                  }
                </td>

                <td>{rule.port}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FirewallRulesTable;