 import { useState } from "react";
 import Layout from "@/components/layout/Layout";
 import { Link } from "react-router-dom";
 import { ArrowRight, Users, Fuel, Settings, Filter } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { cn } from "@/lib/utils";
 
 const categories = [
   { id: "all", label: "Tous" },
   { id: "berline", label: "Berlines" },
   { id: "suv", label: "SUV" },
   { id: "minibus", label: "Minibus" },
   { id: "prestige", label: "Prestige" },
 ];
 
 const vehicles = [
   {
     id: 1,
     name: "Toyota Camry",
     category: "berline",
     image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&auto=format&fit=crop&q=60",
     seats: 4,
     transmission: "Automatique",
     fuel: "Essence",
     features: ["Climatisation", "GPS", "Bluetooth"],
     popular: true,
   },
   {
     id: 2,
     name: "Mercedes Classe E",
     category: "berline",
     image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=60",
     seats: 4,
     transmission: "Automatique",
     fuel: "Diesel",
     features: ["Cuir", "Toit ouvrant", "Sièges chauffants"],
     popular: false,
   },
   {
     id: 3,
     name: "Toyota Land Cruiser",
     category: "suv",
     image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&auto=format&fit=crop&q=60",
     seats: 7,
     transmission: "Automatique",
     fuel: "Diesel",
     features: ["4x4", "Blindé disponible", "Climatisation zone"],
     popular: true,
   },
   {
     id: 4,
     name: "Toyota Prado",
     category: "suv",
     image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=60",
     seats: 7,
     transmission: "Automatique",
     fuel: "Diesel",
     features: ["4x4", "GPS", "Caméra de recul"],
     popular: false,
   },
   {
     id: 5,
     name: "Mercedes Sprinter",
     category: "minibus",
     image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=60",
     seats: 15,
     transmission: "Manuelle",
     fuel: "Diesel",
     features: ["Climatisation", "Bagages", "USB"],
     popular: false,
   },
   {
     id: 6,
     name: "Toyota Hiace",
     category: "minibus",
     image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=60",
     seats: 12,
     transmission: "Manuelle",
     fuel: "Diesel",
     features: ["Climatisation", "Grand espace", "Confortable"],
     popular: true,
   },
   {
     id: 7,
     name: "Mercedes Classe S",
     category: "prestige",
     image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&auto=format&fit=crop&q=60",
     seats: 4,
     transmission: "Automatique",
     fuel: "Essence",
     features: ["Luxe intégral", "Massage", "Champagne"],
     popular: false,
   },
   {
     id: 8,
     name: "BMW Série 7",
     category: "prestige",
     image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=60",
     seats: 4,
     transmission: "Automatique",
     fuel: "Hybride",
     features: ["Executive Lounge", "Écrans arrière", "Bar"],
     popular: true,
   },
 ];
 
 const Vehicules = () => {
   const [activeCategory, setActiveCategory] = useState("all");
 
   const filteredVehicles =
     activeCategory === "all"
       ? vehicles
       : vehicles.filter((v) => v.category === activeCategory);
 
   return (
     <Layout>
       {/* Hero */}
       <section className="pt-16 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
         <div className="container mx-auto px-4 text-center">
           <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
             Notre <span className="text-gradient-gold">Flotte</span>
           </h1>
           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
             Des véhicules premium, entretenus et inspectés, pour répondre 
             à tous vos besoins de mobilité professionnelle.
           </p>
         </div>
       </section>
 
       {/* Filters */}
       <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
         <div className="container mx-auto px-4">
           <div className="flex items-center gap-4 overflow-x-auto pb-2">
             <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveCategory(cat.id)}
                 className={cn(
                   "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                   activeCategory === cat.id
                     ? "bg-primary text-primary-foreground"
                     : "bg-muted hover:bg-muted/80 text-muted-foreground"
                 )}
               >
                 {cat.label}
               </button>
             ))}
           </div>
         </div>
       </section>
 
       {/* Vehicles Grid */}
       <section className="py-16">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredVehicles.map((vehicle) => (
               <div
                 key={vehicle.id}
                 className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1"
               >
                 {/* Image */}
                 <div className="relative aspect-[4/3] overflow-hidden">
                   <img
                     src={vehicle.image}
                     alt={vehicle.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   {vehicle.popular && (
                     <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                       Populaire
                     </Badge>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
 
                 {/* Content */}
                 <div className="p-5">
                   <div className="flex items-start justify-between mb-3">
                     <div>
                       <h3 className="font-display text-lg font-bold">{vehicle.name}</h3>
                       <p className="text-sm text-muted-foreground capitalize">
                         {vehicle.category}
                       </p>
                     </div>
                   </div>
 
                   {/* Specs */}
                   <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                     <span className="flex items-center gap-1">
                       <Users className="w-4 h-4" />
                       {vehicle.seats}
                     </span>
                     <span className="flex items-center gap-1">
                       <Settings className="w-4 h-4" />
                       {vehicle.transmission}
                     </span>
                     <span className="flex items-center gap-1">
                       <Fuel className="w-4 h-4" />
                       {vehicle.fuel}
                     </span>
                   </div>
 
                   {/* Features */}
                   <div className="flex flex-wrap gap-1.5 mb-4">
                     {vehicle.features.slice(0, 3).map((feature) => (
                       <span
                         key={feature}
                         className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                       >
                         {feature}
                       </span>
                     ))}
                   </div>
 
                   {/* CTA */}
                   <Link to="/clients/devis">
                     <Button
                       variant="outline"
                       className="w-full border-primary/50 hover:bg-primary/10 group/btn"
                       size="sm"
                     >
                       Demander un Devis
                       <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                     </Button>
                   </Link>
                 </div>
               </div>
             ))}
           </div>
 
           {filteredVehicles.length === 0 && (
             <div className="text-center py-16">
               <p className="text-muted-foreground">
                 Aucun véhicule trouvé dans cette catégorie.
               </p>
             </div>
           )}
         </div>
       </section>
 
       {/* CTA Section */}
       <section className="py-16 bg-muted/30">
         <div className="container mx-auto px-4 text-center">
           <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
             Vous ne trouvez pas ce que vous cherchez ?
           </h2>
           <p className="text-muted-foreground max-w-xl mx-auto mb-8">
             Notre réseau de partenaires nous permet d'accéder à une large gamme 
             de véhicules. Contactez-nous pour des besoins spécifiques.
           </p>
           <Link to="/clients/devis">
             <Button className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold">
               Demander un Devis Personnalisé
               <ArrowRight className="w-4 h-4 ml-2" />
             </Button>
           </Link>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Vehicules;