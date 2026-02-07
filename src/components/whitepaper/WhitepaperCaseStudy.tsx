import { Globe, Building2, Car } from "lucide-react";
import WhitepaperStats from "./WhitepaperStats";
import type { CaseStudy } from "@/data/whitepaperData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Building2,
  Car,
};

interface WhitepaperCaseStudyProps {
  study: CaseStudy;
}

const WhitepaperCaseStudy = ({ study }: WhitepaperCaseStudyProps) => {
  const Icon = iconMap[study.icon] || Globe;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold">{study.title}</h3>
          <p className="text-sm text-muted-foreground">{study.subtitle}</p>
        </div>
      </div>

      <WhitepaperStats stats={study.metrics} />

      <p className="text-muted-foreground leading-relaxed mt-6">{study.story}</p>

      {study.quote && (
        <blockquote className="border-l-4 border-primary/50 pl-6 py-3 mt-6 bg-primary/5 rounded-r-xl">
          <p className="text-foreground italic">"{study.quote}"</p>
          {study.quoteAuthor && (
            <cite className="text-sm text-primary font-medium mt-1 block not-italic">
              — {study.quoteAuthor}
            </cite>
          )}
        </blockquote>
      )}
    </div>
  );
};

export default WhitepaperCaseStudy;
