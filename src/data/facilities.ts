import { Bus, ClipboardList, HeartHandshake, Library, MonitorPlay, Shield } from "lucide-react";
import type { Facility } from "../types";

export const facilities: Facility[] = [
  { id: "library", icon: Library, title: "Library", description: "Quiet reading spaces and reference materials for focused study hours." },
  { id: "transport", icon: Bus, title: "Transport", description: "Route-based transport support for convenient academy access." },
  { id: "smart-classes", icon: MonitorPlay, title: "Smart Classes", description: "Digital learning aids for visual understanding and better retention." },
  { id: "test-series", icon: ClipboardList, title: "Test Series", description: "Regular tests with performance reviews and exam-readiness tracking." },
  { id: "counselling", icon: HeartHandshake, title: "Counselling", description: "Academic and career guidance for students and parents." },
  { id: "safe-environment", icon: Shield, title: "Safe Learning Environment", description: "Disciplined, respectful and student-friendly campus culture." },
];
