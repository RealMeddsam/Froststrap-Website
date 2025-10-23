import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnchorHeading, useAnchorScroll } from "@/components/AnchorHeading";

const FAQ = () => {
  useAnchorScroll();

  return (
    <div className="prose prose-invert max-w-none">
      <AnchorHeading id="faq" level={1}>Frequently Asked Questions</AnchorHeading>
      
      <p className="text-lg text-muted-foreground mb-8">
        Find answers to common questions about Froststrap.
      </p>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Is Froststrap safe to use?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Yes, Froststrap is completely safe to use. It's open source, regularly updated, 
            and doesn't contain any malware or unwanted software. Always download from official sources.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            How do I install Froststrap?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Installing Froststrap is easy! Simply download the latest installer from our official 
            github, run it and done.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            Can I customize the appearance?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Absolutely! Froststrap offers extensive customization options including themes, 
            color schemes, and layout configurations. You can even create your own custom themes.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-left">
            Does Froststrap work on all operating systems?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Froststrap is currently available for Windows 10 and later only.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-left">
            How do I report a bug or request a feature?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            You can report bugs or request features through our Discord or GitHub repository. Simply open 
            an issue with a detailed description of the bug or your feature request.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-left">
            Is Froststrap free?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Yes, Froststrap is completely free and open source. You can use it without any 
            limitations or hidden costs.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
