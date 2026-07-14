import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
};

export default function SectionHeader({ eyebrow, title, description, align = "center", tone = "light" }: SectionHeaderProps) {
  const dark = tone === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <span className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>
      <h2 className={`mt-5 font-display text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl ${dark ? "text-text-inverse" : "text-text-primary"}`}>
        {title}
      </h2>
      <p className={`mt-5 text-base leading-8 sm:text-lg ${dark ? "text-primary-light" : "text-text-secondary"}`}>
        {description}
      </p>
    </motion.div>
  );
}
