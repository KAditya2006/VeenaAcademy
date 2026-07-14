import type { GalleryItem } from "../types";

export const gallery: GalleryItem[] = [
  { id: "classroom", title: "Interactive Classroom", category: "Classroom", tone: "from-primary-light to-accent-light", height: "h-72" },
  { id: "seminar", title: "Student Seminar", category: "Seminars", tone: "from-primary-light/80 to-primary-light", height: "h-96" },
  { id: "test-hall", title: "Weekly Test Hall", category: "Classroom", tone: "from-accent-light to-background", height: "h-64" },
  { id: "counselling", title: "Academic Counselling", category: "Students", tone: "from-background to-primary-light", height: "h-80" },
  { id: "library", title: "Library Study Hour", category: "Students", tone: "from-primary-light/70 to-accent-light", height: "h-72" },
  { id: "achievement", title: "Achievement Day", category: "Events", tone: "from-accent-light to-primary-light", height: "h-96" },
];
