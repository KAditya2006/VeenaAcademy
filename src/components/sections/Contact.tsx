import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Textarea } from "../common/Textarea";
import { courses } from "../../data/courses";
import { academyContact } from "../../lib/constants";
import { enquirySchema, type EnquiryFormValues } from "../../lib/validation";

const contacts = [
  { icon: Phone, label: "Phone", value: academyContact.phone, href: academyContact.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: academyContact.whatsapp, href: academyContact.whatsappHref },
  { icon: MapPin, label: "Address", value: academyContact.address, href: "/contact" },
  { icon: Mail, label: "Email", value: academyContact.email, href: academyContact.emailHref },
];

export function Contact() {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<EnquiryFormValues>({ resolver: zodResolver(enquirySchema), mode: "onBlur" });

  async function onSubmit(values: EnquiryFormValues) {
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    void values;
    setSuccess(true);
    reset();
  }

  return <section id="contact" className="bg-card section-pad"><Container><SectionHeader badge="Contact" title="Book a free demo class" description="Share a few details and our admission team will contact you for counselling, batch options and demo scheduling." /><div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"><motion.form onSubmit={handleSubmit(onSubmit)} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="premium-card grid gap-5 p-6 sm:p-8" noValidate>{success && <div className="rounded-tokenXl border border-success/30 bg-success/10 p-4 text-sm font-bold text-success" role="status">Thank you. Our counselling team will contact you shortly.</div>}<div className="grid gap-5 sm:grid-cols-2"><Input label="Student Name" placeholder="Enter name" error={errors.studentName?.message} {...register("studentName")} /><Input label="Class" placeholder="Class 10" error={errors.studentClass?.message} {...register("studentClass")} /></div><div className="grid gap-5 sm:grid-cols-2"><Select label="Course Interested" options={courses.map((course) => ({ label: course.title, value: course.slug }))} error={errors.courseInterested?.message} {...register("courseInterested")} /><Input label="Phone Number" placeholder="+91" error={errors.phone?.message} {...register("phone")} /></div><Textarea label="Message" placeholder="Tell us what you are looking for" error={errors.message?.message} {...register("message")} /><div className="flex flex-col gap-3 sm:flex-row sm:items-center"><Button type="submit" loading={isSubmitting} className="w-full sm:w-fit">Submit Enquiry</Button><a href={academyContact.whatsappHref} className="text-center text-sm font-black text-primary hover:text-accent">Prefer WhatsApp?</a></div></motion.form><div className="grid gap-5"><div className="grid gap-4 sm:grid-cols-2">{contacts.map((contact) => <a key={contact.label} href={contact.href} className="premium-card p-5 hover:-translate-y-1"><contact.icon className="text-accent" size={26} /><p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-text-muted">{contact.label}</p><p className="mt-2 font-black text-primary">{contact.value}</p></a>)}</div><div className="premium-card grid min-h-72 place-items-center overflow-hidden bg-gradient-to-br from-primary to-primary-hover p-8 text-center text-text-inverse"><div><MapPin className="mx-auto text-accent" size={38} /><h3 className="mt-5 text-2xl font-black">Google Map Placeholder</h3><p className="mt-3 text-primary-light">Add the embedded map once the final academy location is confirmed.</p><p className="mt-3 text-sm font-bold text-accent-light">Office Hours: {academyContact.officeHours}</p></div></div></div></div></Container></section>;
}

