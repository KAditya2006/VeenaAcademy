import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { fadeUp, viewportOnce } from "../../lib/animations";

type SectionHeaderProps = {
  badge: string;
  title: string;
  description: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeader({ badge, title, description, align = "center", tone = "light", className }: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}
    >
      <span className={dark ? "eyebrow-dark" : "eyebrow"}>{badge}</span>
      <h2 className={cn("mt-5 font-display text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl", dark ? "text-text-inverse" : "text-text-primary")}>{title}</h2>
      <p className={cn("mt-5 text-base leading-8 sm:text-lg", dark ? "text-primary-light" : "text-text-secondary")}>{description}</p>
    </motion.div>
  );
}

