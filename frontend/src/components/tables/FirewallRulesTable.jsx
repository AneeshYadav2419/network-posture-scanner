function FirewallRulesTable({
  firewallRules,
}) {
  return (
    <>
      <h2>
        Firewall Rules
      </h2>

      <table className="table">
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
                  {
                    rule.protocol
                  }
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
    </>
  );
}

export default FirewallRulesTable;