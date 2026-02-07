import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import { whitepaperMeta, heroByAudience } from "@/data/whitepaperData";

interface WhitepaperHeroProps {
  activeTab: string;
}

const WhitepaperHero = ({ activeTab }: WhitepaperHeroProps) => {
  const hero = heroByAudience[activeTab] || heroByAudience.complete;

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="pt-16 pb-12 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden print:bg-transparent print:pt-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_60%)] print:hidden" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Badge variant="outline" className="border-primary/50 text-primary px-4 py-1.5 text-sm">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              {whitepaperMeta.edition}
            </Badge>
            <Badge className="bg-gradient-gold text-primary-foreground px-4 py-1.5 text-sm">
              {whitepaperMeta.year}
            </Badge>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="text-gradient-gold">{whitepaperMeta.title.split(" ").slice(0, 2).join(" ")}</span>
            <br />
            {hero.title}
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {hero.description}
          </p>

          <Button
            onClick={handlePrint}
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 print:hidden"
          >
            <Download className="w-4 h-4 mr-2" />
            Télécharger en PDF
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperHero;
