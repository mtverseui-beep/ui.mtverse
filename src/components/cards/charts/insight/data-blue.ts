// ════════════════════════════════════════════════════════════════════════════
// Mock data for the Insight bento dashboard — MONOCHROME BLUE variant.
// ════════════════════════════════════════════════════════════════════════════
// Same data structure as data.ts but every chart color is remapped to the
// monochrome blue palette from the reference image:
//   navy #1e3a8a · dark-blue #1e40af · royal #2563eb · sky #0ea5e9
//   cyan #06b6d4 · sky-blue #38bdf8 · light-blue #7dd3fc · light-cyan #67e8f9
// Positive deltas stay emerald (semantic) but use a blue-tinted emerald.

// Blue palette constants
const B = {
  navy: "#1e3a8a",
  darkBlue: "#1e40af",
  royal: "#2563eb",
  sky: "#0ea5e9",
  cyan: "#06b6d4",
  skyBlue: "#38bdf8",
  lightBlue: "#7dd3fc",
  lightCyan: "#67e8f9",
  veryLightBlue: "#dbeafe",
  mutedBlue: "#93c5fd",
  positive: "#10b981", // keep emerald for semantic positive delta
};

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const verticalBarTwo = [
  { x: "Mon", one: 32, two: 18 },
  { x: "Tue", one: 48, two: 26 },
  { x: "Wed", one: 28, two: 34 },
  { x: "Thu", one: 60, two: 22 },
  { x: "Fri", one: 40, two: 46 },
  { x: "Sat", one: 52, two: 30 },
  { x: "Sun", one: 36, two: 20 },
];

export const smallVerticalBar = [
  { x: "1", v: 30 }, { x: "2", v: 55 }, { x: "3", v: 20 }, { x: "4", v: 65 },
  { x: "5", v: 42 }, { x: "6", v: 70 }, { x: "7", v: 50 }, { x: "8", v: 60 },
];

export const tempThemeLine = [
  { x: "8:00am", v: 12 }, { x: "", v: 18 }, { x: "10:00am", v: 9 }, { x: "", v: 22 },
  { x: "12:00am", v: 15 }, { x: "", v: 28 }, { x: "1:00pm", v: 20 }, { x: "", v: 30 },
  { x: "3:00pm", v: 26 },
];

export const earningsLine = [
  { x: 0, v: 20 }, { x: 1, v: 15 }, { x: 2, v: 32 }, { x: 3, v: 24 },
  { x: 4, v: 40 }, { x: 5, v: 30 }, { x: 6, v: 55 }, { x: 7, v: 45 },
  { x: 8, v: 68 }, { x: 9, v: 58 }, { x: 10, v: 80 },
];

export const windSpeedDual = [
  { x: 0, zoneOne: 40, zoneTwo: 30 }, { x: 1, zoneOne: 55, zoneTwo: 45 },
  { x: 2, zoneOne: 35, zoneTwo: 60 }, { x: 3, zoneOne: 60, zoneTwo: 40 },
  { x: 4, zoneOne: 45, zoneTwo: 65 }, { x: 5, zoneOne: 70, zoneTwo: 50 },
  { x: 6, zoneOne: 50, zoneTwo: 70 }, { x: 7, zoneOne: 65, zoneTwo: 55 },
  { x: 8, zoneOne: 58, zoneTwo: 62 },
];

export const historicPopulation = [
  { x: "Q1", y2010: 40, y2011: 55, y2012: 70 },
  { x: "Q2", y2010: 50, y2011: 45, y2012: 65 },
  { x: "Q3", y2010: 35, y2011: 60, y2012: 50 },
  { x: "Q4", y2010: 55, y2011: 40, y2012: 72 },
  { x: "Q5", y2010: 45, y2011: 65, y2012: 58 },
  { x: "Q6", y2010: 60, y2011: 50, y2012: 68 },
  { x: "Q7", y2010: 42, y2011: 58, y2012: 62 },
];

