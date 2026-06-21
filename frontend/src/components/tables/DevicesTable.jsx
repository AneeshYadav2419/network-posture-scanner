function DevicesTable({
  devices,
}) {
  return (
    <>
      <h2>Devices</h2>

      <table className="table">
        <thead>
          <tr>
            <th>IP</th>
            <th>Hostname</th>
            <th>Vendor</th>
            <th>Open Ports</th>
          </tr>
        </thead>

        <tbody>
          {devices.map(
            (device, index) => (
              <tr key={index}>
                <td>{device.ip}</td>

                <td>
                  {
                    device.hostname
                  }
                </td>

                <td>
                  {device.vendor}
                </td>

                <td>
                  {device.openPorts
                    ?.map(
                      (port) =>
                        `${port.port} (${port.service})`
                    )
                    .join(", ")}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}

export default DevicesTable;