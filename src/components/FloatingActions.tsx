import { MessageCircle, Phone } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a href="https://wa.me/919999999999" aria-label="Chat on WhatsApp" className="grid h-14 w-14 place-items-center rounded-tokenPill bg-success text-text-inverse shadow-glow transition hover:-translate-y-1">
        <MessageCircle size={24} />
      </a>
      <a href="tel:+919999999999" aria-label="Call Veena Academy" className="grid h-14 w-14 place-items-center rounded-tokenPill bg-accent text-text-inverse shadow-glow transition hover:-translate-y-1">
        <Phone size={23} />
      </a>
    </div>
  );
}


