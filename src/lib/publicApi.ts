import { Award, BadgeCheck, BookOpen, BriefcaseBusiness, Calculator, FlaskConical, GraduationCap, Landmark, Target } from "lucide-react";
import type { Course, CourseCategory, FacultyMember, GalleryItem, Result } from "../types";
import { courses as staticCourses } from "../data/courses";
import { faculty as staticFaculty } from "../data/faculty";
import { results as staticResults } from "../data/results";
import { gallery as staticGallery } from "../data/gallery";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";
export const staticFallbackEnabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_STATIC_FALLBACK === "true";

type ApiEnvelope<T> = { success: boolean; message: string; data: T };
type Media = { secureUrl?: string; altText?: string } | null;
type ApiCourse = { _id: string; title: string; slug: string; category: CourseCategory | string; shortDescription: string; longDescription?: string; duration?: string; eligibility?: string; outcomes?: string[]; image?: Media; icon?: string; seoTitle?: string | null; seoDescription?: string | null };
type ApiFaculty = { _id: string; name: string; subject: string; qualification: string; experience: string; photo?: Media };
type ApiResult = { _id: string; studentName: string; examName: string; achievement: string; percentage?: number; marks?: string; maximumMarks?: string; course?: string; photo?: Media };
type ApiGallery = { _id: string; title: string; category: string; image?: Media; altText?: string };

const icons = { Award, BadgeCheck, BookOpen, BriefcaseBusiness, Calculator, FlaskConical, GraduationCap, Landmark, Target };
function iconFor(course: ApiCourse) { return icons[(course.icon as keyof typeof icons) || "BookOpen"] ?? BookOpen; }
function initials(value: string) { return value.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "VA"; }
function galleryCategory(value: string): GalleryItem["category"] { const map: Record<string, GalleryItem["category"]> = { classroom: "Classroom", events: "Events", students: "Students", seminars: "Seminars", results: "Events", facilities: "Classroom" }; return map[value] ?? "Classroom"; }

async function publicRequest<T>(path: string, signal?: AbortSignal) {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });
  const payload = await response.json().catch(() => null) as ApiEnvelope<T> | null;
  if (!response.ok || !payload?.success) throw new Error(payload?.message || "Unable to load content");
  return payload.data;
}

export function mapApiCourseToCourseViewModel(course: ApiCourse): Course {
  const fallback = staticCourses.find((item) => item.slug === course.slug);
  return { id: course._id, title: course.title, slug: course.slug, category: (course.category as CourseCategory) || fallback?.category || "School", description: course.shortDescription, duration: course.duration || fallback?.duration || "", eligibility: course.eligibility || fallback?.eligibility || "", icon: fallback?.icon ?? iconFor(course), cta: "Know More", outcomes: course.outcomes?.length ? course.outcomes : fallback?.outcomes ?? [], imageUrl: course.image?.secureUrl, imageAlt: course.image?.altText || course.title, longDescription: course.longDescription, seoTitle: course.seoTitle, seoDescription: course.seoDescription };
}
export function mapApiFacultyToFacultyViewModel(item: ApiFaculty): FacultyMember { return { id: item._id, name: item.name, subject: item.subject, qualification: item.qualification, experience: item.experience, initials: initials(item.name), photoUrl: item.photo?.secureUrl }; }
export function mapApiResultToResultViewModel(item: ApiResult): Result { return { id: item._id, name: item.studentName, achievement: item.examName, score: item.percentage !== undefined ? `${item.percentage}%` : item.marks || item.achievement, detail: item.course || item.achievement, initials: initials(item.studentName), photoUrl: item.photo?.secureUrl }; }
export function mapApiGalleryToGalleryViewModel(item: ApiGallery, index: number): GalleryItem { return { id: item._id, title: item.title, category: galleryCategory(item.category), tone: "from-primary-light to-accent-light", height: index % 2 ? "h-96" : "h-72", imageUrl: item.image?.secureUrl, altText: item.altText || item.image?.altText || item.title }; }

export async function getPublicCourses(signal?: AbortSignal) { return (await publicRequest<ApiCourse[]>("/courses/public?limit=100&sortBy=sortOrder&sortOrder=asc", signal)).map(mapApiCourseToCourseViewModel); }
export async function getPublicCourseBySlug(slug: string, signal?: AbortSignal) { return mapApiCourseToCourseViewModel(await publicRequest<ApiCourse>(`/courses/public/${slug}`, signal)); }
export async function getPublicFaculty(signal?: AbortSignal) { return (await publicRequest<ApiFaculty[]>("/faculty/public?limit=100&sortBy=sortOrder&sortOrder=asc", signal)).map(mapApiFacultyToFacultyViewModel); }
export async function getPublicResults(signal?: AbortSignal) { return (await publicRequest<ApiResult[]>("/results/public?limit=100&sortBy=sortOrder&sortOrder=asc", signal)).map(mapApiResultToResultViewModel); }
export async function getPublicGallery(signal?: AbortSignal) { return (await publicRequest<ApiGallery[]>("/gallery/public?limit=100&sortBy=sortOrder&sortOrder=asc", signal)).map(mapApiGalleryToGalleryViewModel); }

export const staticData = { courses: staticCourses, faculty: staticFaculty, results: staticResults, gallery: staticGallery };
