import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { getLatestScan } from "../store/jsonStore.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCANNER_CWD = path.resolve(__dirname, "../../../scanner");

/**
 * Controller to handle triggering a scan.
 * Spawns the scanner CLI tool in the background and returns the ingested results on completion.
 */
export const triggerScan = (req, res) => {
  const target = req.body.target || "127.0.0.1";
  const provider = req.body.provider || "tcp";

  console.log(`[Backend] Received scan trigger for target: ${target}, provider: ${provider}`);

  // Sanitize inputs for shell safety
  const cleanTarget = target.replace(/[^a-zA-Z0-9\.\-\_\/,]/g, "");
  const cleanProvider = provider.replace(/[^a-zA-Z0-9]/g, "");

  const command = `node src/index.js "${cleanTarget}" "${cleanProvider}"`;
  console.log(`[Backend] Spawning process in: ${SCANNER_CWD}\nCommand: ${command}`);

  exec(command, { cwd: SCANNER_CWD }, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Backend] Scanner failed: ${error.message}`);
      console.error(`[Backend] Stderr: ${stderr}`);
      return res.status(500).json({
        message: "Failed to complete network posture scan",
        error: error.message,
        stderr: stderr
      });
    }

    console.log(`[Backend] Scanner completed successfully. Stdout:\n${stdout}`);

    // Retrieve the latest scan data, which is now saved in jsonStore.js
    const latestScan = getLatestScan();
    if (!latestScan) {
      return res.status(500).json({
        message: "Scan executed but no results were found in the database."
      });
    }

    res.json(latestScan);
  });
};

