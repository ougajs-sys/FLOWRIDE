import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WhitepaperSection } from "@/data/whitepaperData";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface WhitepaperTableOfContentsProps {
  sections: WhitepaperSection[];
  activeSection: string;
  hasCaseStudies: boolean;
}

const WhitepaperTableOfContents = ({
  sections,
  activeSection,
  hasCaseStudies,
}: WhitepaperTableOfContentsProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileOpen(false);
    }
  };

  const tocItems = sections.map((s) => ({
    id: s.id,
    number: s.number,
    title: s.title,
  }));

  const NavContent = () => (
    <nav className="space-y-1">
      {tocItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={cn(
            "w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-2",
            activeSection === item.id
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          <span className="text-xs font-mono text-primary/60 w-5">{item.number}</span>
          <span className="truncate">{item.title}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block print:hidden">
        <div className="sticky top-24">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 px-3">
            Table des matières
          </p>
          <NavContent />
        </div>
      </aside>

      {/* Mobile: Collapsible */}
      <div className="lg:hidden mb-8 print:hidden">
        <Collapsible open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between bg-card border border-border rounded-xl px-4 py-3">
            <span className="text-sm font-medium">Table des matières</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-muted-foreground transition-transform",
                isMobileOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 bg-card border border-border rounded-xl p-3">
            <NavContent />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
};

export default WhitepaperTableOfContents;
