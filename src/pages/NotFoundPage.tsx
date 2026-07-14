import { Link } from "react-router-dom";
import { Container } from "../components/common/Container";
import { SEO } from "../components/common/SEO";

export default function NotFoundPage() {
  return <><SEO title="Page Not Found | Veena Academy" description="The page you are looking for could not be found." /><section className="grid min-h-[70vh] place-items-center pb-20 pt-32"><Container size="reading" className="text-center"><span className="eyebrow">404</span><h1 className="mt-6 font-display text-6xl text-primary">Page not found</h1><p className="mt-5 leading-8 text-text-secondary">This page may have moved. Return to the homepage or explore Veena Academy courses.</p><Link to="/" className="button-primary mt-8">Back to Home</Link></Container></section></>;
}
