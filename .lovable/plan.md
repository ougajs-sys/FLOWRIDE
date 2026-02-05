

## FlowRide B2B - Plateforme de Location de Flotte Premium

### 🎯 Vision du Projet
Plateforme d'intermédiation B2B connectant les **clients institutionnels** (ONGs, ambassades, entreprises internationales) aux **agences partenaires** locales, sous la marque unique FlowRide avec garantie de qualité.

---

### 🎨 Identité Visuelle
- **Style** : Premium/Luxe avec fond noir profond et accents dorés
- **Typographie** : Élégante et professionnelle
- **Objectif** : Inspirer confiance aux institutions internationales

---

### 📱 PARTIE PUBLIQUE

#### Page d'Accueil (/)
- Hero section impactante avec double entrée claire : "Je suis un client" / "Je suis une agence"
- Les 5 piliers de qualité FlowRide (Certification, Chauffeurs formés, Backup 2h, Account Manager, Facturation)
- Aperçu des offres et témoignages clients
- Call-to-action vers demande de devis

#### Espace Clients (/clients/*)
- **Nos Offres** : 3 formules (À la demande, Contrat annuel, Full Management)
- **Catalogue Véhicules** : Galerie filtrable par catégorie (berline, SUV, minibus)
- **Demande de Devis** : Formulaire complet avec besoins, durée, budget estimé

#### Espace Partenaires (/partenaires/*)
- **Programme Partenaire** : Avantages de rejoindre le réseau FlowRide
- **Devenir Partenaire** : Formulaire de candidature pour les agences

---

### 🔐 BACK-OFFICE ADMIN (/admin/*)
*Accès protégé par authentification*

#### Dashboard
- KPIs clés : prospects en cours, véhicules actifs, devis en attente
- Activité récente et alertes

#### CRM - Gestion Prospects
- Pipeline visuel des prospects clients ET candidatures partenaires
- Suivi des interactions et statuts (Nouveau → Qualifié → Devis envoyé → Signé)

#### Gestion Véhicules
- Catalogue centralisé de tous les véhicules des partenaires
- Fiche véhicule : photos, caractéristiques, statut inspection, disponibilité
- Attribution à une agence partenaire (invisible pour le client)

#### Gestion Agences Partenaires
- Liste des agences du réseau
- Statut de certification et véhicules associés

#### Gestion Devis
- Liste des demandes de devis reçues
- Générateur de devis PDF professionnel aux couleurs FlowRide
- Suivi des devis (envoyé, accepté, refusé)

---

### 🗄️ BASE DE DONNÉES (Supabase)
- **Prospects** : demandes de devis clients
- **Partenaires** : agences candidates et certifiées
- **Véhicules** : catalogue centralisé avec lien agence
- **Devis** : historique et statuts
- **Utilisateurs Admin** : authentification back-office

---

### 📋 Ce qui est prévu pour plus tard (V2)
- Espace client connecté (suivi contrats, factures)
- Espace agence partenaire (gestion de leur flotte)
- Notifications automatiques et rappels

