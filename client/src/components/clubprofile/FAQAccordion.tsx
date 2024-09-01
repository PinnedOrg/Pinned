import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQAccordionProps = {
  faqs: { title: string; description: string }[];
};

export function FAQAccordion({faqs}: FAQAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="container px-8 mt-8 animate-fade-in-up">
      <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.title}</AccordionTrigger>
            <AccordionContent>{faq.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
