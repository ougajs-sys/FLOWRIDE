import { Separator } from "@/components/ui/separator";
import WhitepaperStats from "./WhitepaperStats";
import type { WhitepaperSection as SectionType } from "@/data/whitepaperData";

interface WhitepaperSectionProps {
  section: SectionType;
}

const WhitepaperSection = ({ section }: WhitepaperSectionProps) => {
  return (
    <section id={section.id} className="scroll-mt-24 mb-16 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-5xl font-display font-bold text-primary/20 select-none print:text-primary/40">
          {section.number}
        </span>
        <h2 className="font-display text-2xl md:text-3xl font-bold">{section.title}</h2>
      </div>

      {/* Introduction */}
      <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl">
        {section.introduction}
      </p>

      {/* Stats */}
      {section.stats && section.stats.length > 0 && (
        <div className="mb-10">
          <WhitepaperStats stats={section.stats} />
        </div>
      )}

      {/* Subsections */}
      {section.subsections.map((sub, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="font-display text-xl font-semibold mb-3">{sub.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{sub.content}</p>
          {sub.items && sub.items.length > 0 && (
            <ul className="space-y-2 ml-1">
              {sub.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Quote */}
      {section.quote && (
        <blockquote className="border-l-4 border-primary/50 pl-6 py-4 my-8 bg-primary/5 rounded-r-xl">
          <p className="text-foreground italic text-lg leading-relaxed">
            "{section.quote}"
          </p>
          {section.quoteAuthor && (
            <cite className="text-sm text-primary font-medium mt-2 block not-italic">
              — {section.quoteAuthor}
            </cite>
          )}
        </blockquote>
      )}

      <Separator className="mt-12" />
    </section>
  );
};

export default WhitepaperSection;
