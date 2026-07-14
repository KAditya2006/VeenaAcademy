import { Save } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { Textarea } from "../../components/common/Textarea";
import { AdminCard } from "../components/common/AdminCard";

export default function SettingsPage() {
  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Website</p><h2 className="font-display text-5xl text-primary">Website Settings</h2><p className="mt-2 text-text-secondary">Manage public website identity, contact details, CTAs and footer content.</p></div><AdminCard className="p-6"><div className="grid gap-5 lg:grid-cols-2"><Input label="Coaching Name" defaultValue="Veena Academy" /><Input label="Phone" defaultValue="+91 99999 99999" /><Input label="WhatsApp" defaultValue="+91 99999 99999" /><Input label="Email" defaultValue="admissions@veenaacademy.in" /><Input label="Admission Year" defaultValue="2026-27" /><Input label="Business Hours" defaultValue="Mon-Sat, 8:00 AM - 7:00 PM" /><Textarea label="Hero Title" defaultValue="Empowering Students to Achieve Excellence" /><Textarea label="Footer Content" defaultValue="Premium coaching for school, board and competitive exam preparation." /></div><Button className="mt-6" leftIcon={<Save size={18} />}>Save Settings</Button></AdminCard></div>;
}


