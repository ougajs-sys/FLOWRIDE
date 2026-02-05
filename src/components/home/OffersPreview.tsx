 import { Link } from "react-router-dom";
 import { ArrowRight, Zap, Calendar, Crown } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const offers = [
   {
     icon: Zap,
     title: "À la Demande",
     description: "Location ponctuelle pour vos besoins occasionnels. Réservation rapide, sans engagement.",
     features: ["Réservation en 24h", "Durée flexible", "Sans engagement"],
     highlighted: false,
   },
   {
     icon: Calendar,
     title: "Contrat Annuel",
     description: "Tarifs préférentiels pour vos besoins récurrents. Flotte dédiée à votre organisation.",
     features: ["Tarifs négociés", "Véhicules dédiés", "Priority support"],
     highlighted: true,
   },
   {
     icon: Crown,
     title: "Full Management",
     description: "Externalisation complète de votre flotte. On s'occupe de tout.",
     features: ["Gestion complète", "Optimisation coûts", "Reporting mensuel"],
     highlighted: false,
   },
 ];
 
 const OffersPreview = () => {
   return (
     <section className="py-24">
       <div className="container mx-auto px-4">
         {/* Section header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
             Des Offres Adaptées à
             <span className="text-gradient-gold"> Vos Besoins</span>
           </h2>
           <p className="text-muted-foreground">
             Que vous ayez besoin d'un véhicule pour une mission ou d'une flotte complète,
             nous avons la solution.
           </p>
         </div>
         
         {/* Offers grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
           {offers.map((offer) => (
             <div
               key={offer.title}
               className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                 offer.highlighted
                   ? "bg-gradient-gold text-primary-foreground shadow-gold"
                   : "bg-card border border-border hover:border-primary/50"
               }`}
             >
               {offer.highlighted && (
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background text-primary text-xs font-semibold px-3 py-1 rounded-full">
                   Populaire
                 </div>
               )}
               
               {/* Icon */}
               <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                 offer.highlighted ? "bg-primary-foreground/20" : "bg-primary/10"
               }`}>
                 <offer.icon className={`w-7 h-7 ${offer.highlighted ? "text-primary-foreground" : "text-primary"}`} />
               </div>
               
               {/* Content */}
               <h3 className="font-display text-2xl font-bold mb-3">{offer.title}</h3>
               <p className={`text-sm mb-6 ${offer.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                 {offer.description}
               </p>
               
               {/* Features */}
               <ul className="space-y-2 mb-8">
                 {offer.features.map((feature) => (
                   <li key={feature} className="flex items-center gap-2 text-sm">
                     <span className={`w-1.5 h-1.5 rounded-full ${offer.highlighted ? "bg-primary-foreground" : "bg-primary"}`} />
                     {feature}
                   </li>
                 ))}
               </ul>
               
               {/* CTA */}
               <Link to="/clients/offres">
                 <Button
                   variant={offer.highlighted ? "secondary" : "outline"}
                   className={`w-full group ${offer.highlighted ? "" : "border-primary/50 hover:bg-primary/10"}`}
                 >
                   En savoir plus
                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default OffersPreview;