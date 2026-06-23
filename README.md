<div align="center">

# 🛡️ Network Posture Scanner

### A lightweight yet powerful network security assessment tool — built for real-world posture evaluation

[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=for-the-badge)]()
[![Assignment](https://img.shields.io/badge/Visiblaze-Engineer%20Trainee%20Assignment-blue?style=for-the-badge)]()

<br/>

> **Discover · Analyze · Benchmark · Visualize**
>
> A full-stack network posture assessment platform that discovers network devices, parses firewall configurations, evaluates CIS benchmark compliance, and presents actionable security insights through an interactive dashboard.

<br/>

[🚀 Features](#-features) · [🏗️ Architecture](#️-architecture) · [📡 API Reference](#-api-reference) · [⚡ Quick Start](#-quick-start) · [🔮 Roadmap](#-roadmap)

</div>

---

                                                    Dashboard

<img width="1915" height="903" alt="Image" src="https://github.com/user-attachments/assets/b69ed3f5-9c64-4426-ad09-25d1b9d6f349" />


                                                     Tables

<img width="1127" height="842" alt="Image" src="https://github.com/user-attachments/assets/43cc6c27-0aa7-4a38-8c23-12cbf8b51928" />


                            
                                                 Risk Analytics Chart

<img width="567" height="328" alt="Image" src="https://github.com/user-attachments/assets/50c89377-e19b-4f7f-b9ed-9c300b8d1ed9" />

## 🎯 What Is This?

Most security teams rely on heavyweight enterprise tools to assess their network posture. This project challenges that assumption — delivering **device discovery, firewall analysis, and CIS compliance checks** through a lightweight, modular, and extensible Node.js-based scanner with a clean React dashboard.

Built as part of the **Visiblaze Software Engineer Trainee Assignment**, this tool demonstrates how a minimal yet production-conscious architecture can cover real-world security use cases.

---

## ✨ Features

### 🔍 Device Discovery
- **Single IP** scanning
- **Multiple IP** scanning
- **CIDR subnet** scanning (e.g. `192.168.1.0/24`)
- Lightweight **TCP-based probing** — no heavy dependencies
- Collects per-host: IP, Hostname (reverse DNS), MAC Vendor, Open Ports, Service Banners

**Detected Services:**

| Service | Port |
|---------|------|
| SSH | 22 |
| HTTP | 80 |
| HTTPS | 443 |
| Telnet | 23 |
| FTP | 21 |
| SMTP | 25 |
| DNS | 53 |

---

### 🔥 Firewall Configuration Analysis
- Parses **Cisco-style firewall configurations**
- Extracts: Action · Protocol · Source · Destination · Port
- Designed to support real firewall integrations (`iptables`, `nftables`, AWS Security Groups)

```text
permit tcp any any 22   ✅ SSH allowed
deny   tcp any any 23   🚫 Telnet blocked
```

---

### ✅ CIS Benchmark Compliance Engine

6 CIS-inspired security checks — each producing **PASS/FAIL + Evidence + Recommendation**:

| # | Check | What It Catches |
|---|-------|----------------|
| 1 | 🔴 Telnet Exposure | Insecure remote access via port 23 |
| 2 | 📋 Logging Enabled | Missing remote logging configuration |
| 3 | 🔑 Weak SNMP Communities | Default `public`/`private` strings |
| 4 | 🚪 Sensitive Port Exposure | Critical ports exposed publicly |
| 5 | 🛡️ SSH-Only Management | Insecure management protocols active |
| 6 | 🚫 Default Deny Rules | Missing deny-all baseline rules |

---

### 📊 Interactive Security Dashboard

| Panel | Displays |
|-------|---------|
| **Device View** | IP, Hostname, Vendor, Open Ports, Banners |
| **Firewall View** | Rules — Action, Protocol, Source, Destination, Port |
| **CIS Compliance** | Pass/Fail status, Evidence, Recommendations |
| **Security Metrics** | Active Hosts, Firewall Rules, Risk Score, Pass/Fail counts |

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│     Frontend Dashboard          │
│     React + Vite + Recharts     │
└────────────────┬────────────────┘
                 │ HTTP REST
┌────────────────▼────────────────┐
│       Backend API               │
│       Express.js (Node.js)      │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│       Storage Layer             │
│       JSON-based Persistence    │
└────────────────▲────────────────┘
                 │ Ingestion (API Key Auth)
┌────────────────┴────────────────┐
│       Scanner Engine            │
│       Node.js CLI Tool          │
│                                 │
│  ├── Device Discovery           │
│  ├── Service Detection          │
│  ├── Firewall Config Parser     │
│  └── CIS Benchmark Engine       │
└─────────────────────────────────┘
```

### Design Principles

- **Modular** — Scanner, Backend, Frontend are independently runnable
- **Provider Pattern** — Scanner uses providers, services, controllers, models
- **Extensible** — CIS engine designed to add new checks with zero friction
- **Cloud-Ready** — Ingestion layer architected to migrate to AWS (API Gateway + Lambda + DynamoDB) with minimal changes

---

## 📁 Project Structure

```
network-posture-scanner/
│
├── scanner/                        # Node.js Scanner Engine
│   ├── src/
│   │   ├── discovery/              # TCP-based device discovery
│   │   ├── firewall/               # Firewall config parser
│   │   ├── cis/                    # CIS benchmark checks
│   │   └── ingestion/              # API ingestion client
│   └── config/
│       └── firewall.conf           # Simulated Cisco config
│
├── backend/                        # Express REST API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── routes/
│   └── storage/
│       └── data.json               # JSON persistence layer
│
└── frontend/                       # React Dashboard
    ├── src/
    │   ├── components/
    │   │   ├── DeviceView/
    │   │   ├── FirewallView/
    │   │   ├── CISView/
    │   │   └── MetricsPanel/
    │   └── App.jsx
    └── vite.config.js
```

---

## 📡 API Reference

### Base URL
```
http://localhost:4000/api
```

### Authentication
All ingestion endpoints require:
```http
x-api-key: network-posture-key-2024
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/devices` | Returns all discovered devices |
| `GET` | `/api/firewall-rules` | Returns parsed firewall rules |
| `GET` | `/api/cis-results` | Returns CIS benchmark results |
| `POST` | `/api/scan` | Triggers a new discovery scan |

### Example Response — `/api/cis-results`

```json
{
  "results": [
    {
      "check": "Telnet Exposure",
      "status": "FAIL",
      "evidence": "Port 23 open on 192.168.1.5",
      "recommendation": "Disable Telnet. Use SSH exclusively for remote management."
    },
    {
      "check": "Default Deny Rules",
      "status": "PASS",
      "evidence": "Deny rule found at end of ruleset",
      "recommendation": "No action required."
    }
  ],
  "summary": {
    "passed": 4,
    "failed": 2,
    "riskScore": 33
  }
}
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/network-posture-scanner.git
cd network-posture-scanner
```

### 2. Start the Scanner

```bash
cd scanner
npm install
npm start
```

Scanner will discover devices and push results to the backend via API.

### 3. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:4000`

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Dashboard runs on `http://localhost:5173`

---

### Scan a Target

```bash
# Single IP
node scanner/src/index.js 192.168.1.10

# Subnet
node scanner/src/index.js 192.168.1.0/24
```

---

## 🔐 Security Design

| Layer | Implementation |
|-------|---------------|
| API Authentication | API Key via `x-api-key` header |
| Input Validation | JSON payload schema validation |
| Ingestion Security | Configurable endpoint + key rotation support |
| Firewall Parsing | Read-only, no config mutation |

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Scanner** | Node.js, TCP Sockets, DNS Reverse Lookup |
| **Backend** | Node.js, Express.js |
| **Frontend** | React, Vite, Recharts |
| **Storage** | JSON-based persistence |
| **Auth** | API Key Authentication |

---

## 🔮 Roadmap

- [x] TCP-based device discovery
- [x] CIDR subnet scanning
- [x] Firewall configuration parser
- [x] 6 CIS benchmark checks
- [x] REST API backend
- [x] Interactive React dashboard
- [x] API Key authentication
- [ ] 🌩️ AWS API Gateway integration
- [ ] ⚡ AWS Lambda ingestion workflow
- [ ] 🗄️ DynamoDB persistence layer
- [ ] 🔒 HTTPS/TLS deployment
- [ ] 🔌 Real firewall integrations (iptables, nftables, AWS Security Groups)
- [ ] 📡 Real-time updates via WebSockets
- [ ] 📋 Extended CIS benchmark coverage
- [ ] 📤 PDF report export

---

## 💡 Key Engineering Decisions

| Decision | Rationale |
|----------|-----------|
| TCP-based discovery | Avoids heavy dependencies like Nmap; lightweight & portable |
| JSON storage | Simplifies MVP delivery; swappable for DynamoDB with interface change only |
| Simulated firewall config | Ensures reproducible testing across environments |
| Modular 3-component structure | Scanner, Backend, Frontend can scale and deploy independently |
| API Key ingestion auth | Lightweight security suitable for MVP; extensible to OAuth/JWT |
| CIS-inspired engine | Structured for easy addition of new benchmark checks |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with 🔐 by Aneesh Yadav**

*Software Engineer · Node.js · React · Network Security · Full Stack*

**Visiblaze Software Engineer Trainee Assignment**

⭐ *If this project impressed you, consider starring the repo!* ⭐

</div>
