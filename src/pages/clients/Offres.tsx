 import Layout from "@/components/layout/Layout";
 import { Link } from "react-router-dom";
 import { ArrowRight, Zap, Calendar, Crown, Check, Phone } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const offers = [
   {
     icon: Zap,
     title: "À la Demande",
     subtitle: "Flexibilité maximale",
     description: "Location ponctuelle pour vos besoins occasionnels. Réservation rapide, sans engagement long terme.",
     price: "Sur devis",
     priceNote: "Tarif selon durée et véhicule",
     features: [
       "Réservation en 24-48h",
       "Durée flexible (jour/semaine/mois)",
       "Sans engagement",
       "Véhicule avec chauffeur",
       "Assurance tous risques incluse",
       "Support client 7j/7",
     ],
     notIncluded: [
       "Tarifs préférentiels",
       "Véhicule dédié",
       "Account Manager",
     ],
     highlighted: false,
     cta: "Demander un Devis",
   },
   {
     icon: Calendar,
     title: "Contrat Annuel",
     subtitle: "Le plus populaire",
     description: "Tarifs préférentiels pour vos besoins récurrents. Flotte dédiée à votre organisation avec priority support.",
     price: "À partir de 15%",
     priceNote: "de réduction sur les tarifs standards",
     features: [
       "Tarifs négociés garantis",
       "Véhicules dédiés à votre organisation",
       "Priority support 24/7",
       "Facturation mensuelle consolidée",
       "Account Manager dédié",
       "Backup véhicule en 2h",
       "Chauffeurs formés et certifiés",
       "Reporting mensuel d'utilisation",
     ],
     notIncluded: [
       "Gestion complète de flotte",
     ],
     highlighted: true,
     cta: "Souscrire un Contrat",
   },
   {
     icon: Crown,
     title: "Full Management",
     subtitle: "Service Premium",
     description: "Externalisation complète de votre flotte. On s'occupe de tout : gestion, maintenance, optimisation.",
     price: "Sur mesure",
     priceNote: "Étude personnalisée de vos besoins",
     features: [
       "Tout le Contrat Annuel inclus",
       "Gestion complète de votre flotte",
       "Optimisation continue des coûts",
       "Reporting détaillé et analytics",
       "Intégration à vos outils (ERP, RH)",
       "Conseil stratégique mobilité",
       "SLA garanti avec pénalités",
       "Audit et certification annuelle",
     ],
     notIncluded: [],
     highlighted: false,
     cta: "Nous Contacter",
   },
 ];
 
 const Offres = () => {
   return (
     <Layout>
       {/* Hero */}
       <section className="pt-16 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
         <div className="container mx-auto px-4 text-center">
           <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
             Nos <span className="text-gradient-gold">Offres</span>
           </h1>
           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
             Des solutions adaptées à chaque besoin, de la location ponctuelle 
             à l'externalisation complète de votre flotte.
           </p>
         </div>
       </section>
 
       {/* Offers Grid */}
       <section className="py-16">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {offers.map((offer) => (
               <div
                 key={offer.title}
                 className={`relative rounded-2xl p-8 flex flex-col ${
                   offer.highlighted
                     ? "bg-gradient-gold text-primary-foreground shadow-gold scale-105 z-10"
                     : "bg-card border border-border"
                 }`}
               >
                 {offer.highlighted && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-primary text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">
                     Recommandé
                   </div>
                 )}
 
                 {/* Header */}
                 <div className="mb-6">
                   <div
                     className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                       offer.highlighted ? "bg-primary-foreground/20" : "bg-primary/10"
                     }`}
                   >
                     <offer.icon
                       className={`w-7 h-7 ${
                         offer.highlighted ? "text-primary-foreground" : "text-primary"
                       }`}
                     />
                   </div>
                   <p
                     className={`text-sm font-medium mb-1 ${
                       offer.highlighted ? "text-primary-foreground/80" : "text-primary"
                     }`}
                   >
                     {offer.subtitle}
                   </p>
                   <h2 className="font-display text-2xl font-bold">{offer.title}</h2>
                 </div>
 
                 {/* Price */}
                 <div className="mb-6">
                   <div className="font-display text-3xl font-bold">{offer.price}</div>
                   <p
                     className={`text-sm ${
                       offer.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
                     }`}
                   >
                     {offer.priceNote}
                   </p>
                 </div>
 
                 {/* Description */}
                 <p
                   className={`text-sm mb-6 ${
                     offer.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                   }`}
                 >
                   {offer.description}
                 </p>
 
                 {/* Features */}
                 <div className="flex-1">
                   <p
                     className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                       offer.highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
                     }`}
                   >
                     Inclus
                   </p>
                   <ul className="space-y-2 mb-6">
                     {offer.features.map((feature) => (
                       <li key={feature} className="flex items-start gap-2 text-sm">
                         <Check
                           className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                             offer.highlighted ? "text-primary-foreground" : "text-primary"
                           }`}
                         />
                         {feature}
                       </li>
                     ))}
                   </ul>
 
                   {offer.notIncluded.length > 0 && (
                     <>
                       <p
                         className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                           offer.highlighted
                             ? "text-primary-foreground/60"
                             : "text-muted-foreground"
                         }`}
                       >
                         Non inclus
                       </p>
                       <ul className="space-y-2 mb-6">
                         {offer.notIncluded.map((feature) => (
                           <li
                             key={feature}
                             className={`flex items-start gap-2 text-sm ${
                               offer.highlighted
                                 ? "text-primary-foreground/50"
                                 : "text-muted-foreground/70"
                             }`}
                           >
                             <span className="w-4 h-4 flex items-center justify-center">—</span>
                             {feature}
                           </li>
                         ))}
                       </ul>
                     </>
                   )}
                 </div>
 
                 {/* CTA */}
                 <Link to="/clients/devis" className="mt-auto">
                   <Button
                     variant={offer.highlighted ? "secondary" : "outline"}
                     className={`w-full group ${
                       offer.highlighted ? "" : "border-primary/50 hover:bg-primary/10"
                     }`}
                     size="lg"
                   >
                     {offer.cta}
                     <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                   </Button>
                 </Link>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Contact Section */}
       <section className="py-16 bg-muted/30">
         <div className="container mx-auto px-4 text-center">
           <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
             Besoin d'une offre <span className="text-gradient-gold">sur mesure</span> ?
           </h2>
           <p className="text-muted-foreground max-w-xl mx-auto mb-8">
             Notre équipe commerciale est à votre disposition pour étudier vos besoins 
             spécifiques et vous proposer une solution adaptée.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/clients/devis">
               <Button className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold">
                 Demander un Devis
                 <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </Link>
             <Button variant="outline" className="gap-2">
               <Phone className="w-4 h-4" />
               +225 07 00 00 00 00
             </Button>
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Offres;