
import {
  saveScan,
  getLatestScan,
} from "../store/jsonStore.js";

export const ingestScan = (
  req,
  res
) => {
  const saved = saveScan(
    req.body
  );

  res.status(201).json({
    message:
      "Scan saved successfully",
    scanId: saved.id,
  });
};

export const getDevices = (
  req,
  res
) => {
  const scan =
    getLatestScan();

  res.json(
    scan?.devices || []
  );
};

export const getFirewallRules =
  (req, res) => {
    const scan =
      getLatestScan();

    res.json(
      scan?.firewallRules ||
      []
    );
  };

export const getCisResults =
  (req, res) => {
    const scan =
      getLatestScan();

    res.json(
      scan?.cisResults ||
      []
    );
  };