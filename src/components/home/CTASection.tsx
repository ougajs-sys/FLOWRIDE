 import { Link } from "react-router-dom";
 import { ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const CTASection = () => {
   return (
     <section className="py-24">
       <div className="container mx-auto px-4">
         <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/30 rounded-3xl p-12 md:p-16 overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
           
           <div className="relative z-10 max-w-3xl mx-auto text-center">
             <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
               Prêt à Simplifier Votre
               <span className="text-gradient-gold"> Gestion de Flotte ?</span>
             </h2>
             <p className="text-lg text-muted-foreground mb-8">
               Rejoignez les institutions qui nous font confiance. 
               Demandez votre devis personnalisé en moins de 5 minutes.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/clients/devis">
                 <Button size="lg" className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold group min-w-[240px]">
                   Demander un Devis
                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
               <Link to="/clients/vehicules">
                 <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 min-w-[240px]">
                   Voir le Catalogue
                 </Button>
               </Link>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default CTASection;