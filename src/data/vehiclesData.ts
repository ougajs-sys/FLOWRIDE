 // Vehicle images
 import toyotaCamry from "@/assets/vehicles/toyota-camry.jpg";
 import mercedesEClass from "@/assets/vehicles/mercedes-e-class.jpg";
 import toyotaLandCruiser from "@/assets/vehicles/toyota-land-cruiser.jpg";
 import toyotaPrado from "@/assets/vehicles/toyota-prado.jpg";
 import mercedesSprinter from "@/assets/vehicles/mercedes-sprinter.jpg";
 import toyotaHiace from "@/assets/vehicles/toyota-hiace.jpg";
 import mercedesSClass from "@/assets/vehicles/mercedes-s-class.jpg";
 import bmw7Series from "@/assets/vehicles/bmw-7-series.jpg";
 
 export interface Vehicle {
   id: number;
   name: string;
   category: string;
   image: string;
   seats: number;
   transmission: string;
   fuel: string;
   features: string[];
   popular: boolean;
 }
 
 export interface Category {
   id: string;
   label: string;
 }
 
 export const categories: Category[] = [
   { id: "all", label: "Tous" },
   { id: "berline", label: "Berlines" },
   { id: "suv", label: "SUV" },
   { id: "minibus", label: "Minibus" },
   { id: "prestige", label: "Prestige" },
 ];
 
 export const vehicles: Vehicle[] = [
   {
     id: 1,
     name: "Toyota Camry",
     category: "berline",
     image: toyotaCamry,
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
     image: mercedesEClass,
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
     image: toyotaLandCruiser,
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
     image: toyotaPrado,
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
     image: mercedesSprinter,
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
     image: toyotaHiace,
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
     image: mercedesSClass,
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
     image: bmw7Series,
     seats: 4,
     transmission: "Automatique",
     fuel: "Hybride",
     features: ["Executive Lounge", "Écrans arrière", "Bar"],
     popular: true,
   },
 ];