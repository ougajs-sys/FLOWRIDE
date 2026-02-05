 import { Link } from "react-router-dom";
 import { ArrowRight, Users, Fuel, Settings } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import type { Vehicle } from "@/data/vehiclesData";
 
 interface VehicleCardProps {
   vehicle: Vehicle;
 }
 
 const VehicleCard = ({ vehicle }: VehicleCardProps) => {
   return (
     <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1">
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
   );
 };
 
 export default VehicleCard;