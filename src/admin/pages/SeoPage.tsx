import { Save } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { AdminCard } from "../components/common/AdminCard";

export default function SeoPage() {
  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">SEO</p><h2 className="font-display text-5xl text-primary">SEO Control Panel</h2><p className="mt-2 text-text-secondary">Manage meta tags, Open Graph, canonical URLs, robots, sitemap and schema settings.</p></div><AdminCard className="p-6"><div className="grid gap-5 lg:grid-cols-2"><Input label="Page Path" defaultValue="/" /><Input label="Canonical URL" defaultValue="https://www.veenaacademy.com" /><Input label="Meta Title" defaultValue="Veena Academy | Coaching for Boards, JEE, NEET, CUET & SSC" /><Input label="Keywords" defaultValue="coaching, JEE, NEET, boards, CUET" /><Textarea label="Meta Description" defaultValue="Join Veena Academy for expert coaching, regular tests, doubt support, library facility, transport facility, and result-oriented preparation." /><Textarea label="Schema JSON" defaultValue={'{"@type":"EducationalOrganization","name":"Veena Academy"}'} /></div><Button className="mt-6" leftIcon={<Save size={18} />}>Save SEO</Button></AdminCard></div>;
}


