export type CountryCode = "KW" | "SA" | "AE" | "IN" | "DE" | "NL";

export interface CountryEmissions {
  code: CountryCode;
  name: string;
  flag: string;
  region: string;
  scope1: number;
  scope2: number;
  scope3: number;
  targetReductionPct: number;
  yoyChangePct: number;
  employees: number;
  esg: {
    environmental: number;
    social: number;
    governance: number;
  };
  monthly: number[];
}

export const countries: CountryEmissions[] = [
  {
    code: "KW",
    name: "Kuwait",
    flag: "🇰🇼",
    region: "Middle East",
    scope1: 1240,
    scope2: 3180,
    scope3: 5620,
    targetReductionPct: 25,
    yoyChangePct: -4.2,
    employees: 420,
    esg: { environmental: 68, social: 74, governance: 81 },
    monthly: [820, 790, 810, 860, 840, 880, 910, 870, 850, 830, 800, 780],
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    scope1: 2890,
    scope2: 5420,
    scope3: 9100,
    targetReductionPct: 30,
    yoyChangePct: -2.8,
    employees: 1180,
    esg: { environmental: 62, social: 70, governance: 78 },
    monthly: [1450, 1420, 1480, 1510, 1490, 1550, 1580, 1520, 1500, 1470, 1440, 1410],
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    scope1: 980,
    scope2: 2650,
    scope3: 4200,
    targetReductionPct: 28,
    yoyChangePct: -6.1,
    employees: 310,
    esg: { environmental: 75, social: 79, governance: 84 },
    monthly: [620, 600, 610, 640, 630, 660, 680, 650, 640, 620, 600, 590],
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    region: "Asia",
    scope1: 4100,
    scope2: 8900,
    scope3: 15200,
    targetReductionPct: 35,
    yoyChangePct: 1.4,
    employees: 2400,
    esg: { environmental: 55, social: 66, governance: 72 },
    monthly: [2300, 2280, 2350, 2420, 2400, 2480, 2550, 2500, 2450, 2380, 2320, 2290],
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    scope1: 720,
    scope2: 1580,
    scope3: 3100,
    targetReductionPct: 40,
    yoyChangePct: -8.5,
    employees: 280,
    esg: { environmental: 88, social: 86, governance: 91 },
    monthly: [450, 430, 420, 440, 410, 400, 390, 380, 370, 360, 350, 340],
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    region: "Europe",
    scope1: 410,
    scope2: 980,
    scope3: 1950,
    targetReductionPct: 42,
    yoyChangePct: -9.2,
    employees: 145,
    esg: { environmental: 91, social: 89, governance: 93 },
    monthly: [280, 270, 265, 260, 255, 250, 245, 240, 235, 230, 225, 220],
  },
];

export function totalEmissions(c: CountryEmissions) {
  return c.scope1 + c.scope2 + c.scope3;
}

export function esgScore(c: CountryEmissions) {
  return Math.round(
    (c.esg.environmental + c.esg.social + c.esg.governance) / 3
  );
}

export function globalTotals() {
  const scope1 = countries.reduce((s, c) => s + c.scope1, 0);
  const scope2 = countries.reduce((s, c) => s + c.scope2, 0);
  const scope3 = countries.reduce((s, c) => s + c.scope3, 0);
  const total = scope1 + scope2 + scope3;
  const avgEsg =
    countries.reduce((s, c) => s + esgScore(c), 0) / countries.length;
  const avgYoy =
    countries.reduce((s, c) => s + c.yoyChangePct, 0) / countries.length;
  return { scope1, scope2, scope3, total, avgEsg, avgYoy };
}

export const monthLabels = [
  "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
];
