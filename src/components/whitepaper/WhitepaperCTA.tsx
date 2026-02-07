import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhitepaperCTAProps {
  activeTab: string;
}

const WhitepaperCTA = ({ activeTab }: WhitepaperCTAProps) => {
  const isPartner = activeTab === "partenaire";

  return (
    <section className="py-16 text-center print:hidden">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          {isPartner
            ? "Prêt à rejoindre le réseau FlowRide ?"
            : "Prêt à simplifier votre mobilité ?"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {isPartner
            ? "Soumettez votre candidature et accédez à une clientèle institutionnelle premium. Notre équipe vous contacte sous 48h."
            : "Demandez un devis personnalisé et découvrez comment FlowRide peut transformer la gestion de votre flotte."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={isPartner ? "/partenaires/candidature" : "/clients/devis"}>
            <Button
              size="lg"
              className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold"
            >
              {isPartner ? "Devenir Partenaire" : "Demander un Devis"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link to={isPartner ? "/partenaires/programme" : "/clients/offres"}>
            <Button size="lg" variant="outline" className="border-primary/50">
              {isPartner ? "Voir le Programme" : "Découvrir nos Offres"}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhitepaperCTA;
