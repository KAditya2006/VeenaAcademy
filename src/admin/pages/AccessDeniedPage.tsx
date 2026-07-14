import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccessDeniedPage() {
  return <section className="grid min-h-[60vh] place-items-center"><div className="max-w-lg text-center"><ShieldAlert className="mx-auto text-error" size={44} /><h2 className="mt-5 font-display text-5xl text-primary">Access restricted</h2><p className="mt-4 leading-7 text-text-secondary">Your current role does not have permission to access this module. Switch role preview or contact a Super Admin.</p><Link to="/admin" className="button-primary mt-6">Back to Dashboard</Link></div></section>;
}


