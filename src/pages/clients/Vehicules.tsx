 import { useState } from "react";
 import { Link } from "react-router-dom";
 import { ArrowRight } from "lucide-react";
 import Layout from "@/components/layout/Layout";
 import { Button } from "@/components/ui/button";
 import VehicleCard from "@/components/vehicles/VehicleCard";
 import VehicleFilters from "@/components/vehicles/VehicleFilters";
 import { categories, vehicles } from "@/data/vehiclesData";
 
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
 
 
         <VehicleFilters
           categories={categories}
           activeCategory={activeCategory}
           onCategoryChange={setActiveCategory}
         />
 
       {/* Vehicles Grid */}
       <section className="py-16">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {filteredVehicles.map((vehicle) => (
                 <VehicleCard key={vehicle.id} vehicle={vehicle} />
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