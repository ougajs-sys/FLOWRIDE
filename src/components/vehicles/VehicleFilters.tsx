 import { Filter } from "lucide-react";
 import { cn } from "@/lib/utils";
 import type { Category } from "@/data/vehiclesData";
 
 interface VehicleFiltersProps {
   categories: Category[];
   activeCategory: string;
   onCategoryChange: (categoryId: string) => void;
 }
 
 const VehicleFilters = ({
   categories,
   activeCategory,
   onCategoryChange,
 }: VehicleFiltersProps) => {
   return (
     <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-40">
       <div className="container mx-auto px-4">
         <div className="flex items-center gap-4 overflow-x-auto pb-2">
           <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
           {categories.map((cat) => (
             <button
               key={cat.id}
               onClick={() => onCategoryChange(cat.id)}
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
   );
 };
 
 export default VehicleFilters;