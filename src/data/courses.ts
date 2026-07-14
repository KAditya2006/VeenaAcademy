import {
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  FlaskConical,
  GraduationCap,
  Landmark,
  Target,
} from "lucide-react";
import type { Course } from "../types";

export const courses: Course[] = [
  { id: "foundation-6-8", title: "Class 6-8 Foundation", slug: "class-6-8-foundation", category: "School", description: "Concept-first learning in Maths, Science and English with confidence-building practice.", duration: "Full Academic Year", eligibility: "Class 6-8", icon: GraduationCap, cta: "Know More", outcomes: ["Strong fundamentals", "Regular worksheets", "Confidence in school exams"] },
  { id: "boards-9-10", title: "Class 9-10 Board Preparation", slug: "class-9-10-board-preparation", category: "School", description: "Board-focused coaching with regular tests, NCERT mastery and guided revision plans.", duration: "1-2 Years", eligibility: "Class 9-10", icon: BookOpen, cta: "Know More", outcomes: ["NCERT clarity", "Board answer writing", "Weekly tests"] },
  { id: "science-11-12", title: "Class 11-12 Science", slug: "class-11-12-science", category: "School", description: "Physics, Chemistry, Maths and Biology coaching for boards and competitive readiness.", duration: "1-2 Years", eligibility: "Class 11-12 Science", icon: FlaskConical, cta: "Know More", outcomes: ["Board preparation", "Concept depth", "Competitive foundation"] },
  { id: "commerce-11-12", title: "Class 11-12 Commerce", slug: "class-11-12-commerce", category: "Commerce", description: "Accounts, Economics and Business Studies with exam strategy and case-based practice.", duration: "1-2 Years", eligibility: "Class 11-12 Commerce", icon: Calculator, cta: "Know More", outcomes: ["Accountancy clarity", "Case-based practice", "Exam strategy"] },
  { id: "jee", title: "JEE Preparation", slug: "jee-preparation", category: "Competitive Exam", description: "Structured JEE Main and Advanced preparation with problem-solving drills and mocks.", duration: "1-2 Years", eligibility: "Class 11-12 / Droppers", icon: Target, cta: "Know More", outcomes: ["Advanced problem solving", "Mock tests", "Rank-focused mentoring"] },
  { id: "neet", title: "NEET Preparation", slug: "neet-preparation", category: "Competitive Exam", description: "High-retention Biology, Physics and Chemistry coaching with test analytics.", duration: "1-2 Years", eligibility: "Class 11-12 / Droppers", icon: BadgeCheck, cta: "Know More", outcomes: ["NCERT Biology mastery", "Test analytics", "Doubt support"] },
  { id: "cuet", title: "CUET Preparation", slug: "cuet-preparation", category: "Competitive Exam", description: "Domain subjects, language practice and general test preparation for CUET aspirants.", duration: "3-9 Months", eligibility: "Class 12 / Passed", icon: Landmark, cta: "Know More", outcomes: ["Domain preparation", "Language practice", "General test readiness"] },
  { id: "ssc", title: "SSC Preparation", slug: "ssc-preparation", category: "Competitive Exam", description: "Reasoning, Quant, English and GK coaching with speed-building practice sessions.", duration: "6-12 Months", eligibility: "Graduates / Aspirants", icon: BriefcaseBusiness, cta: "Know More", outcomes: ["Speed practice", "Sectional tests", "Exam strategy"] },
  { id: "scholarship", title: "Scholarship Preparation", slug: "scholarship-preparation", category: "Scholarship", description: "Foundation-level aptitude and subject training for Olympiads and scholarship exams.", duration: "3-6 Months", eligibility: "Class 6-10", icon: Award, cta: "Know More", outcomes: ["Aptitude training", "Olympiad practice", "Scholarship readiness"] },
];
