import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import WhitepaperHero from "@/components/whitepaper/WhitepaperHero";
import WhitepaperTableOfContents from "@/components/whitepaper/WhitepaperTableOfContents";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";
import WhitepaperCaseStudy from "@/components/whitepaper/WhitepaperCaseStudy";
import WhitepaperCTA from "@/components/whitepaper/WhitepaperCTA";
import WhitepaperStats from "@/components/whitepaper/WhitepaperStats";
import {
  getSectionsByAudience,
  getCaseStudiesByAudience,
  keyStats,
} from "@/data/whitepaperData";

const tabMap: Record<string, string> = {
  client: "client",
  partenaire: "partenaire",
};

const LivreBlanc = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const vueParam = searchParams.get("vue");
  const initialTab = tabMap[vueParam || ""] || "complete";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeSection, setActiveSection] = useState("");

  const filteredSections = getSectionsByAudience(activeTab);
  const filteredCaseStudies = getCaseStudiesByAudience(activeTab);
  const hasCaseStudies = filteredCaseStudies.length > 0;

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "complete") {
      searchParams.delete("vue");
    } else {
      searchParams.set("vue", value);
    }
    setSearchParams(searchParams, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Track active section on scroll
  const handleScroll = useCallback(() => {
    const sectionEls = filteredSections.map((s) => document.getElementById(s.id));
    let current = "";
    for (const el of sectionEls) {
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) current = el.id;
      }
    }
    if (current !== activeSection) setActiveSection(current);
  }, [filteredSections, activeSection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Layout>
      <WhitepaperHero activeTab={activeTab} />

      {/* Tabs */}
      <div className="container mx-auto px-4 print:hidden">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
          <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 bg-muted/50">
            <TabsTrigger value="client" className="text-xs sm:text-sm">
              Pour les Clients
            </TabsTrigger>
            <TabsTrigger value="partenaire" className="text-xs sm:text-sm">
              Pour les Partenaires
            </TabsTrigger>
            <TabsTrigger value="complete" className="text-xs sm:text-sm">
              Document Complet
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key Stats Banner */}
      <div className="container mx-auto px-4 mb-12">
        <WhitepaperStats stats={keyStats} />
      </div>

      <Separator className="mb-8" />

      {/* Main Content: TOC + Sections */}
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* TOC Sidebar */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <WhitepaperTableOfContents
              sections={filteredSections}
              activeSection={activeSection}
              hasCaseStudies={hasCaseStudies}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Mobile TOC */}
            <div className="lg:hidden">
              <WhitepaperTableOfContents
                sections={filteredSections}
                activeSection={activeSection}
                hasCaseStudies={hasCaseStudies}
              />
            </div>

            {filteredSections.map((section) => {
              // Render case studies inline after the "etudes-de-cas" section
              if (section.id === "etudes-de-cas") {
                return (
                  <div key={section.id}>
                    <WhitepaperSection section={section} />
                    {filteredCaseStudies.map((cs) => (
                      <WhitepaperCaseStudy key={cs.id} study={cs} />
                    ))}
                    <Separator className="mb-12" />
                  </div>
                );
              }
              return <WhitepaperSection key={section.id} section={section} />;
            })}

            <WhitepaperCTA activeTab={activeTab} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LivreBlanc;
