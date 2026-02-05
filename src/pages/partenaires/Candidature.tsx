 import { useState } from "react";
 import Layout from "@/components/layout/Layout";
 import { Link } from "react-router-dom";
 import { ArrowLeft, Building2, Car, User, FileText, CheckCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import { 
   Select, 
   SelectContent, 
   SelectItem, 
   SelectTrigger, 
   SelectValue 
 } from "@/components/ui/select";
 import { Checkbox } from "@/components/ui/checkbox";
 import { useToast } from "@/hooks/use-toast";
 import { z } from "zod";
 
 const candidatureSchema = z.object({
   // Agence
   agencyName: z.string().trim().min(2, "Le nom de l'agence est requis").max(100),
   legalStatus: z.string().min(1, "Le statut juridique est requis"),
   registrationNumber: z.string().trim().min(2, "Le numéro d'enregistrement est requis").max(50),
   address: z.string().trim().min(5, "L'adresse est requise").max(200),
   city: z.string().trim().min(2, "La ville est requise").max(50),
   yearsInBusiness: z.string().min(1, "L'ancienneté est requise"),
   // Contact
   contactName: z.string().trim().min(2, "Le nom du contact est requis").max(100),
   contactRole: z.string().trim().min(2, "La fonction est requise").max(50),
   contactEmail: z.string().trim().email("Email invalide").max(255),
   contactPhone: z.string().trim().min(8, "Numéro de téléphone invalide").max(20),
   // Flotte
   fleetSize: z.string().min(1, "La taille de la flotte est requise"),
   vehicleTypes: z.array(z.string()).min(1, "Sélectionnez au moins un type de véhicule"),
   hasDrivers: z.string().min(1, "Cette information est requise"),
   // Motivation
   motivation: z.string().trim().min(50, "Minimum 50 caractères").max(1000),
   acceptTerms: z.boolean().refine(val => val === true, "Vous devez accepter les conditions"),
 });
 
 type CandidatureFormData = z.infer<typeof candidatureSchema>;
 
 const Candidature = () => {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [errors, setErrors] = useState<Partial<Record<keyof CandidatureFormData, string>>>({});
   
   const [formData, setFormData] = useState<CandidatureFormData>({
     agencyName: "",
     legalStatus: "",
     registrationNumber: "",
     address: "",
     city: "",
     yearsInBusiness: "",
     contactName: "",
     contactRole: "",
     contactEmail: "",
     contactPhone: "",
     fleetSize: "",
     vehicleTypes: [],
     hasDrivers: "",
     motivation: "",
     acceptTerms: false,
   });
 
   const vehicleTypeOptions = [
     { id: "berline", label: "Berlines" },
     { id: "suv", label: "SUV / 4x4" },
     { id: "minibus", label: "Minibus" },
     { id: "prestige", label: "Véhicules de prestige" },
   ];
 
   const handleInputChange = (field: keyof CandidatureFormData, value: string | boolean | string[]) => {
     setFormData(prev => ({ ...prev, [field]: value }));
     if (errors[field]) {
       setErrors(prev => ({ ...prev, [field]: undefined }));
     }
   };
 
   const handleVehicleTypeToggle = (typeId: string) => {
     const current = formData.vehicleTypes;
     const updated = current.includes(typeId)
       ? current.filter(t => t !== typeId)
       : [...current, typeId];
     handleInputChange("vehicleTypes", updated);
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setErrors({});
 
     const result = candidatureSchema.safeParse(formData);
     
     if (!result.success) {
       const fieldErrors: Partial<Record<keyof CandidatureFormData, string>> = {};
       result.error.errors.forEach(err => {
         const field = err.path[0] as keyof CandidatureFormData;
         fieldErrors[field] = err.message;
       });
       setErrors(fieldErrors);
       toast({
         title: "Erreur de validation",
         description: "Veuillez corriger les erreurs dans le formulaire.",
         variant: "destructive",
       });
       return;
     }
 
     setIsSubmitting(true);
     
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1500));
     
     setIsSubmitting(false);
     setIsSubmitted(true);
     toast({
       title: "Candidature envoyée !",
       description: "Notre équipe vous contactera sous 48h.",
     });
   };
 
   if (isSubmitted) {
     return (
       <Layout>
         <section className="py-20">
           <div className="container mx-auto px-4">
             <div className="max-w-xl mx-auto text-center">
               <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                 <CheckCircle className="w-10 h-10 text-primary" />
               </div>
               <h1 className="font-display text-3xl font-bold mb-4">
                 Candidature Reçue !
               </h1>
               <p className="text-muted-foreground mb-8">
                 Merci pour votre intérêt à rejoindre le réseau FlowRide. 
                 Notre équipe partenariats examinera votre dossier et vous 
                 contactera sous 48h pour les prochaines étapes.
               </p>
               <Link to="/">
                 <Button className="bg-gradient-gold hover:opacity-90 text-primary-foreground">
                   Retour à l'accueil
                 </Button>
               </Link>
             </div>
           </div>
         </section>
       </Layout>
     );
   }
 
   return (
     <Layout>
       {/* Header */}
       <section className="pt-12 pb-8 bg-gradient-to-b from-primary/5 to-transparent">
         <div className="container mx-auto px-4">
           <Link 
             to="/partenaires/programme" 
             className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
           >
             <ArrowLeft className="w-4 h-4" />
             Retour au programme
           </Link>
           <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
             Devenir <span className="text-gradient-gold">Partenaire</span>
           </h1>
           <p className="text-muted-foreground max-w-2xl">
             Complétez ce formulaire pour soumettre votre candidature. 
             Notre équipe vous contactera sous 48h.
           </p>
         </div>
       </section>
 
       {/* Form */}
       <section className="py-12">
         <div className="container mx-auto px-4">
           <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-10">
             
             {/* Section: Agence */}
             <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <Building2 className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-bold">Informations sur l'agence</h2>
               </div>
 
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2">
                   <Label htmlFor="agencyName">Nom de l'agence *</Label>
                   <Input
                     id="agencyName"
                     value={formData.agencyName}
                     onChange={(e) => handleInputChange("agencyName", e.target.value)}
                     placeholder="Ex: ABC Transport Services"
                     className={errors.agencyName ? "border-destructive" : ""}
                   />
                   {errors.agencyName && <p className="text-sm text-destructive mt-1">{errors.agencyName}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="legalStatus">Statut juridique *</Label>
                   <Select
                     value={formData.legalStatus}
                     onValueChange={(value) => handleInputChange("legalStatus", value)}
                   >
                     <SelectTrigger className={errors.legalStatus ? "border-destructive" : ""}>
                       <SelectValue placeholder="Sélectionnez" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="sarl">SARL</SelectItem>
                       <SelectItem value="sa">SA</SelectItem>
                       <SelectItem value="sas">SAS</SelectItem>
                       <SelectItem value="ei">Entreprise Individuelle</SelectItem>
                       <SelectItem value="other">Autre</SelectItem>
                     </SelectContent>
                   </Select>
                   {errors.legalStatus && <p className="text-sm text-destructive mt-1">{errors.legalStatus}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="registrationNumber">N° RCCM / Registre de commerce *</Label>
                   <Input
                     id="registrationNumber"
                     value={formData.registrationNumber}
                     onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                     placeholder="Ex: CI-ABJ-2020-B-12345"
                     className={errors.registrationNumber ? "border-destructive" : ""}
                   />
                   {errors.registrationNumber && <p className="text-sm text-destructive mt-1">{errors.registrationNumber}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="address">Adresse *</Label>
                   <Input
                     id="address"
                     value={formData.address}
                     onChange={(e) => handleInputChange("address", e.target.value)}
                     placeholder="Ex: Cocody, Rue des Jardins"
                     className={errors.address ? "border-destructive" : ""}
                   />
                   {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="city">Ville *</Label>
                   <Input
                     id="city"
                     value={formData.city}
                     onChange={(e) => handleInputChange("city", e.target.value)}
                     placeholder="Ex: Abidjan"
                     className={errors.city ? "border-destructive" : ""}
                   />
                   {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="yearsInBusiness">Années d'expérience *</Label>
                   <Select
                     value={formData.yearsInBusiness}
                     onValueChange={(value) => handleInputChange("yearsInBusiness", value)}
                   >
                     <SelectTrigger className={errors.yearsInBusiness ? "border-destructive" : ""}>
                       <SelectValue placeholder="Sélectionnez" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="0-2">Moins de 2 ans</SelectItem>
                       <SelectItem value="2-5">2 à 5 ans</SelectItem>
                       <SelectItem value="5-10">5 à 10 ans</SelectItem>
                       <SelectItem value="10+">Plus de 10 ans</SelectItem>
                     </SelectContent>
                   </Select>
                   {errors.yearsInBusiness && <p className="text-sm text-destructive mt-1">{errors.yearsInBusiness}</p>}
                 </div>
               </div>
             </div>
 
             {/* Section: Contact */}
             <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <User className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-bold">Contact principal</h2>
               </div>
 
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <Label htmlFor="contactName">Nom complet *</Label>
                   <Input
                     id="contactName"
                     value={formData.contactName}
                     onChange={(e) => handleInputChange("contactName", e.target.value)}
                     placeholder="Ex: Jean Kouassi"
                     className={errors.contactName ? "border-destructive" : ""}
                   />
                   {errors.contactName && <p className="text-sm text-destructive mt-1">{errors.contactName}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="contactRole">Fonction *</Label>
                   <Input
                     id="contactRole"
                     value={formData.contactRole}
                     onChange={(e) => handleInputChange("contactRole", e.target.value)}
                     placeholder="Ex: Directeur Général"
                     className={errors.contactRole ? "border-destructive" : ""}
                   />
                   {errors.contactRole && <p className="text-sm text-destructive mt-1">{errors.contactRole}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="contactEmail">Email professionnel *</Label>
                   <Input
                     id="contactEmail"
                     type="email"
                     value={formData.contactEmail}
                     onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                     placeholder="Ex: contact@agence.ci"
                     className={errors.contactEmail ? "border-destructive" : ""}
                   />
                   {errors.contactEmail && <p className="text-sm text-destructive mt-1">{errors.contactEmail}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="contactPhone">Téléphone *</Label>
                   <Input
                     id="contactPhone"
                     type="tel"
                     value={formData.contactPhone}
                     onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                     placeholder="Ex: +225 07 00 00 00 00"
                     className={errors.contactPhone ? "border-destructive" : ""}
                   />
                   {errors.contactPhone && <p className="text-sm text-destructive mt-1">{errors.contactPhone}</p>}
                 </div>
               </div>
             </div>
 
             {/* Section: Flotte */}
             <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <Car className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-bold">Votre flotte</h2>
               </div>
 
               <div className="space-y-6">
                 <div>
                   <Label htmlFor="fleetSize">Nombre de véhicules *</Label>
                   <Select
                     value={formData.fleetSize}
                     onValueChange={(value) => handleInputChange("fleetSize", value)}
                   >
                     <SelectTrigger className={errors.fleetSize ? "border-destructive" : ""}>
                       <SelectValue placeholder="Sélectionnez" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="5-10">5 à 10 véhicules</SelectItem>
                       <SelectItem value="10-20">10 à 20 véhicules</SelectItem>
                       <SelectItem value="20-50">20 à 50 véhicules</SelectItem>
                       <SelectItem value="50+">Plus de 50 véhicules</SelectItem>
                     </SelectContent>
                   </Select>
                   {errors.fleetSize && <p className="text-sm text-destructive mt-1">{errors.fleetSize}</p>}
                 </div>
 
                 <div>
                   <Label className="mb-3 block">Types de véhicules disponibles *</Label>
                   <div className="grid grid-cols-2 gap-3">
                     {vehicleTypeOptions.map((type) => (
                       <label
                         key={type.id}
                         className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                           formData.vehicleTypes.includes(type.id)
                             ? "border-primary bg-primary/5"
                             : "border-border hover:border-primary/50"
                         }`}
                       >
                         <Checkbox
                           checked={formData.vehicleTypes.includes(type.id)}
                           onCheckedChange={() => handleVehicleTypeToggle(type.id)}
                         />
                         <span className="text-sm">{type.label}</span>
                       </label>
                     ))}
                   </div>
                   {errors.vehicleTypes && <p className="text-sm text-destructive mt-1">{errors.vehicleTypes}</p>}
                 </div>
 
                 <div>
                   <Label htmlFor="hasDrivers">Disposez-vous de chauffeurs professionnels ? *</Label>
                   <Select
                     value={formData.hasDrivers}
                     onValueChange={(value) => handleInputChange("hasDrivers", value)}
                   >
                     <SelectTrigger className={errors.hasDrivers ? "border-destructive" : ""}>
                       <SelectValue placeholder="Sélectionnez" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="yes-all">Oui, pour tous les véhicules</SelectItem>
                       <SelectItem value="yes-some">Oui, pour certains véhicules</SelectItem>
                       <SelectItem value="no">Non, véhicules sans chauffeur uniquement</SelectItem>
                     </SelectContent>
                   </Select>
                   {errors.hasDrivers && <p className="text-sm text-destructive mt-1">{errors.hasDrivers}</p>}
                 </div>
               </div>
             </div>
 
             {/* Section: Motivation */}
             <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                   <FileText className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-bold">Motivation</h2>
               </div>
 
               <div className="space-y-6">
                 <div>
                   <Label htmlFor="motivation">
                     Pourquoi souhaitez-vous rejoindre FlowRide ? *
                   </Label>
                   <Textarea
                     id="motivation"
                     value={formData.motivation}
                     onChange={(e) => handleInputChange("motivation", e.target.value)}
                     placeholder="Décrivez votre motivation, votre expérience avec la clientèle institutionnelle, et ce que vous pouvez apporter au réseau FlowRide..."
                     rows={5}
                     className={errors.motivation ? "border-destructive" : ""}
                   />
                   <p className="text-xs text-muted-foreground mt-1">
                     {formData.motivation.length}/1000 caractères (minimum 50)
                   </p>
                   {errors.motivation && <p className="text-sm text-destructive mt-1">{errors.motivation}</p>}
                 </div>
 
                 <div className="flex items-start gap-3">
                   <Checkbox
                     id="acceptTerms"
                     checked={formData.acceptTerms}
                     onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                   />
                   <label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer">
                     J'accepte les conditions générales du programme partenaire et je certifie 
                     que les informations fournies sont exactes. *
                   </label>
                 </div>
                 {errors.acceptTerms && <p className="text-sm text-destructive">{errors.acceptTerms}</p>}
               </div>
             </div>
 
             {/* Submit */}
             <div className="flex justify-end">
               <Button
                 type="submit"
                 size="lg"
                 disabled={isSubmitting}
                 className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold"
               >
                 {isSubmitting ? "Envoi en cours..." : "Soumettre ma candidature"}
               </Button>
             </div>
           </form>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Candidature;