export const storageBreakdown = [
  { name: "Documents", value: 41, color: B.navy },
  { name: "Videos", value: 22, color: B.cyan },
  { name: "Photos", value: 20, color: B.lightBlue },
  { name: "Music", value: 17, color: B.royal },
];

export const temperatureArea = [
  { x: "-80", v: 8 }, { x: "-70", v: 22 }, { x: "-60", v: 14 }, { x: "-50", v: 30 },
  { x: "-40", v: 18 }, { x: "-30", v: 26 }, { x: "-20", v: 12 }, { x: "-10", v: 20 },
];

export const winSpeedLine = [
  { x: "-80", a: 30, b: 40 }, { x: "-70", a: 45, b: 55 }, { x: "-60", a: 20, b: 35 },
  { x: "-50", a: 55, b: 45 }, { x: "-40", a: 35, b: 60 }, { x: "-30", a: 60, b: 40 },
  { x: "-20", a: 40, b: 50 }, { x: "-10", a: 50, b: 65 },
];

export const economiesRanking = [
  { label: "Noruega", value: 98, color: B.navy },
  { label: "Australia", value: 88, color: B.darkBlue },
  { label: "Suiza", value: 78, color: B.royal },
  { label: "Paises Bajos", value: 68, color: B.sky },
  { label: "Estados Unidos", value: 58, color: B.cyan },
  { label: "Alemania", value: 48, color: B.skyBlue },
  { label: "Nueva Zelanda", value: 38, color: B.lightBlue },
  { label: "Canadá", value: 28, color: B.lightCyan },
];

export const expectedEarningsSpark = [
  { x: 0, v: 20 }, { x: 1, v: 35 }, { x: 2, v: 18 }, { x: 3, v: 40 },
  { x: 4, v: 25 }, { x: 5, v: 48 }, { x: 6, v: 30 }, { x: 7, v: 52 },
  { x: 8, v: 38 }, { x: 9, v: 60 },
];

export const monthlyRainfall = [
  { x: 0, v: 10 }, { x: 1, v: 18 }, { x: 2, v: 14 }, { x: 3, v: 24 },
  { x: 4, v: 20 }, { x: 5, v: 30 }, { x: 6, v: 26 }, { x: 7, v: 36 },
  { x: 8, v: 32 }, { x: 9, v: 42 }, { x: 10, v: 38 }, { x: 11, v: 48 },
];

export const screenReadersLine = [
  { x: "-80", v: 22 }, { x: "-70", v: 30 }, { x: "-60", v: 24 }, { x: "-50", v: 40 },
  { x: "-40", v: 55 }, { x: "-30", v: 62 }, { x: "-20", v: 50 }, { x: "-10", v: 58 },
];

export const userSuppliedDual = [
  { x: "-80", one: 20, two: 35 }, { x: "-70", one: 35, two: 45 }, { x: "-60", one: 55, two: 40 },
  { x: "-50", one: 65, two: 55 }, { x: "-40", one: 58, two: 65 }, { x: "-30", one: 45, two: 50 },
  { x: "-20", one: 38, two: 42 }, { x: "-10", one: 30, two: 35 },
];

export const countriesCompared = [
  { name: "Germany", value: 30, color: B.navy },
  { name: "France", value: 25, color: B.darkBlue },
  { name: "Spain", value: 20, color: B.royal },
  { name: "Poland", value: 12, color: B.veryLightBlue },
  { name: "Italy", value: 8, color: B.mutedBlue },
  { name: "Czech Republic", value: 5, color: B.lightBlue },
];

export const densityTrend = [
  { x: 0, v: 20 }, { x: 1, v: 26 }, { x: 2, v: 22 }, { x: 3, v: 32 }, { x: 4, v: 28 }, { x: 5, v: 38 },
];

