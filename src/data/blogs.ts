export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  publishedAt: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "board-revision-plan",
    title: "How to Build a Calm Board Exam Revision Plan",
    slug: "board-exam-revision-plan",
    category: "Boards",
    excerpt: "A practical revision framework for students who want structure, confidence and consistent marks improvement.",
    content: "Start with a subject-wise audit, revise high-weightage chapters first, solve previous papers weekly, and reserve daily time for doubt clearing. A calm plan beats last-minute pressure.",
    readTime: "4 min read",
    publishedAt: "2026-07-01",
  },
  {
    id: "jee-neet-tests",
    title: "Why Weekly Tests Matter for JEE and NEET Aspirants",
    slug: "weekly-tests-jee-neet",
    category: "Competitive Exams",
    excerpt: "Weekly testing helps students build exam stamina, speed, accuracy and a realistic view of their preparation.",
    content: "A weekly test routine creates measurable progress. Students learn where marks are leaking, which concepts need revision, and how to manage time under pressure.",
    readTime: "5 min read",
    publishedAt: "2026-07-03",
  },
  {
    id: "parent-progress",
    title: "What Parents Should Track Beyond Marks",
    slug: "what-parents-should-track-beyond-marks",
    category: "Parent Guidance",
    excerpt: "Marks matter, but consistency, attendance, test review and confidence are equally important signals.",
    content: "Parents should track regularity, homework completion, doubt asking, test analysis and stress level. These signals show whether the student is actually improving.",
    readTime: "3 min read",
    publishedAt: "2026-07-05",
  },
];
