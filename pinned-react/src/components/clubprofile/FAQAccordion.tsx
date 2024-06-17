import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "sof hsodfh sdofhsof sofd jsofjsfsd fsf?",
    answer: "s dfi hdsi fgdioug hsdoiug hsdioug hsdoifghdsoigdsfogidsgoisoigsdbgois dgoidsfhgoiudsfhoiudsfhodisuhsdoifghsdoiughdsoiughdsoiughdsoifughdsoiughdsioghdfsoigus."
  },
  {
    question: "sofunsog so gnsodng osd so so vsv?",
    answer: "s dfi hdsi fgdioug hsdoiug hsdioug hsdoifghdsoigdsfogidsgoisoigsdbgois dgoidsfhgoiudsfhoiudsfhodisuhsdoifghsdoiughdsoiughdsoiughdsoifughdsoiughdsioghdfsoigus."
  },
  {
    question: "s dfosof nsof nsofns doduf nsdofnsdofuns dfous dnfosdnfosnosfn sdofn sodfbs?",
    answer: "dfi hdsi fgdioug hsdoiug hsdioug hsdoifghdsoigdsfogidsgoisoigsdbgois dgoidsfhgoiudsfhoiudsfhodisuhsdoifghsdoiughdsoiughdsoiughdsoifughdsoiughdsioghdfsoigus."
  },
];

export function FAQAccordion() {
  return (
    <div className="mt-8 px-8">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