export const stackedDeclineBars = [
  { x: "1", purple: 30, yellow: 20, pink: 10 },
  { x: "2", purple: 26, yellow: 18, pink: 12 },
  { x: "3", purple: 22, yellow: 22, pink: 14 },
  { x: "4", purple: 20, yellow: 16, pink: 10 },
  { x: "5", purple: 16, yellow: 14, pink: 8 },
  { x: "6", purple: 14, yellow: 10, pink: 8 },
  { x: "7", purple: 12, yellow: 8, pink: 6 },
  { x: "8", purple: 10, yellow: 8, pink: 5 },
  { x: "9", purple: 8, yellow: 6, pink: 4 },
];

export const browserShare = [
  { name: "Firefox", value: 52, color: B.navy },
  { name: "Chrome", value: 33, color: B.cyan },
  { name: "Opera", value: 15, color: B.royal },
];

export const horizontalDecline = [
  { label: "", value: 100, color: B.navy },
  { label: "", value: 82, color: B.darkBlue },
  { label: "", value: 66, color: B.royal },
  { label: "", value: 50, color: B.sky },
  { label: "", value: 38, color: B.cyan },
];

// Contribution calendar: 26 weeks x 7 days, values 0-4 intensity
function makeWeeks(seedBase: number) {
  const weeks: number[][] = [];
  let s = seedBase;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let w = 0; w < 26; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const r = rand();
      week.push(r > 0.55 ? Math.floor(r * 5) % 4 + (r > 0.85 ? 1 : 0) : 0);
    }
    weeks.push(week);
  }
  return weeks;
}
export const contributionWeeks = makeWeeks(7);
export const contributionMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
// Blue scale: 0=empty, 1=faint, 2=light, 3=mid, 4=deep
export const contributionColors = ["#eef2f9", "#dbeafe", "#93c5fd", "#2563eb", "#1e3a8a"];

export const diagnosticsRainbow = [
  { x: "M", value: 20 }, { x: "T", value: 55 }, { x: "W", value: 35 }, { x: "T", value: 70 },
  { x: "F", value: 45 }, { x: "S", value: 60 }, { x: "S", value: 30 }, { x: "M", value: 65 },
  { x: "T", value: 40 }, { x: "W", value: 58 },
];
// Monochrome blue rainbow (navy → dark-blue → royal → sky → cyan → sky-blue → light-blue → light-cyan)
export const rainbowColors = [B.navy, B.darkBlue, B.royal, B.sky, B.cyan, B.skyBlue, B.lightBlue, B.lightCyan, B.mutedBlue, B.cyan];

export const jennyLine = [
  { x: 0, v: 55 }, { x: 1, v: 68 }, { x: 2, v: 40 }, { x: 3, v: 62 },
  { x: 4, v: 30 }, { x: 5, v: 45 }, { x: 6, v: 20 }, { x: 7, v: 18 },
];

export const monthlyHighlighted = [
  { x: "Jan", v: 55 }, { x: "Feb", v: 62 }, { x: "Mar", v: 48 }, { x: "Apr", v: 58 },
  { x: "May", v: 70 }, { x: "Jun", v: 92 }, { x: "Jul", v: 60 }, { x: "Aug", v: 66 },
  { x: "Sep", v: 50 }, { x: "Oct", v: 58 }, { x: "Nov", v: 45 }, { x: "Dec", v: 52 },
];

export const contributionsBars5y = [
  { x: "2021", v: 30 }, { x: "2020", v: 85 }, { x: "2019", v: 42 }, { x: "2018", v: 55 }, { x: "2017", v: 38 },
];
export const contributionsAreaTrend = [
  { x: 0, v: 20 }, { x: 1, v: 15 }, { x: 2, v: 35 }, { x: 3, v: 25 },
  { x: 4, v: 45 }, { x: 5, v: 30 }, { x: 6, v: 55 }, { x: 7, v: 40 },
  { x: 8, v: 65 }, { x: 9, v: 50 }, { x: 10, v: 75 },
];

