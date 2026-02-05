 import { Shield, UserCheck, Clock, Headphones, FileText } from "lucide-react";
 
 const pillars = [
   {
     icon: Shield,
     title: "Certification 50 Points",
     description: "Chaque véhicule passe une inspection rigoureuse avant d'intégrer notre flotte.",
   },
   {
     icon: UserCheck,
     title: "Chauffeurs Formés",
     description: "Formation aux standards internationaux de service et de sécurité.",
   },
   {
     icon: Clock,
     title: "Backup Garanti 2h",
     description: "En cas de panne, un véhicule de remplacement sous 2 heures maximum.",
   },
   {
     icon: Headphones,
     title: "Account Manager Dédié",
     description: "Un interlocuteur unique pour toutes vos demandes et besoins spécifiques.",
   },
   {
     icon: FileText,
     title: "Facturation Centralisée",
     description: "Une seule facture mensuelle, simplifiez votre comptabilité.",
   },
 ];
 
 const QualityPillars = () => {
   return (
     <section className="py-24 bg-card">
       <div className="container mx-auto px-4">
         {/* Section header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
             Les 5 Piliers de la
             <span className="text-gradient-gold"> Qualité FlowRide</span>
           </h2>
           <p className="text-muted-foreground">
             Notre engagement qualité vous garantit une expérience sans faille, 
             quel que soit le partenaire qui fournit le véhicule.
           </p>
         </div>
         
         {/* Pillars grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
           {pillars.map((pillar, index) => (
             <div
               key={pillar.title}
               className="group relative bg-background border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
               style={{ animationDelay: `${index * 0.1}s` }}
             >
               {/* Icon */}
               <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                 <pillar.icon className="w-6 h-6 text-primary" />
               </div>
               
               {/* Content */}
               <h3 className="font-display text-lg font-semibold mb-2">
                 {pillar.title}
               </h3>
               <p className="text-sm text-muted-foreground">
                 {pillar.description}
               </p>
               
               {/* Hover effect */}
               <div className="absolute inset-0 border-2 border-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default QualityPillars;