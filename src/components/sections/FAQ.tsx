import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { Accordion } from "../common/Accordion";
import { faqs } from "../../data/faqs";

export function FAQ() {
  return <section className="bg-surface section-pad"><Container size="narrow"><SectionHeader badge="FAQ" title="Answers before you visit" description="Quick information about admission, demo classes, available courses, tests and academy facilities." /><div className="mx-auto mt-14 max-w-3xl"><Accordion items={faqs} /></div></Container></section>;
}
