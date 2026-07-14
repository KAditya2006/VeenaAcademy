import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const contacts = [
  { icon: Phone, label: "Phone", value: "+91 99999 99999", href: "tel:+919999999999" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 99999 99999", href: "https://wa.me/919999999999" },
  { icon: MapPin, label: "Address", value: "Veena Academy, Main Road, Your City", href: "#" },
  { icon: Mail, label: "Email", value: "admissions@veenaacademy.in", href: "mailto:admissions@veenaacademy.in" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-card py-20 sm:py-28">
      <div className="container-premium">
        <SectionHeader
          eyebrow="Contact"
          title="Book a free demo class"
          description="Share a few details and our admission team will contact you for counselling, batch options and demo scheduling."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="premium-card grid gap-5 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-primary">
                Student Name
                <input className="form-field" placeholder="Enter name" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-primary">
                Class
                <input className="form-field" placeholder="Class 10" />
              </label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-primary">
                Course Interested
                <select className="form-field">
                  <option>JEE Preparation</option>
                  <option>NEET Preparation</option>
                  <option>Class 9-10 Boards</option>
                  <option>CUET Preparation</option>
                  <option>Foundation Course</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-primary">
                Phone Number
                <input className="form-field" placeholder="+91" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-primary">
              Message
              <textarea className="min-h-32 form-field" placeholder="Tell us what you are looking for" />
            </label>
            <button type="button" className="button-primary w-full sm:w-fit">Submit Enquiry</button>
          </motion.form>

          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((contact) => (
                <a key={contact.label} href={contact.href} className="premium-card p-5 hover:-translate-y-1">
                  <contact.icon className="text-accent" size={26} />
                  <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-text-muted">{contact.label}</p>
                  <p className="mt-2 font-black text-primary">{contact.value}</p>
                </a>
              ))}
            </div>
            <div className="premium-card grid min-h-72 place-items-center overflow-hidden bg-gradient-to-br from-primary to-primary-hover p-8 text-center text-text-inverse">
              <div>
                <MapPin className="mx-auto text-accent" size={38} />
                <h3 className="mt-5 text-2xl font-black">Google Map Placeholder</h3>
                <p className="mt-3 text-primary-light">Add the embedded map once the final academy location is confirmed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



