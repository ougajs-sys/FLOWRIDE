 import { Link } from "react-router-dom";
 
 const Footer = () => {
   return (
     <footer className="bg-card border-t border-border">
       <div className="container mx-auto px-4 py-16">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
           {/* Brand */}
           <div className="md:col-span-1">
             <Link to="/" className="flex items-center gap-2 mb-4">
               <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
                 <span className="text-primary-foreground font-display font-bold text-xl">F</span>
               </div>
               <span className="font-display text-2xl font-semibold">
                 Flow<span className="text-primary">Ride</span>
               </span>
             </Link>
             <p className="text-muted-foreground text-sm">
               Location de flotte premium pour entreprises et institutions internationales.
             </p>
           </div>
 
           {/* Clients */}
           <div>
             <h4 className="font-display text-lg font-semibold mb-4">Clients</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/clients/offres" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                   Nos Offres
                 </Link>
               </li>
               <li>
                 <Link to="/clients/vehicules" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                   Catalogue Véhicules
                 </Link>
               </li>
               <li>
                 <Link to="/clients/devis" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                   Demande de Devis
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Partenaires */}
           <div>
             <h4 className="font-display text-lg font-semibold mb-4">Partenaires</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/partenaires/programme" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                   Programme Partenaire
                 </Link>
               </li>
               <li>
                 <Link to="/partenaires/rejoindre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                   Devenir Partenaire
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Contact */}
           <div>
             <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
             <ul className="space-y-2 text-sm text-muted-foreground">
               <li>contact@flowride.com</li>
               <li>+33 1 23 45 67 89</li>
               <li>Paris, France</li>
             </ul>
           </div>
         </div>
 
         <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-sm text-muted-foreground">
             © {new Date().getFullYear()} FlowRide. Tous droits réservés.
           </p>
           <div className="flex items-center gap-6">
             <Link to="/mentions-legales" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               Mentions légales
             </Link>
             <Link to="/confidentialite" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               Confidentialité
             </Link>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;