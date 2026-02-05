 import { Link } from "react-router-dom";
 import { ArrowRight, Building2, Users } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const HeroSection = () => {
   return (
     <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
       
       {/* Decorative elements */}
       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
       
       <div className="container mx-auto px-4 relative z-10">
         <div className="max-w-4xl mx-auto text-center">
           {/* Badge */}
           <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
             <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
             <span className="text-sm text-primary font-medium">Location de Flotte B2B Premium</span>
           </div>
           
           {/* Heading */}
           <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
             La Flotte Premium
             <br />
             <span className="text-gradient-gold">Pour Vos Institutions</span>
           </h1>
           
           {/* Subheading */}
           <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
             FlowRide connecte les <strong className="text-foreground">organisations internationales</strong> aux meilleures agences de location. 
             Une marque, une qualité garantie, zéro compromis.
           </p>
           
           {/* Dual CTA */}
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
             <Link to="/clients/devis">
               <Button size="lg" className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold group min-w-[240px]">
                 <Building2 className="w-5 h-5 mr-2" />
                 Je suis un Client
                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
             <Link to="/partenaires/rejoindre">
               <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 group min-w-[240px]">
                 <Users className="w-5 h-5 mr-2" />
                 Je suis une Agence
                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
           </div>
           
           {/* Trust badges */}
           <div className="mt-16 pt-8 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.4s" }}>
             <p className="text-sm text-muted-foreground mb-4">Ils nous font confiance</p>
             <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
               <span className="font-display text-lg">ONU</span>
               <span className="font-display text-lg">Croix-Rouge</span>
               <span className="font-display text-lg">Ambassade FR</span>
               <span className="font-display text-lg">MSF</span>
               <span className="font-display text-lg">UNICEF</span>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
 };
 
 export default HeroSection;