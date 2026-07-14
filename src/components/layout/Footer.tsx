import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Container } from "../common/Container";
import { courses } from "../../data/courses";
import { navigation } from "../../data/navigation";
import { academyContact } from "../../lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary-hover text-text-inverse">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-tokenXl bg-accent text-lg font-black">V</span>
            <span className="text-xl font-black">Veena Academy</span>
          </NavLink>
          <p className="mt-5 max-w-sm leading-7 text-primary-light">Premium coaching for school, board and competitive exam preparation with expert faculty, mentoring and consistent testing.</p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, index) => (
              <a key={index} href="#" aria-label="Social media" className="grid h-10 w-10 place-items-center rounded-tokenPill bg-card/10 text-text-inverse transition hover:bg-accent"><Icon size={18} /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-5 grid gap-3">
            {navigation.map((item) => <NavLink key={item.href} to={item.href} className="text-primary-light hover:text-accent-light">{item.label}</NavLink>)}
          </div>
        </div>
        <div>
          <h3 className="font-black">Courses</h3>
          <div className="mt-5 grid gap-3">
            {courses.slice(0, 6).map((course) => <NavLink key={course.id} to={`/courses/${course.slug}`} className="text-primary-light hover:text-accent-light">{course.title}</NavLink>)}
          </div>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-5 space-y-3 text-primary-light">
            <p>{academyContact.phone}</p>
            <p>{academyContact.email}</p>
            <p>{academyContact.address}</p>
            <p>{academyContact.officeHours}</p>
          </div>
        </div>
      </Container>
      <div className="border-t border-glass-border py-5 text-center text-sm text-primary-light">Copyright 2026 Veena Academy. All rights reserved.</div>
    </footer>
  );
}
