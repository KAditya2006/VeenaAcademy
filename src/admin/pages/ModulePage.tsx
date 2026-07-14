import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Filter, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { AdminSearch } from "../components/common/AdminSearch";
import { DataTable } from "../components/common/DataTable";
import { AdminCard } from "../components/common/AdminCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { adminApi } from "../lib/api";
import { useDebounce } from "../hooks/useDebounce";
import type { AdminRecord } from "../types";

type ModulePageProps = { moduleKey: string; title: string; description: string; createLabel?: string };
type FormState = Record<string, string | boolean | number | null | { publicId: string; secureUrl: string; altText?: string }>;
const realModules = new Set(["courses", "faculty", "results", "gallery"]);

function emptyForm(moduleKey: string): FormState {
  const base = { sortOrder: 0, isPublished: false, isFeatured: false };
  if (moduleKey === "courses") return { ...base, title: "", slug: "", category: "School", shortDescription: "", longDescription: "", duration: "", eligibility: "", outcomes: "" };
  if (moduleKey === "faculty") return { ...base, name: "", slug: "", subject: "", qualification: "", experience: "", bio: "", email: "", phone: "" };
  if (moduleKey === "results") return { ...base, studentName: "", examName: "", year: new Date().getFullYear(), achievement: "", percentage: "", course: "" };
  return { ...base, title: "", category: "classroom", altText: "", description: "" };
}

function toPayload(moduleKey: string, form: FormState) {
  const payload: Record<string, unknown> = { ...form };
  for (const key of Object.keys(payload)) {
    if (payload[key] === "") delete payload[key];
  }
  if (moduleKey === "courses" && typeof payload.outcomes === "string") payload.outcomes = payload.outcomes.split("\n").map((item) => item.trim()).filter(Boolean);
  if (payload.sortOrder !== undefined) payload.sortOrder = Number(payload.sortOrder) || 0;
  if (payload.year !== undefined) payload.year = Number(payload.year);
  if (payload.percentage !== undefined) payload.percentage = Number(payload.percentage);
  if (moduleKey === "gallery" && payload.image && payload.altText && typeof payload.image === "object") payload.image = { ...(payload.image as object), altText: payload.altText };
  return payload;
}

function getModuleApi(moduleKey: string) {
  if (moduleKey === "courses") return adminApi.courses;
  if (moduleKey === "faculty") return adminApi.faculty;
  if (moduleKey === "results") return adminApi.results;
  return adminApi.gallery;
}

function CmsForm({ moduleKey, form, setForm, onSave, saving }: { moduleKey: string; form: FormState; setForm: (form: FormState) => void; onSave: () => void; saving: boolean }) {
  const [uploading, setUploading] = useState(false);
  const imageKey = moduleKey === "courses" ? "image" : moduleKey === "faculty" || moduleKey === "results" ? "photo" : "image";
  async function upload(file?: File) {
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("module", moduleKey === "courses" ? "course" : moduleKey === "results" ? "result" : moduleKey === "faculty" ? "faculty" : "gallery");
      data.append("altText", String(form.altText || form.title || form.name || form.studentName || "Veena Academy image"));
      const uploaded = await adminApi.uploads.image(data);
      setForm({ ...form, [imageKey]: uploaded });
    } finally {
      setUploading(false);
    }
  }
  const update = (key: string, value: string | boolean | number) => setForm({ ...form, [key]: value });
  return <AdminCard className="p-5"><div className="grid gap-4 lg:grid-cols-2">{moduleKey === "courses" && <><Input label="Title" value={String(form.title ?? "")} onChange={(e) => update("title", e.target.value)} /><Input label="Slug" value={String(form.slug ?? "")} onChange={(e) => update("slug", e.target.value)} /><Input label="Category" value={String(form.category ?? "")} onChange={(e) => update("category", e.target.value)} /><Input label="Duration" value={String(form.duration ?? "")} onChange={(e) => update("duration", e.target.value)} /><Input label="Eligibility" value={String(form.eligibility ?? "")} onChange={(e) => update("eligibility", e.target.value)} /><Textarea label="Short Description" value={String(form.shortDescription ?? "")} onChange={(e) => update("shortDescription", e.target.value)} /><Textarea label="Long Description" value={String(form.longDescription ?? "")} onChange={(e) => update("longDescription", e.target.value)} /><Textarea label="Outcomes (one per line)" value={String(form.outcomes ?? "")} onChange={(e) => update("outcomes", e.target.value)} /></>}{moduleKey === "faculty" && <><Input label="Name" value={String(form.name ?? "")} onChange={(e) => update("name", e.target.value)} /><Input label="Slug" value={String(form.slug ?? "")} onChange={(e) => update("slug", e.target.value)} /><Input label="Subject" value={String(form.subject ?? "")} onChange={(e) => update("subject", e.target.value)} /><Input label="Qualification" value={String(form.qualification ?? "")} onChange={(e) => update("qualification", e.target.value)} /><Input label="Experience" value={String(form.experience ?? "")} onChange={(e) => update("experience", e.target.value)} /><Input label="Email (admin only)" value={String(form.email ?? "")} onChange={(e) => update("email", e.target.value)} /><Textarea label="Bio" value={String(form.bio ?? "")} onChange={(e) => update("bio", e.target.value)} /></>}{moduleKey === "results" && <><Input label="Student Name" value={String(form.studentName ?? "")} onChange={(e) => update("studentName", e.target.value)} /><Input label="Exam Name" value={String(form.examName ?? "")} onChange={(e) => update("examName", e.target.value)} /><Input label="Year" type="number" value={String(form.year ?? "")} onChange={(e) => update("year", Number(e.target.value))} /><Input label="Achievement" value={String(form.achievement ?? "")} onChange={(e) => update("achievement", e.target.value)} /><Input label="Percentage" type="number" value={String(form.percentage ?? "")} onChange={(e) => update("percentage", e.target.value)} /><Input label="Course" value={String(form.course ?? "")} onChange={(e) => update("course", e.target.value)} /></>}{moduleKey === "gallery" && <><Input label="Title" value={String(form.title ?? "")} onChange={(e) => update("title", e.target.value)} /><Input label="Category" value={String(form.category ?? "")} onChange={(e) => update("category", e.target.value)} /><Input label="Alt Text" value={String(form.altText ?? "")} onChange={(e) => update("altText", e.target.value)} /><Textarea label="Description" value={String(form.description ?? "")} onChange={(e) => update("description", e.target.value)} /></>}<Input label="Sort Order" type="number" value={String(form.sortOrder ?? 0)} onChange={(e) => update("sortOrder", Number(e.target.value))} /><label className="grid gap-2 text-sm font-bold text-primary">Image<input type="file" accept="image/jpeg,image/png,image/webp" className="form-field" onChange={(event) => void upload(event.target.files?.[0])} />{uploading && <span className="text-text-muted">Uploading...</span>}{form[imageKey] && <span className="text-success">Image ready</span>}</label></div><div className="mt-4 flex flex-wrap gap-4"><label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={Boolean(form.isPublished)} onChange={(e) => update("isPublished", e.target.checked)} /> Published</label><label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={Boolean(form.isFeatured)} onChange={(e) => update("isFeatured", e.target.checked)} /> Featured</label></div><Button className="mt-5" loading={saving} leftIcon={<Save size={18} />} onClick={onSave}>Save</Button></AdminCard>;
}

