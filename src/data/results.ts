import type { Result } from "../types";

export const results: Result[] = [
  { id: "aarav-mehta", name: "Aarav Mehta", achievement: "JEE Main", score: "98.7 percentile", detail: "Top batch performer", initials: "AM" },
  { id: "saanvi-rao", name: "Saanvi Rao", achievement: "NEET", score: "665/720", detail: "Medical aspirant", initials: "SR" },
  { id: "kabir-singh", name: "Kabir Singh", achievement: "Class 10 Boards", score: "96.8%", detail: "School topper", initials: "KS" },
  { id: "isha-jain", name: "Isha Jain", achievement: "CUET", score: "742/800", detail: "Commerce stream", initials: "IJ" },
];

export const resultCounters = [
  { id: "students", value: 5000, suffix: "+", label: "Students Guided", description: "Across school and competitive programs" },
  { id: "success", value: 92, suffix: "%", label: "Board Success Rate", description: "Consistent improvement-focused outcomes" },
  { id: "tests", value: 120, suffix: "+", label: "Weekly Tests", description: "Structured academic performance tracking" },
];
