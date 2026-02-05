 import { useState } from "react";
 import Layout from "@/components/layout/Layout";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { Send, Building2, Mail, Phone, MapPin, Calendar, Car, Users, FileText } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Label } from "@/components/ui/label";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form";
 import { useToast } from "@/hooks/use-toast";
 
 const devisSchema = z.object({
   // Organisation
   organisationName: z.string().trim().min(2, "Nom requis").max(100),
   organisationType: z.string().min(1, "Type requis"),
   sector: z.string().min(1, "Secteur requis"),
   // Contact
   contactName: z.string().trim().min(2, "Nom requis").max(100),
   contactEmail: z.string().trim().email("Email invalide").max(255),
   contactPhone: z.string().trim().min(8, "Téléphone requis").max(20),
   contactRole: z.string().trim().max(100).optional(),
   // Besoins
   vehicleType: z.string().min(1, "Type de véhicule requis"),
   vehicleCount: z.string().min(1, "Nombre requis"),
   duration: z.string().min(1, "Durée requise"),
   startDate: z.string().optional(),
   location: z.string().trim().max(200).optional(),
   // Details
   needs: z.string().trim().max(1000).optional(),
   budget: z.string().optional(),
   offer: z.string().optional(),
 });
 
 type DevisFormData = z.infer<typeof devisSchema>;
 
 const Devis = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { toast } = useToast();
 
   const form = useForm<DevisFormData>({
     resolver: zodResolver(devisSchema),
     defaultValues: {
       organisationName: "",
       organisationType: "",
       sector: "",
       contactName: "",
       contactEmail: "",
       contactPhone: "",
       contactRole: "",
       vehicleType: "",
       vehicleCount: "",
       duration: "",
       startDate: "",
       location: "",
       needs: "",
       budget: "",
       offer: "",
     },
   });
 
   const onSubmit = async (data: DevisFormData) => {
     setIsSubmitting(true);
     // Simulate API call
     await new Promise((resolve) => setTimeout(resolve, 1500));
     setIsSubmitting(false);
     toast({
       title: "Demande envoyée !",
       description: "Notre équipe vous contactera dans les 24h.",
     });
     form.reset();
   };
 
   return (
     <Layout>
       {/* Hero */}
       <section className="pt-16 pb-12 bg-gradient-to-b from-primary/5 to-transparent">
         <div className="container mx-auto px-4 text-center">
           <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
             Demande de <span className="text-gradient-gold">Devis</span>
           </h1>
           <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
             Remplissez ce formulaire et recevez une proposition personnalisée 
             sous 24 heures ouvrées.
           </p>
         </div>
       </section>
 
       {/* Form */}
       <section className="py-16">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto">
             <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                 {/* Organisation Section */}
                 <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <Building2 className="w-5 h-5 text-primary" />
                     </div>
                     <h2 className="font-display text-xl font-bold">Votre Organisation</h2>
                   </div>
 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                       control={form.control}
                       name="organisationName"
                       render={({ field }) => (
                         <FormItem className="md:col-span-2">
                           <FormLabel>Nom de l'organisation *</FormLabel>
                           <FormControl>
                             <Input placeholder="Ex: Ambassade de France" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="organisationType"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Type d'organisation *</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="ong">ONG / Association</SelectItem>
                               <SelectItem value="ambassade">Ambassade / Consulat</SelectItem>
                               <SelectItem value="institution">Institution internationale</SelectItem>
                               <SelectItem value="entreprise">Entreprise privée</SelectItem>
                               <SelectItem value="gouvernement">Gouvernement / Ministère</SelectItem>
                               <SelectItem value="autre">Autre</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="sector"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Secteur d'activité *</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="humanitaire">Humanitaire</SelectItem>
                               <SelectItem value="developpement">Développement</SelectItem>
                               <SelectItem value="sante">Santé</SelectItem>
                               <SelectItem value="education">Éducation</SelectItem>
                               <SelectItem value="finance">Finance / Banque</SelectItem>
                               <SelectItem value="energie">Énergie / Mines</SelectItem>
                               <SelectItem value="telecom">Télécoms / Tech</SelectItem>
                               <SelectItem value="autre">Autre</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                   </div>
                 </div>
 
                 {/* Contact Section */}
                 <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <Mail className="w-5 h-5 text-primary" />
                     </div>
                     <h2 className="font-display text-xl font-bold">Contact Principal</h2>
                   </div>
 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                       control={form.control}
                       name="contactName"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Nom complet *</FormLabel>
                           <FormControl>
                             <Input placeholder="Prénom Nom" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="contactRole"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Fonction</FormLabel>
                           <FormControl>
                             <Input placeholder="Ex: Responsable Logistique" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="contactEmail"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Email professionnel *</FormLabel>
                           <FormControl>
                             <Input type="email" placeholder="email@organisation.org" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="contactPhone"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Téléphone *</FormLabel>
                           <FormControl>
                             <Input type="tel" placeholder="+225 07 00 00 00 00" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                   </div>
                 </div>
 
                 {/* Needs Section */}
                 <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <Car className="w-5 h-5 text-primary" />
                     </div>
                     <h2 className="font-display text-xl font-bold">Vos Besoins</h2>
                   </div>
 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FormField
                       control={form.control}
                       name="vehicleType"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Type de véhicule *</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="berline">Berline</SelectItem>
                               <SelectItem value="suv">SUV / 4x4</SelectItem>
                               <SelectItem value="minibus">Minibus</SelectItem>
                               <SelectItem value="prestige">Véhicule prestige</SelectItem>
                               <SelectItem value="mixte">Flotte mixte</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="vehicleCount"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Nombre de véhicules *</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="1">1 véhicule</SelectItem>
                               <SelectItem value="2-3">2-3 véhicules</SelectItem>
                               <SelectItem value="4-5">4-5 véhicules</SelectItem>
                               <SelectItem value="6-10">6-10 véhicules</SelectItem>
                               <SelectItem value="10+">Plus de 10</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="duration"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Durée estimée *</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="ponctuel">Ponctuel (quelques jours)</SelectItem>
                               <SelectItem value="1-mois">Moins d'un mois</SelectItem>
                               <SelectItem value="1-3-mois">1 à 3 mois</SelectItem>
                               <SelectItem value="3-6-mois">3 à 6 mois</SelectItem>
                               <SelectItem value="6-12-mois">6 à 12 mois</SelectItem>
                               <SelectItem value="12-plus">Plus de 12 mois</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="startDate"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Date de début souhaitée</FormLabel>
                           <FormControl>
                             <Input type="date" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="location"
                       render={({ field }) => (
                         <FormItem className="md:col-span-2">
                           <FormLabel>Zone d'utilisation principale</FormLabel>
                           <FormControl>
                             <Input placeholder="Ex: Abidjan et périphérie, déplacements régionaux..." {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="offer"
                       render={({ field }) => (
                         <FormItem className="md:col-span-2">
                           <FormLabel>Offre qui vous intéresse</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner (optionnel)" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="demande">À la Demande</SelectItem>
                               <SelectItem value="annuel">Contrat Annuel</SelectItem>
                               <SelectItem value="fullmanagement">Full Management</SelectItem>
                               <SelectItem value="ne-sais-pas">Je ne sais pas encore</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                   </div>
                 </div>
 
                 {/* Details Section */}
                 <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <FileText className="w-5 h-5 text-primary" />
                     </div>
                     <h2 className="font-display text-xl font-bold">Informations Complémentaires</h2>
                   </div>
 
                   <div className="space-y-6">
                     <FormField
                       control={form.control}
                       name="budget"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Budget estimé (optionnel)</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Sélectionner une fourchette" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="moins-5m">Moins de 5 millions FCFA/mois</SelectItem>
                               <SelectItem value="5-10m">5-10 millions FCFA/mois</SelectItem>
                               <SelectItem value="10-20m">10-20 millions FCFA/mois</SelectItem>
                               <SelectItem value="20-50m">20-50 millions FCFA/mois</SelectItem>
                               <SelectItem value="plus-50m">Plus de 50 millions FCFA/mois</SelectItem>
                               <SelectItem value="ne-sais-pas">Je ne sais pas encore</SelectItem>
                             </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
 
                     <FormField
                       control={form.control}
                       name="needs"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Détails supplémentaires</FormLabel>
                           <FormControl>
                             <Textarea
                               placeholder="Décrivez vos besoins spécifiques, contraintes particulières, questions..."
                               className="min-h-[120px] resize-none"
                               {...field}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                   </div>
                 </div>
 
                 {/* Submit */}
                 <div className="text-center">
                   <Button
                     type="submit"
                     size="lg"
                     className="bg-gradient-gold hover:opacity-90 text-primary-foreground shadow-gold min-w-[200px]"
                     disabled={isSubmitting}
                   >
                     {isSubmitting ? (
                       "Envoi en cours..."
                     ) : (
                       <>
                         <Send className="w-4 h-4 mr-2" />
                         Envoyer ma Demande
                       </>
                     )}
                   </Button>
                   <p className="text-sm text-muted-foreground mt-4">
                     Nous vous répondrons sous 24 heures ouvrées.
                   </p>
                 </div>
               </form>
             </Form>
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Devis;