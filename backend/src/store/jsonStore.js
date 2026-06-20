import fs from "fs";
import path from "path";

const DB_PATH = path.resolve(
  "src/data/db.json"
);

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    return {
      scans: [],
    };
  }

  const data =
    fs.readFileSync(
      DB_PATH,
      "utf-8"
    );

  return JSON.parse(data);
}

function writeDb(data) {
  fs.writeFileSync(
    DB_PATH,
    JSON.stringify(
      data,
      null,
      2
    )
  );
}

export function saveScan(
  scanReport
) {
  const db = readDb();

  db.scans.push({
    id: Date.now(),
    createdAt:
      new Date().toISOString(),
    ...scanReport,
  });

  writeDb(db);

  return db.scans[
    db.scans.length - 1
  ];
}

export function getAllScans() {
  const db = readDb();

  return db.scans;
}

export function getLatestScan() {
  const db = readDb();

  return (
    db.scans[
      db.scans.length - 1
    ] || null
  );
}