 import { Quote } from "lucide-react";
 
 const testimonials = [
   {
     quote: "FlowRide a transformé notre gestion de flotte. Un seul interlocuteur, une qualité constante, des factures simplifiées. Exactement ce dont nous avions besoin.",
     author: "Marie Dupont",
     role: "Directrice Logistique",
     company: "ONG Internationale",
   },
   {
     quote: "Le backup garanti en 2h nous a sauvés plusieurs fois lors de missions critiques. La fiabilité de FlowRide est incomparable.",
     author: "Jean-Pierre Martin",
     role: "Responsable Opérations",
     company: "Ambassade de France",
   },
   {
     quote: "En tant qu'agence partenaire, rejoindre le réseau FlowRide nous a ouvert l'accès à des clients que nous n'aurions jamais pu atteindre seuls.",
     author: "Ahmed Benali",
     role: "Directeur",
     company: "Premium Auto Services",
   },
 ];
 
 const Testimonials = () => {
   return (
     <section className="py-24 bg-card">
       <div className="container mx-auto px-4">
         {/* Section header */}
         <div className="text-center max-w-2xl mx-auto mb-16">
           <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
             Ce Que Disent
             <span className="text-gradient-gold"> Nos Clients</span>
           </h2>
           <p className="text-muted-foreground">
             Découvrez pourquoi les institutions internationales nous font confiance.
           </p>
         </div>
         
         {/* Testimonials grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {testimonials.map((testimonial, index) => (
             <div
               key={index}
               className="relative bg-background border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors"
             >
               {/* Quote icon */}
               <Quote className="w-10 h-10 text-primary/20 mb-4" />
               
               {/* Quote text */}
               <p className="text-muted-foreground mb-6 italic">
                 "{testimonial.quote}"
               </p>
               
               {/* Author */}
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                   <span className="text-primary-foreground font-semibold">
                     {testimonial.author.split(" ").map(n => n[0]).join("")}
                   </span>
                 </div>
                 <div>
                   <p className="font-semibold">{testimonial.author}</p>
                   <p className="text-sm text-muted-foreground">
                     {testimonial.role}, {testimonial.company}
                   </p>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default Testimonials;