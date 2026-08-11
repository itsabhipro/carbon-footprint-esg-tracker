# Multi-Country Carbon Footprint & ESG Tracker

A data-driven platform for tracking **carbon footprint** and **ESG metrics** across multiple countries.

Built as a portfolio demo aligned with Azure data engineering patterns (pipelines, reporting, multi-jurisdiction factors).

---

## Features

- **Dashboard** — Group totals, Scope 1/2/3 mix, 12-month trend, country cards
- **Countries** — Per-country emissions, YoY change, reduction targets, ESG pillars (E/S/G)
- **Emissions** — Comparison table, intensity (tCO₂e / employee), monthly trends
- **Reports** — Sustainability summary and export-ready layout (demo)

### Countries covered (demo data)

Kuwait · Saudi Arabia · UAE · India · Germany · Netherlands

---

## Tech Stack

| Layer | Stack |
|-------|--------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Icons | Lucide React |
| Data (demo) | In-memory multi-country Scope 1–3 + ESG scores |
| Production path | Azure Data Factory / Databricks / Synapse, SQL, emission factors |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

---

## Project structure

```
app/           # Next.js App Router
components/    # Dashboard, Countries, Emissions, Reports, Sidebar
lib/           # Mock data + helpers
```

---

## Notes

- Demo data is illustrative (not live facility meters).
- Production systems should use GHG Protocol scopes, country emission factors, and audit trails for CSRD / internal ESG reporting.
- Designed to showcase UI + multi-country sustainability analytics for portfolio use.

---

## Author

**Abhishek Kumar** — [GitHub](https://github.com/itsabhipro) · [LinkedIn](https://linkedin.com/in/abhishek-kumar-172900382)
