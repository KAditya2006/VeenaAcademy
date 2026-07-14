import { connectDatabase, disconnectDatabase } from "../config/database.js";
import { CourseModel } from "../models/Course.model.js";
import { FacultyModel } from "../models/Faculty.model.js";
import { ResultModel } from "../models/Result.model.js";
import { GalleryItemModel } from "../models/GalleryItem.model.js";

const courses = [
  ["Class 6-8 Foundation", "class-6-8-foundation", "School", "Concept-first learning in Maths, Science and English with confidence-building practice.", "Class 6-8"],
  ["Class 9-10 Board Preparation", "class-9-10-board-preparation", "School", "Board-focused coaching with regular tests, NCERT mastery and guided revision plans.", "Class 9-10"],
  ["Class 11-12 Science", "class-11-12-science", "School", "Physics, Chemistry, Maths and Biology coaching for boards and competitive readiness.", "Class 11-12 Science"],
  ["Class 11-12 Commerce", "class-11-12-commerce", "Commerce", "Accounts, Economics and Business Studies with exam strategy and case-based practice.", "Class 11-12 Commerce"],
  ["JEE Preparation", "jee-preparation", "Competitive Exam", "Structured JEE Main and Advanced preparation with problem-solving drills and mocks.", "Class 11-12 / Droppers"],
  ["NEET Preparation", "neet-preparation", "Competitive Exam", "High-retention Biology, Physics and Chemistry coaching with test analytics.", "Class 11-12 / Droppers"],
  ["CUET Preparation", "cuet-preparation", "Competitive Exam", "Domain subjects, language practice and general test preparation for CUET aspirants.", "Class 12 / Passed"],
  ["SSC Preparation", "ssc-preparation", "Competitive Exam", "Reasoning, Quant, English and GK coaching with speed-building practice sessions.", "Graduates / Aspirants"],
  ["Scholarship Preparation", "scholarship-preparation", "Scholarship", "Foundation-level aptitude and subject training for Olympiads and scholarship exams.", "Class 6-10"],
];

export async function seedCms() {
  for (const [index, item] of courses.entries()) {
    const [title, slug, category, shortDescription, eligibility] = item;
    await CourseModel.updateOne({ slug }, { $setOnInsert: { title, slug, category, shortDescription, eligibility, duration: "Full Academic Year", outcomes: ["Concept clarity", "Regular tests", "Mentorship"], subjects: [], features: [], batchTimings: [], sortOrder: index, isPublished: true, publishedAt: new Date() } }, { upsert: true });
  }

  if (process.env.NODE_ENV !== "production") {
    await FacultyModel.updateOne({ slug: "placeholder-faculty-physics" }, { $setOnInsert: { name: "Placeholder Faculty - Physics", slug: "placeholder-faculty-physics", subject: "Physics", qualification: "To be updated", experience: "To be updated", sortOrder: 0, isPublished: true, publishedAt: new Date() } }, { upsert: true });
    await ResultModel.updateOne({ studentName: "Placeholder Result", examName: "JEE Main", year: new Date().getFullYear() }, { $setOnInsert: { studentName: "Placeholder Result", examName: "JEE Main", year: new Date().getFullYear(), achievement: "To be updated", percentage: 90, sortOrder: 0, isPublished: true, publishedAt: new Date() } }, { upsert: true });
    await GalleryItemModel.updateOne({ title: "Placeholder Classroom" }, { $setOnInsert: { title: "Placeholder Classroom", category: "classroom", altText: "Classroom placeholder image", image: { publicId: "placeholder", secureUrl: "https://placehold.co/1200x800", altText: "Classroom placeholder image" }, sortOrder: 0, isPublished: true, publishedAt: new Date() } }, { upsert: true });
  }

  console.log("CMS seed completed without overwriting existing records.");
}

async function run() {
  await connectDatabase();
  await seedCms();
  await disconnectDatabase();
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  run().catch(async (error) => {
    console.error(error instanceof Error ? error.message : "CMS seed failed");
    await disconnectDatabase();
    process.exit(1);
  });
}
