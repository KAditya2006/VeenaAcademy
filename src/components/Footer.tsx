import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const quickLinks = ["Home", "Courses", "Results", "Faculty", "Gallery", "Contact"];
const footerCourses = ["JEE", "NEET", "CUET", "Boards", "Foundation", "SSC"];

export default function Footer() {
  return (
    <footer className="bg-primary-hover text-text-inverse">
      <div className="container-premium grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-tokenXl bg-accent text-lg font-black">V</span>
            <span className="text-xl font-black">Veena Academy</span>
          </div>
          <p className="mt-5 max-w-sm leading-7 text-primary-light">
            Premium coaching for school, board and competitive exam preparation with expert faculty, mentoring and consistent testing.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, index) => (
              <a key={index} href="#" aria-label="Social media" className="grid h-10 w-10 place-items-center rounded-tokenPill bg-card/10 text-text-inverse transition hover:bg-accent">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Quick Links</h3>
          <div className="mt-5 grid gap-3">
            {quickLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-primary-light hover:text-accent">{link}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Courses</h3>
          <div className="mt-5 grid gap-3">
            {footerCourses.map((course) => (
              <a key={course} href="#courses" className="text-primary-light hover:text-accent">{course}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-black">Contact</h3>
          <div className="mt-5 space-y-3 text-primary-light">
            <p>+91 99999 99999</p>
            <p>admissions@veenaacademy.in</p>
            <p>Veena Academy, Main Road, Your City</p>
          </div>
        </div>
      </div>
      <div className="border-t border-glass-border py-5 text-center text-sm text-primary-light">
        Copyright 2026 Veena Academy. All rights reserved.
      </div>
    </footer>
  );
}