export default function ModulePage({ moduleKey, title, description, createLabel = "Add New" }: ModulePageProps) {
  const real = realModules.has(moduleKey);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm(moduleKey));
  const [editingId, setEditingId] = useState<string | null>(null);
  const debounced = useDebounce(query);
  const queryClient = useQueryClient();
  const moduleApi = real ? getModuleApi(moduleKey) : null;
  const { data = [], isLoading, isError, refetch } = useQuery({ queryKey: ["admin-module", moduleKey], queryFn: () => adminApi.listModule(moduleKey) });
  const saveMutation = useMutation({ mutationFn: () => editingId && moduleApi ? moduleApi.update(editingId, toPayload(moduleKey, form)) : moduleApi!.create(toPayload(moduleKey, form)), onSuccess: async () => { setFormOpen(false); setEditingId(null); setForm(emptyForm(moduleKey)); await queryClient.invalidateQueries({ queryKey: ["admin-module", moduleKey] }); } });
  const actionMutation = useMutation({ mutationFn: ({ action, record }: { action: "publish" | "feature" | "remove"; record: AdminRecord }) => action === "publish" ? moduleApi!.publish(record.id, record.status !== "Published") : action === "feature" ? moduleApi!.feature(record.id, record.owner !== "Featured") : moduleApi!.remove(record.id), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-module", moduleKey] }) });
  const filtered = useMemo(() => data.filter((item) => `${item.title} ${item.subtitle} ${item.status}`.toLowerCase().includes(debounced.toLowerCase())), [data, debounced]);
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">CMS Module</p><h2 className="font-display text-5xl text-primary">{title}</h2><p className="mt-2 max-w-3xl text-text-secondary">{description}</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button variant="secondary" leftIcon={<Download size={18} />}>Export CSV</Button><Button leftIcon={<Plus size={18} />} onClick={() => { setEditingId(null); setForm(emptyForm(moduleKey)); setFormOpen((value) => !value); }}>{createLabel}</Button></div></div><AdminCard className="p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><AdminSearch value={query} onChange={setQuery} placeholder={`Search ${title.toLowerCase()}`} /><div className="flex flex-wrap gap-2"><Button variant="secondary" size="sm" leftIcon={<Filter size={16} />}>Filters</Button><Button variant="ghost" size="sm">Bulk Actions</Button><Button variant="ghost" size="sm">Reorder</Button></div></div></AdminCard>{formOpen && real && <CmsForm moduleKey={moduleKey} form={form} setForm={setForm} onSave={() => saveMutation.mutate()} saving={saveMutation.isPending} />}{isError && <AdminCard className="p-6"><p className="font-bold text-error">Unable to load {title.toLowerCase()}.</p><Button className="mt-4" variant="secondary" leftIcon={<RefreshCw size={16} />} onClick={() => void refetch()}>Retry</Button></AdminCard>}{isLoading ? <div className="h-80 animate-pulse rounded-token2xl bg-card" /> : real ? <div className="grid gap-4">{filtered.length === 0 && <AdminCard className="p-8 text-center text-text-muted">No records found.</AdminCard>}{filtered.map((record) => <AdminCard key={record.id} className="p-5"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><h3 className="text-xl font-black text-primary">{record.title}</h3><p className="mt-1 text-text-muted">{record.subtitle}</p></div><div className="flex flex-wrap items-center gap-2"><StatusBadge status={record.status} /><span className="rounded-tokenPill bg-surface px-3 py-1 text-xs font-bold text-primary">{record.owner}</span></div></div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm" variant="secondary" onClick={() => actionMutation.mutate({ action: "publish", record })}>{record.status === "Published" ? "Unpublish" : "Publish"}</Button><Button size="sm" variant="secondary" onClick={() => actionMutation.mutate({ action: "feature", record })}>{record.owner === "Featured" ? "Unfeature" : "Feature"}</Button><Button size="sm" variant="ghost" leftIcon={<Trash2 size={15} />} onClick={() => actionMutation.mutate({ action: "remove", record })}>Delete</Button></div></AdminCard>)}</div> : <DataTable records={filtered} />}</div>;
}
