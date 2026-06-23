const INGEST_URL =
  process.env.INGEST_URL || "http://localhost:5000/api/ingest";

const API_KEY = process.env.SCANNER_API_KEY || "network-posture-key-2024";

export class BackendClient {
  /**
   * Send a full scan report to the ingestion backend.
   * @param {Object} report  - { target, devices, firewallRules, cisResults }
   * @returns {Promise<Object>} - Backend response JSON
   */
  async send(report) {
    const payload = {
      ...report,
      scannedAt: new Date().toISOString(),
    };

    const response = await fetch(INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Basic auth mechanism — API key in header (mirrors AWS API Gateway key)
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `Ingestion failed [${response.status}]: ${text}`
      );
    }

    return response.json();
  }
}
