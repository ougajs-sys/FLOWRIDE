 import Layout from "@/components/layout/Layout";
 import { Link } from "react-router-dom";
import { 
    ArrowRight, 
    TrendingUp, 
    Users, 
    Shield, 
    Award, 
    Banknote, 
    Headphones,
    CheckCircle,
    Car,
    BookOpen
  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
 
 const benefits = [
   {
     icon: TrendingUp,
     title: "Accès à une Clientèle Premium",
     description: "Connectez-vous directement aux grandes institutions : ONGs, ambassades, entreprises internationales à fort pouvoir d'achat.",
   },
   {
     icon: Banknote,
     title: "Revenus Réguliers",
     description: "Bénéficiez de contrats longue durée et de flux de revenus prévisibles grâce à notre portefeuille de clients fidèles.",
   },
   {
     icon: Shield,
     title: "Zéro Prospection",
     description: "Nous gérons l'acquisition client et la relation commerciale. Vous vous concentrez sur votre cœur de métier : la flotte.",
   },
   {
     icon: Users,
     title: "Support Dédié",
     description: "Un gestionnaire de compte FlowRide vous accompagne pour optimiser votre flotte et maximiser votre taux d'occupation.",
   },
   {
     icon: Award,
     title: "Label Qualité FlowRide",
     description: "Rejoignez un réseau certifié et bénéficiez de notre image de marque premium auprès des décideurs.",
   },
   {
     icon: Headphones,
     title: "Assistance 24/7",
     description: "Notre équipe opérationnelle gère les urgences et le backup, vous libérant des contraintes opérationnelles.",
   },
 ];
 
 const requirements = [
   "Flotte minimum de 5 véhicules en bon état",
   "Véhicules de moins de 5 ans (berlines, SUV ou minibus)",
   "Assurance tous risques à jour",
   "Capacité à fournir des chauffeurs professionnels",
   "Siège ou représentation à Abidjan",
   "Engagement à respecter la charte qualité FlowRide",
 ];
 
 const steps = [
   {
     number: "01",
     title: "Candidature",
     description: "Remplissez le formulaire avec les détails de votre agence et de votre flotte.",
   },
   {
     number: "02",
     title: "Évaluation",
     description: "Notre équipe examine votre dossier et effectue une inspection de vos véhicules.",
   },
   {
     number: "03",
     title: "Certification",
     description: "Après validation, vos véhicules sont certifiés et intégrés au catalogue FlowRide.",
   },
   {
     number: "04",
     title: "Lancement",
     description: "Recevez vos premières réservations et commencez à développer votre activité.",
   },
 ];
 
 const Programme = () => {
   return (
     <Layout>
       {/* Hero */}
       <section className="pt-16 pb-20 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
         <div className="container mx-auto px-4 text-center relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
             <Car className="w-4 h-4 text-primary" />
             <span className="text-sm font-medium text-primary">Programme Partenaires</span>
           </div>
           <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
             Développez votre activité avec{" "}
             <span className="text-gradient-gold">FlowRide</span>
           </h1>
           <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl mb-10">
             Rejoignez notre réseau de partenaires certifiés et accédez à une clientèle 
             institutionnelle premium sans effort commercial.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/partenaires/candidature">
               <Button size="lg" className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold">
                 Devenir Partenaire
                 <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
             </Link>
             <a href="#avantages">
               <Button size="lg" variant="outline" className="border-primary/50">
                 Découvrir les avantages
               </Button>
             </a>
           </div>
         </div>
       </section>
 
       {/* Benefits */}
       <section id="avantages" className="py-20">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
               Pourquoi rejoindre <span className="text-gradient-gold">FlowRide</span> ?
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               Des avantages concrets pour faire croître votre activité de location de flotte.
             </p>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {benefits.map((benefit, index) => (
               <div
                 key={index}
                 className="group p-6 bg-card border border-border rounded-2xl hover:border-primary/50 transition-all"
               >
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                   <benefit.icon className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="font-display text-xl font-bold mb-2">{benefit.title}</h3>
                 <p className="text-muted-foreground">{benefit.description}</p>
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* How it works */}
       <section className="py-20 bg-muted/30">
         <div className="container mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
               Comment ça <span className="text-gradient-gold">fonctionne</span> ?
             </h2>
             <p className="text-muted-foreground max-w-2xl mx-auto">
               Un processus simple en 4 étapes pour intégrer notre réseau de partenaires.
             </p>
           </div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {steps.map((step, index) => (
               <div key={index} className="relative">
                 <div className="text-6xl font-display font-bold text-primary/20 mb-4">
                   {step.number}
                 </div>
                 <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                 <p className="text-muted-foreground">{step.description}</p>
                 {index < steps.length - 1 && (
                   <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                 )}
               </div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Requirements */}
       <section className="py-20">
         <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
               <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                 Critères <span className="text-gradient-gold">d'éligibilité</span>
               </h2>
               <p className="text-muted-foreground">
                 Pour garantir la qualité de notre réseau, nous recherchons des partenaires répondant à ces critères.
               </p>
             </div>
 
             <div className="bg-card border border-border rounded-2xl p-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {requirements.map((req, index) => (
                   <div key={index} className="flex items-start gap-3">
                     <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                     <span className="text-muted-foreground">{req}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>
 
        {/* Livre Blanc Banner */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <Link
              to="/livre-blanc?vue=partenaire"
              className="block bg-card border border-primary/20 rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all group"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <Badge variant="outline" className="border-primary/50 text-primary mb-3">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                    Livre Blanc 2026
                  </Badge>
                  <h3 className="font-display text-xl font-bold">
                    Comprendre le modèle FlowRide en détail
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Modèle économique, partage de revenus, études de cas partenaires et vision de croissance.
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Prêt à rejoindre le réseau ?
            </h2>
           <p className="text-muted-foreground max-w-xl mx-auto mb-10">
             Soumettez votre candidature dès maintenant et notre équipe vous contactera 
             sous 48h pour discuter de votre intégration.
           </p>
           <Link to="/partenaires/candidature">
             <Button size="lg" className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold">
               Postuler Maintenant
               <ArrowRight className="w-5 h-5 ml-2" />
             </Button>
           </Link>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Programme;