export const usdEurHistorical = [
  { x: "Jan", usd: 27, eur: 26 }, { x: "Feb", usd: 28.5, eur: 26.8 }, { x: "Mar", usd: 26, eur: 28 },
  { x: "Apr", usd: 27.5, eur: 26.5 }, { x: "May", usd: 25.5, eur: 27.2 }, { x: "Jun", usd: 27, eur: 25.8 },
];

export const cssHtmlSass = [
  { name: "css", value: 38, color: B.royal },
  { name: "html", value: 24, color: B.lightBlue },
  { name: "sass", value: 38, color: B.navy },
];

export const worldPopulation = {
  America: [
    { x: "2018", v: 20 }, { x: "2019", v: 35 }, { x: "2020", v: 25 }, { x: "2021", v: 45 },
    { x: "2022", v: 30 }, { x: "2023", v: 55 }, { x: "2024", v: 40 }, { x: "2025", v: 60 },
  ],
  Europe: [
    { x: "2018", v: 40 }, { x: "2019", v: 25 }, { x: "2020", v: 45 }, { x: "2021", v: 30 },
    { x: "2022", v: 50 }, { x: "2023", v: 35 }, { x: "2024", v: 55 }, { x: "2025", v: 42 },
  ],
  Asia: [
    { x: "2018", v: 55 }, { x: "2019", v: 65 }, { x: "2020", v: 60 }, { x: "2021", v: 75 },
    { x: "2022", v: 68 }, { x: "2023", v: 82 }, { x: "2024", v: 78 }, { x: "2025", v: 90 },
  ],
};

export const contributionsWeekBar = [
  { x: "Mon", v: 30 }, { x: "Tue", v: 45 }, { x: "Wed", v: 35 }, { x: "Thu", v: 55 },
  { x: "Fri", v: 40 }, { x: "Sat", v: 85 }, { x: "Sun", v: 65 },
];

export const statisticMixed = [
  { x: "-80", yellow: 20, blue: 35, pink: 0 },
  { x: "-70", yellow: 0, blue: 45, pink: 30 },
  { x: "-60", yellow: 35, blue: 0, pink: 50 },
  { x: "-50", yellow: 50, blue: 60, pink: 0 },
  { x: "-40", yellow: 0, blue: 30, pink: 40 },
  { x: "-30", yellow: 40, blue: 0, pink: 55 },
  { x: "-20", yellow: 25, blue: 45, pink: 0 },
  { x: "-10", yellow: 0, blue: 55, pink: 35 },
];

export const intensityWave = [
  { x: 0, a: 10, b: 20, c: 15 }, { x: 1, a: 25, b: 35, c: 28 }, { x: 2, a: 40, b: 55, c: 45 },
  { x: 3, a: 60, b: 70, c: 65 }, { x: 4, a: 45, b: 60, c: 50 }, { x: 5, a: 65, b: 50, c: 58 },
  { x: 6, a: 30, b: 40, c: 35 }, { x: 7, a: 50, b: 65, c: 55 }, { x: 8, a: 35, b: 45, c: 40 },
  { x: 9, a: 55, b: 40, c: 48 },
];

export const appleBananaBars = [
  { x: "Nov", apple: 30, banana: 22 }, { x: "Dec", apple: 45, banana: 35 },
  { x: "Jan", apple: 25, banana: 40 }, { x: "Feb", apple: 55, banana: 28 },
  { x: "Mar", apple: 38, banana: 48 }, { x: "Apr", apple: 60, banana: 32 },
];

export const collectionRainbowBars = [
  { x: "1", value: 30 }, { x: "2", value: 55 }, { x: "3", value: 20 }, { x: "4", value: 65 },
  { x: "5", value: 40 }, { x: "6", value: 58 }, { x: "7", value: 35 }, { x: "8", value: 62 },
  { x: "9", value: 45 }, { x: "10", value: 50 },
];

export const salesCalendarMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];

// Color constants exported for the dashboard component to use directly
export const BLUE_COLORS = B;
