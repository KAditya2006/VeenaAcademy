import { MessageCircle, Phone } from "lucide-react";
import { academyContact } from "../../lib/constants";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 md:bottom-6 md:right-6">
      <a href={academyContact.whatsappHref} aria-label="Chat on WhatsApp" className="grid h-14 w-14 place-items-center rounded-tokenPill bg-success text-text-inverse shadow-glow transition hover:-translate-y-1">
        <MessageCircle size={24} />
      </a>
      <a href={academyContact.phoneHref} aria-label="Call Veena Academy" className="grid h-14 w-14 place-items-center rounded-tokenPill bg-accent text-text-inverse shadow-glow transition hover:-translate-y-1">
        <Phone size={23} />
      </a>
    </div>
  );
}
