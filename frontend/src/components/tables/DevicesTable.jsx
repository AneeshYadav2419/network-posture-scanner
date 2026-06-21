function DevicesTable({ devices }) {
  if (!devices || devices.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Discovered Devices Found</h3>
        <p>Please enter a target subnet and trigger a posture scan.</p>
      </div>
    );
  }

  const getPortBadgeClass = (port) => {
    const p = parseInt(port, 10);
    if ([21, 23, 80, 161].includes(p)) {
      return "port-badge port-insecure";
    }
    if ([22, 443].includes(p)) {
      return "port-badge port-secure";
    }
    if ([3306, 5432, 1433].includes(p)) {
      return "port-badge port-database";
    }
    return "port-badge port-standard";
  };

  return (
    <>
      <div className="table-header-container">
        <h2 className="table-title">Discovered Hosts & Exposed Ports</h2>
        <span className="table-badge count-badge">{devices.length} Up</span>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>IP Address</th>
            <th>Hostname</th>
            <th>MAC Address</th>
            <th>Vendor</th>
            <th>Open Ports & Service Banners</th>
          </tr>
        </thead>

        <tbody>
          {devices.map((device, index) => (
            <tr key={index}>
              <td className="ip-cell">{device.ip}</td>
              <td className="hostname-cell">{device.hostname || "Unknown"}</td>
              <td className="mac-cell">{device.mac || "Unknown"}</td>
              <td>
                <span className="vendor-badge">{device.vendor || "Unknown"}</span>
              </td>
              <td>
                <div className="ports-list">
                  {device.openPorts && device.openPorts.length > 0 ? (
                    device.openPorts.map((portInfo, pIdx) => (
                      <span
                        key={pIdx}
                        className={getPortBadgeClass(portInfo.port)}
                        title={portInfo.banner && portInfo.banner !== "unknown" ? portInfo.banner : `Service: ${portInfo.service}`}
                      >
                        {portInfo.port}/{portInfo.service}
                        {portInfo.banner && portInfo.banner !== "unknown" && (
                          <span className="tooltip-banner">{portInfo.banner}</span>
                        )}
                      </span>
                    ))
                  ) : (
                    <span className="no-ports">No open ports</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DevicesTable;