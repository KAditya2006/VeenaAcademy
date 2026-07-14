export type AnalyticsEventName =
  | "cta_book_demo_click"
  | "cta_whatsapp_click"
  | "cta_call_click"
  | "form_admission_submit"
  | "form_contact_submit"
  | "form_scholarship_submit"
  | "brochure_download"
  | "course_card_click"
  | "faq_expand"
  | "gallery_open"
  | "scroll_depth_75";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}
