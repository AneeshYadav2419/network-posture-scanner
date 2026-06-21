import { useState } from "react";

function CisResultsTable({ cisResults }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!cisResults || cisResults.length === 0) {
    return (
      <div className="empty-state">
        <h3>No CIS Results Audited</h3>
        <p>Run a posture scan to check device configuration files against standards.</p>
      </div>
    );
  }

  const toggleRow = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getSeverityBadgeClass = (severity) => {
    return `severity-badge severity-${(severity || "MEDIUM").toLowerCase()}`;
  };

  return (
    <>
      <div className="table-header-container">
        <h2 className="table-title">CIS Benchmark Configuration Compliance</h2>
        <span className="table-badge count-badge">CIS v8 Controls</span>
      </div>

      <table className="table cis-table">
        <thead>
          <tr>
            <th>CIS ID</th>
            <th>Benchmark Control</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Audit Evidence</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {cisResults.map((result, index) => {
            const isExpanded = expandedIndex === index;
            const isFail = result.status === "FAIL";

            return (
              <React.Fragment key={index}>
                <tr
                  className={`cis-row ${isFail ? "row-fail-hover" : ""}`}
                  onClick={() => toggleRow(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td className="cis-id-cell">{result.id || "CIS-x.x"}</td>
                  <td className="cis-name-cell">
                    <strong>{result.checkName}</strong>
                  </td>
                  <td>
                    <span className={getSeverityBadgeClass(result.severity)}>
                      {result.severity || "MEDIUM"}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill pill-${result.status.toLowerCase()}`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="cis-evidence-cell">{result.evidence}</td>
                  <td>
                    <button className="btn-table-action" onClick={(e) => { e.stopPropagation(); toggleRow(index); }}>
                      {isExpanded ? "Close" : "Remediation"}
                    </button>
                  </td>
                </tr>
                {isExpanded && (
                  <tr className="remediation-row">
                    <td colSpan="6">
                      <div className="remediation-container">
                        <div className="remediation-title">🛠️ Recommended Remediation Action</div>
                        <div className="remediation-text">{result.remediation}</div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

import React from "react";
export default CisResultsTable;