import { Bus, ClipboardCheck, Library, ShieldCheck, Star, UserCheck, UsersRound } from "lucide-react";
import type { Stat } from "../types";

export const stats: Stat[] = [
  { id: "students", icon: UsersRound, value: 5000, suffix: "+", label: "Students Guided", description: "Trusted by learners across school and competitive tracks." },
  { id: "faculty", icon: UserCheck, value: 25, suffix: "+", label: "Expert Faculty", description: "Experienced teachers with subject-depth and mentoring focus." },
  { id: "experience", icon: Star, value: 12, suffix: "+", label: "Years Experience", description: "A disciplined academic system built over years." },
  { id: "tests", icon: ClipboardCheck, value: 120, suffix: "+", label: "Regular Tests", description: "Weekly test practice and performance review." },
  { id: "library", icon: Library, value: 1, suffix: "", label: "Library Facility", description: "Quiet study support for focused learners." },
  { id: "transport", icon: Bus, value: 1, suffix: "", label: "Transport Facility", description: "Route-based convenience for families." },
  { id: "mentorship", icon: ShieldCheck, value: 1, suffix: "", label: "Personal Mentorship", description: "Guidance that keeps students accountable." },
];
