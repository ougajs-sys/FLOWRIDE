export type Audience = "client" | "partenaire" | "all";

export interface WhitepaperStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface WhitepaperSubSection {
  title: string;
  content: string;
  items?: string[];
}

export interface CaseStudy {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  audience: Audience;
  metrics: WhitepaperStat[];
  story: string;
  quote?: string;
  quoteAuthor?: string;
}

export interface WhitepaperSection {
  id: string;
  number: string;
  title: string;
  audience: Audience;
  introduction: string;
  subsections: WhitepaperSubSection[];
  stats?: WhitepaperStat[];
  quote?: string;
  quoteAuthor?: string;
}

export const whitepaperMeta = {
  title: "Livre Blanc FlowRide B2B 2026",
  subtitle: "La mobilité institutionnelle réinventée en Afrique de l'Ouest",
  year: "2026",
  edition: "1ère Édition",
};

export const heroByAudience: Record<string, { title: string; description: string }> = {
  client: {
    title: "Votre partenaire mobilité de confiance",
    description:
      "Découvrez comment FlowRide simplifie la gestion de votre flotte avec un service premium, des garanties solides et un interlocuteur unique pour toute votre organisation.",
  },
  partenaire: {
    title: "Rejoignez le réseau leader de la location B2B",
    description:
      "Comprenez le modèle FlowRide, ses avantages pour votre agence et comment intégrer un réseau certifié pour accéder à une clientèle institutionnelle premium.",
  },
  complete: {
    title: "La mobilité institutionnelle réinventée",
    description:
      "Un document stratégique complet présentant la vision FlowRide, son modèle d'affaires, ses garanties qualité et sa feuille de route pour devenir le leader de la location B2B en Afrique de l'Ouest.",
  },
};

export const keyStats: WhitepaperStat[] = [
  { value: "500", label: "Milliards FCFA", suffix: "+", },
  { value: "200", label: "Organisations internationales à Abidjan", suffix: "+", },
  { value: "50", label: "Points de contrôle qualité" },
  { value: "2", label: "Heures — Délai backup garanti", suffix: "h" },
];

export const sections: WhitepaperSection[] = [
  {
    id: "resume-executif",
    number: "01",
    title: "Résumé Exécutif",
    audience: "all",
    introduction:
      "L'Afrique de l'Ouest connaît une croissance économique sans précédent. Abidjan, hub régional en pleine expansion, accueille un nombre croissant d'organisations internationales, d'ONGs, d'ambassades et d'entreprises multinationales. Ces institutions ont un besoin critique de mobilité fiable, sécurisée et professionnelle — un besoin auquel le marché actuel ne répond pas de manière structurée.",
    subsections: [
      {
        title: "La problématique",
        content:
          "Le marché de la location de véhicules B2B en Côte d'Ivoire est fragmenté entre des dizaines d'agences locales de tailles et de qualités très variables. Les organisations internationales font face à des défis majeurs : manque de standards uniformes, opacité des prix, absence de garanties contractuelles solides et multiplicité des interlocuteurs.",
      },
      {
        title: "La solution FlowRide",
        content:
          "FlowRide se positionne comme l'agrégateur de qualité du marché, opérant en marque blanche. Nous ne possédons pas de flotte : nous sélectionnons, certifions et pilotons un réseau d'agences partenaires sous une marque unique, garantissant un niveau de service homogène et premium à nos clients institutionnels.",
      },
      {
        title: "Notre positionnement unique",
        content:
          "En tant qu'intermédiaire de confiance, FlowRide assume la responsabilité complète vis-à-vis du client : un contrat unique, une facturation centralisée, un Account Manager dédié et un engagement SLA avec backup garanti en 2 heures. Le client ne traite jamais directement avec les agences partenaires.",
      },
    ],
  },
  {
    id: "marche-location-b2b",
    number: "02",
    title: "Le Marché de la Location B2B en Côte d'Ivoire",
    audience: "all",
    introduction:
      "La Côte d'Ivoire affiche une croissance du PIB supérieure à 6% par an depuis une décennie. Abidjan s'impose comme le centre économique de l'Afrique de l'Ouest francophone, attirant investissements et organisations internationales.",
    subsections: [
      {
        title: "Contexte économique favorable",
        content:
          "Avec plus de 200 organisations internationales présentes à Abidjan (ONU, Banque Mondiale, BAD, ambassades, ONGs humanitaires), la demande en véhicules professionnels avec chauffeur est structurellement forte et croissante. Le district d'Abidjan concentre à lui seul plus de 70% de cette demande.",
        items: [
          "PIB en croissance de 6-7% par an depuis 2012",
          "Plus de 200 organisations internationales basées à Abidjan",
          "Afflux croissant d'entreprises multinationales (énergie, mines, tech)",
          "Projets d'infrastructures massifs (métro, autoroutes, port)",
        ],
      },
      {
        title: "Les défis du marché actuel",
        content:
          "Le marché de la location B2B reste largement informel et fragmenté. Les responsables logistiques des organisations internationales perdent un temps considérable à identifier, évaluer et gérer de multiples prestataires.",
        items: [
          "Fragmentation : des dizaines d'agences sans standards communs",
          "Opacité des prix : tarifs variables et négociations complexes",
          "Qualité inégale : véhicules mal entretenus, chauffeurs non formés",
          "Risque opérationnel : pas de backup en cas de panne ou d'incident",
          "Complexité administrative : multiplication des contrats et factures",
        ],
      },
      {
        title: "L'opportunité",
        content:
          "Le marché de la location de véhicules B2B en Côte d'Ivoire est estimé à plus de 500 milliards de FCFA par an. L'absence d'acteur structuré sur le segment institutionnel représente une opportunité majeure pour un agrégateur de qualité comme FlowRide.",
      },
    ],
    stats: [
      { value: "6", label: "Croissance PIB annuelle", suffix: "%" },
      { value: "500", label: "Marché estimé (milliards FCFA)", suffix: "+" },
      { value: "70", label: "Demande concentrée sur Abidjan", suffix: "%" },
      { value: "200", label: "Organisations internationales", suffix: "+" },
    ],
  },
  {
    id: "solution-flowride",
    number: "03",
    title: "La Solution FlowRide",
    audience: "all",
    introduction:
      "FlowRide repense la location de flotte B2B avec un modèle d'intermédiation en marque blanche unique en Afrique de l'Ouest. Notre plateforme connecte la demande institutionnelle à l'offre locale certifiée, sous une marque et un niveau de service unifié.",
    subsections: [
      {
        title: "Le modèle d'intermédiation en marque blanche",
        content:
          "FlowRide ne possède pas de véhicules. Nous sélectionnons et certifions un réseau d'agences de location partenaires dont les véhicules et chauffeurs opèrent sous la marque FlowRide. Le client bénéficie d'un interlocuteur unique et d'une qualité garantie, tandis que les agences accèdent à une clientèle premium sans effort commercial.",
      },
      {
        title: "Comment ça fonctionne",
        content:
          "Le flux opérationnel est conçu pour maximiser la simplicité côté client et l'efficacité côté partenaire. Le client exprime son besoin auprès de FlowRide. Notre équipe identifie la meilleure agence partenaire selon la disponibilité, la proximité et la qualité. Le véhicule est déployé sous la marque FlowRide avec un chauffeur certifié. La facturation est consolidée et unique.",
        items: [
          "1. Le client contacte FlowRide avec ses besoins de mobilité",
          "2. FlowRide identifie et sélectionne l'agence partenaire optimale",
          "3. Le véhicule est préparé, inspecté et déployé sous marque FlowRide",
          "4. Le chauffeur certifié assure la prestation selon nos standards",
          "5. FlowRide facture le client et rémunère l'agence partenaire",
          "6. Suivi qualité continu et reporting au client",
        ],
      },
      {
        title: "La chaîne de valeur unique",
        content:
          "Notre valeur ajoutée réside dans quatre piliers : la curation (sélection rigoureuse des partenaires), la certification (inspection 50 points), le pilotage (coordination opérationnelle en temps réel) et la garantie (responsabilité unique avec SLA et backup). Ce positionnement nous différencie radicalement des plateformes de mise en relation classiques.",
      },
    ],
    quote: "FlowRide n'est pas une plateforme de mise en relation. C'est un garant de qualité qui assume la responsabilité complète de la prestation.",
    quoteAuthor: "Vision FlowRide",
  },
  {
    id: "piliers-qualite",
    number: "04",
    title: "Les 5 Piliers de Qualité",
    audience: "client",
    introduction:
      "La qualité est au cœur de l'ADN FlowRide. Chaque pilier a été conçu pour répondre aux exigences spécifiques des organisations internationales et garantir une expérience de mobilité irréprochable.",
    subsections: [
      {
        title: "Certification 50 Points",
        content:
          "Chaque véhicule intégrant le réseau FlowRide passe une inspection rigoureuse de 50 points couvrant l'état mécanique, la carrosserie, l'intérieur, la sécurité et le confort. Cette inspection est renouvelée tous les 6 mois et après chaque intervention technique majeure.",
        items: [
          "État mécanique complet (moteur, freins, suspension, direction)",
          "Carrosserie et peinture sans défauts visibles",
          "Intérieur propre et en parfait état (sellerie, climatisation)",
          "Équipements de sécurité vérifiés (airbags, ceintures, extincteur)",
          "Documents à jour (assurance, visite technique, carte grise)",
          "Confort premium (climatisation performante, propreté irréprochable)",
        ],
      },
      {
        title: "Chauffeurs Formés et Certifiés",
        content:
          "Nos chauffeurs partenaires suivent un programme de formation complet avant d'être certifiés FlowRide. La formation couvre la conduite défensive, le protocole client, la connaissance de la ville et la gestion d'urgences. Des évaluations régulières garantissent le maintien du niveau.",
        items: [
          "Formation conduite défensive et sécurité routière",
          "Protocole d'accueil et service client premium",
          "Connaissance approfondie d'Abidjan et de la région",
          "Gestion des situations d'urgence et premiers secours",
          "Dress code et présentation professionnelle",
          "Évaluation trimestrielle avec feedback client",
        ],
      },
      {
        title: "Backup Garanti en 2 Heures",
        content:
          "En cas de panne, d'accident ou d'indisponibilité imprévue, FlowRide s'engage contractuellement à fournir un véhicule de remplacement dans un délai maximum de 2 heures. Ce SLA est soutenu par notre réseau étendu d'agences partenaires et notre centre de coordination opérationnel.",
      },
      {
        title: "Account Manager Dédié",
        content:
          "Chaque client institutionnel bénéficie d'un interlocuteur unique chez FlowRide. L'Account Manager est le point de contact central pour toutes les demandes : réservations, modifications, réclamations, reporting. Il connaît votre organisation, vos habitudes et vos exigences.",
      },
      {
        title: "Facturation Centralisée",
        content:
          "Fini la multiplicité des factures de différents prestataires. FlowRide émet une facture unique mensuelle consolidant l'ensemble de vos prestations. Format compatible avec les systèmes comptables internationaux (SAP, Oracle). Reporting détaillé par département, projet ou centre de coûts.",
      },
    ],
    stats: [
      { value: "50", label: "Points de contrôle par véhicule" },
      { value: "2", label: "Heures max pour le backup", suffix: "h" },
      { value: "98", label: "Taux de satisfaction client", suffix: "%" },
      { value: "1", label: "Facture unique par mois" },
    ],
  },
  {
    id: "offres-detaillees",
    number: "05",
    title: "Nos Offres Détaillées",
    audience: "client",
    introduction:
      "FlowRide propose trois formules adaptées aux différents besoins de mobilité des organisations internationales. Chaque offre est conçue pour offrir le meilleur rapport qualité-service-prix.",
    subsections: [
      {
        title: "À la Demande — Flexibilité maximale",
        content:
          "Idéale pour les besoins ponctuels : missions terrain, accueil de délégations, événements. Réservation possible en 24-48h, sans engagement de durée. Tarification transparente à la journée ou à la semaine selon le type de véhicule et la durée.",
        items: [
          "Réservation rapide en 24-48h",
          "Durée flexible : jour, semaine ou mois",
          "Aucun engagement long terme",
          "Véhicule avec chauffeur certifié inclus",
          "Assurance tous risques incluse",
          "Support client 7j/7",
        ],
      },
      {
        title: "Contrat Annuel — L'offre recommandée",
        content:
          "Notre formule la plus populaire. Des tarifs préférentiels négociés pour l'année, des véhicules dédiés à votre organisation et un Account Manager attitré. Réduction de 15 à 25% par rapport aux tarifs à la demande, avec un engagement de volume.",
        items: [
          "Tarifs négociés avec réduction de 15-25%",
          "Véhicules dédiés à votre organisation",
          "Account Manager dédié",
          "Priority support 24/7",
          "Backup garanti en 2h",
          "Facturation mensuelle consolidée",
          "Reporting mensuel d'utilisation détaillé",
          "Chauffeurs certifiés et fidélisés",
        ],
      },
      {
        title: "Full Management — Service Premium",
        content:
          "L'externalisation complète de votre mobilité. FlowRide gère l'intégralité de votre flotte : dimensionnement, allocation, rotation, maintenance, chauffeurs. Vous vous concentrez sur votre mission, nous nous occupons de tout le reste.",
        items: [
          "Tout le Contrat Annuel inclus",
          "Gestion complète de votre flotte",
          "Optimisation continue des coûts de mobilité",
          "Reporting détaillé et analytics avancés",
          "Intégration à vos outils internes (ERP, RH)",
          "Conseil stratégique en mobilité",
          "SLA garanti avec pénalités contractuelles",
          "Audit et certification annuelle de la flotte",
        ],
      },
    ],
  },
  {
    id: "programme-partenaire",
    number: "06",
    title: "Le Programme Partenaire",
    audience: "partenaire",
    introduction:
      "Le programme partenaire FlowRide est conçu pour créer de la valeur partagée. En rejoignant notre réseau, les agences de location accèdent à une clientèle premium et bénéficient d'un cadre structuré pour développer leur activité.",
    subsections: [
      {
        title: "Pourquoi rejoindre le réseau FlowRide",
        content:
          "FlowRide ouvre les portes d'un marché autrement inaccessible pour les agences de location locales : les organisations internationales. Ces clients offrent des contrats longue durée, des volumes prévisibles et une solvabilité garantie.",
        items: [
          "Accès direct aux institutions internationales (ONGs, ambassades, entreprises)",
          "Contrats longue durée avec revenus récurrents et prévisibles",
          "Zéro effort commercial : FlowRide gère l'acquisition client",
          "Visibilité accrue grâce à la marque FlowRide premium",
          "Support opérationnel et formation continue",
          "Réseau d'entraide entre partenaires certifiés",
        ],
      },
      {
        title: "Modèle économique et partage de revenus",
        content:
          "Le modèle est simple et transparent. FlowRide facture le client final et reverse à l'agence partenaire un pourcentage convenu du tarif. La commission FlowRide couvre l'acquisition client, la coordination opérationnelle, le contrôle qualité et la garantie de service.",
        items: [
          "Commission FlowRide : 15-20% du tarif facturé au client",
          "Reversement à l'agence partenaire : 80-85% du tarif",
          "Paiement mensuel garanti à date fixe",
          "Transparence totale sur les tarifs et la facturation",
          "Bonus de performance pour les partenaires les mieux notés",
        ],
      },
      {
        title: "Processus de certification",
        content:
          "Devenir partenaire FlowRide nécessite de passer un processus de certification rigoureux garantissant la qualité du réseau. Ce processus comprend l'évaluation de votre flotte, la vérification administrative et la formation de vos chauffeurs.",
        items: [
          "Étape 1 : Candidature en ligne et examen du dossier",
          "Étape 2 : Visite d'inspection de la flotte (certification 50 points)",
          "Étape 3 : Vérification administrative et légale",
          "Étape 4 : Formation initiale des chauffeurs",
          "Étape 5 : Intégration au réseau et premières réservations",
        ],
      },
      {
        title: "Outils et support fournis",
        content:
          "FlowRide fournit à ses partenaires un ensemble d'outils et de services pour faciliter leur quotidien et optimiser leur activité.",
        items: [
          "Dashboard partenaire en ligne (réservations, facturation, performance)",
          "Application mobile pour la gestion des courses en temps réel",
          "Programme de formation continue pour les chauffeurs",
          "Support technique et opérationnel 7j/7",
          "Gestionnaire de compte dédié chez FlowRide",
          "Accès au réseau de partenaires pour le backup mutuel",
        ],
      },
    ],
    stats: [
      { value: "80", label: "Reversement minimum au partenaire", suffix: "%" },
      { value: "48", label: "Heures pour traiter une candidature", suffix: "h" },
      { value: "0", label: "Frais d'entrée dans le réseau", suffix: "€" },
      { value: "200", label: "Croissance moyenne du CA partenaire", suffix: "%" },
    ],
    quote: "Depuis que nous avons rejoint FlowRide, notre taux d'occupation est passé de 45% à 85% et nous avons pu investir dans 10 nouveaux véhicules.",
    quoteAuthor: "Directeur, Agence Partenaire Abidjan Sud",
  },
  {
    id: "etudes-de-cas",
    number: "07",
    title: "Études de Cas",
    audience: "all",
    introduction:
      "Des exemples concrets illustrant l'impact de FlowRide pour ses clients institutionnels et ses agences partenaires.",
    subsections: [],
  },
  {
    id: "securite-conformite",
    number: "08",
    title: "Sécurité et Conformité",
    audience: "client",
    introduction:
      "La sécurité de vos collaborateurs est notre priorité absolue. FlowRide met en œuvre un dispositif complet couvrant l'assurance, la formation et les protocoles d'urgence.",
    subsections: [
      {
        title: "Assurances et couverture",
        content:
          "Tous les véhicules du réseau FlowRide disposent d'une assurance tous risques souscrite auprès de compagnies de premier plan. La couverture inclut les dommages matériels, corporels, le vol et l'assistance 24/7.",
        items: [
          "Assurance tous risques obligatoire pour tous les véhicules",
          "Couverture responsabilité civile étendue",
          "Assurance passagers complémentaire",
          "Assistance et dépannage 24/7 sur tout le territoire",
        ],
      },
      {
        title: "Formation sécurité des chauffeurs",
        content:
          "Chaque chauffeur du réseau suit une formation sécurité complète incluant la conduite défensive, la gestion de situations d'urgence et les premiers secours. Des rappels sont organisés tous les trimestres.",
      },
      {
        title: "Protocoles d'urgence",
        content:
          "FlowRide dispose de protocoles d'intervention clairs pour chaque type d'incident : accident, panne, situation sécuritaire. Un centre de coordination opérationnel est joignable 24/7 et coordonne l'intervention dans les meilleurs délais.",
        items: [
          "Centre de coordination joignable 24/7",
          "Protocole accident avec checklist d'actions immédiates",
          "Protocole sécuritaire en zone à risque",
          "Véhicule de remplacement déployé en moins de 2h",
          "Communication proactive avec le client",
        ],
      },
      {
        title: "Conformité réglementaire",
        content:
          "Tous les véhicules et chauffeurs du réseau sont en conformité avec la réglementation ivoirienne en vigueur : permis de conduire, carte de transport, visite technique, assurance. FlowRide effectue des audits réguliers pour s'en assurer.",
      },
    ],
  },
  {
    id: "technologie-innovation",
    number: "09",
    title: "Technologie et Innovation",
    audience: "all",
    introduction:
      "FlowRide investit dans la technologie pour offrir une expérience de mobilité moderne et transparente, tant pour ses clients que pour ses partenaires.",
    subsections: [
      {
        title: "Plateforme digitale de gestion",
        content:
          "Notre plateforme web centralise l'ensemble des opérations : réservations, suivi de flotte, facturation, reporting. Les clients disposent d'un espace connecté pour suivre leurs prestations en temps réel et accéder à leur historique.",
      },
      {
        title: "Suivi en temps réel (Vision V2)",
        content:
          "La prochaine version de notre plateforme intégrera le suivi GPS en temps réel des véhicules, permettant aux clients de visualiser la position de leur chauffeur, estimer les temps d'arrivée et optimiser la planification de leurs déplacements.",
        items: [
          "Géolocalisation GPS en temps réel des véhicules",
          "Estimation automatique des temps de trajet",
          "Historique des trajets et kilométrage",
          "Alertes et notifications personnalisables",
        ],
      },
      {
        title: "Reporting et analytics",
        content:
          "Des tableaux de bord détaillés permettent d'analyser l'utilisation de votre flotte, d'identifier les axes d'optimisation et de prendre des décisions éclairées sur vos besoins de mobilité.",
        items: [
          "Dashboard avec KPIs de mobilité en temps réel",
          "Analyse des coûts par département, projet ou centre de coûts",
          "Rapports automatisés mensuels et trimestriels",
          "Export des données au format Excel et PDF",
          "Comparatif d'utilisation période par période",
        ],
      },
    ],
  },
  {
    id: "vision-feuille-de-route",
    number: "10",
    title: "Vision et Feuille de Route",
    audience: "all",
    introduction:
      "FlowRide ambitionne de devenir le leader de la location de flotte B2B en Afrique de l'Ouest d'ici 2028. Notre stratégie de développement s'articule autour de phases clairement définies.",
    subsections: [
      {
        title: "Phase 1 — 2025-2026 : Consolidation à Abidjan",
        content:
          "Objectif : construire un réseau solide de 20+ agences partenaires certifiées et établir FlowRide comme la référence de la location B2B institutionnelle à Abidjan.",
        items: [
          "Constitution du réseau fondateur de partenaires certifiés",
          "Acquisition des premiers clients institutionnels majeurs",
          "Lancement de la plateforme digitale V1",
          "Mise en place des processus opérationnels et qualité",
          "Atteinte de la rentabilité opérationnelle",
        ],
      },
      {
        title: "Phase 2 — 2026-2027 : Espaces connectés et expansion fonctionnelle",
        content:
          "Objectif : enrichir l'expérience digitale avec des espaces connectés pour les clients et les partenaires, et développer des fonctionnalités avancées.",
        items: [
          "Lancement des espaces connectés clients et partenaires",
          "Intégration du suivi GPS en temps réel",
          "Développement de l'application mobile",
          "Analytics et reporting avancés",
          "Élargissement de la gamme de véhicules (blindés, VIP, utilitaires)",
        ],
      },
      {
        title: "Phase 3 — 2027-2028 : Expansion régionale",
        content:
          "Objectif : dupliquer le modèle dans les principales capitales d'Afrique de l'Ouest et devenir l'acteur de référence à l'échelle régionale.",
        items: [
          "Lancement à Dakar (Sénégal) — Hub francophone",
          "Lancement à Accra (Ghana) — Hub anglophone",
          "Lancement à Lagos (Nigeria) — Plus grand marché africain",
          "Interconnexion des réseaux nationaux",
          "Partenariats avec les organisations panafricaines",
        ],
      },
      {
        title: "Ambition 2028 : Leader régional",
        content:
          "À horizon 2028, FlowRide vise le statut de leader de la location B2B en Afrique de l'Ouest avec un réseau de plus de 100 agences partenaires, une flotte de plus de 2 000 véhicules certifiés et une présence dans 5 pays.",
      },
    ],
    stats: [
      { value: "100", label: "Agences partenaires visées", suffix: "+" },
      { value: "2000", label: "Véhicules certifiés", suffix: "+" },
      { value: "5", label: "Pays couverts d'ici 2028" },
      { value: "1", label: "er réseau B2B d'Afrique de l'Ouest" },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "ong-internationale",
    icon: "Globe",
    title: "ONG Humanitaire Internationale",
    subtitle: "Gestion de 15 véhicules pour les missions terrain",
    audience: "client",
    metrics: [
      { value: "15", label: "Véhicules gérés" },
      { value: "30", label: "Réduction des coûts", suffix: "%" },
      { value: "99", label: "Taux de disponibilité", suffix: "%" },
      { value: "1", label: "Interlocuteur unique" },
    ],
    story:
      "Une ONG internationale basée à Abidjan gérait sa flotte de 15 véhicules avec 4 prestataires différents. La multiplicité des interlocuteurs, l'hétérogénéité de la qualité et la complexité de la facturation consommaient un temps considérable pour l'équipe logistique. En passant par FlowRide, l'ONG a consolidé sa flotte sous un contrat unique, avec un Account Manager dédié. Le résultat : 30% de réduction des coûts, un taux de disponibilité de 99% et une équipe logistique libérée pour se concentrer sur la mission humanitaire.",
    quote: "FlowRide nous a permis de nous recentrer sur notre mission. La gestion de la flotte est devenue invisible — et c'est exactement ce dont nous avions besoin.",
    quoteAuthor: "Responsable Logistique, ONG Internationale",
  },
  {
    id: "ambassade",
    icon: "Building2",
    title: "Ambassade Européenne",
    subtitle: "Service protocolaire premium pour missions diplomatiques",
    audience: "client",
    metrics: [
      { value: "8", label: "Véhicules prestige" },
      { value: "100", label: "Conformité sécuritaire", suffix: "%" },
      { value: "24", label: "Disponibilité", suffix: "/7" },
      { value: "0", label: "Incident en 12 mois" },
    ],
    story:
      "Une ambassade européenne à Abidjan avait des exigences strictes en matière de sécurité, de ponctualité et de protocole pour le transport de ses diplomates et délégations visitantes. FlowRide a mis en place une flotte dédiée de 8 véhicules prestige avec chauffeurs spécialement formés au protocole diplomatique. Les véhicules sont inspectés quotidiennement et un backup est disponible en permanence. Résultat : zéro incident en 12 mois et une satisfaction totale de l'ambassadeur.",
    quote: "Le niveau de professionnalisme de FlowRide est comparable à ce que nous connaissons dans les capitales européennes. Remarquable pour Abidjan.",
    quoteAuthor: "Conseiller, Ambassade Européenne",
  },
  {
    id: "agence-partenaire",
    icon: "Car",
    title: "Agence de Location — Abidjan Sud",
    subtitle: "Croissance de 200% du chiffre d'affaires en 18 mois",
    audience: "partenaire",
    metrics: [
      { value: "200", label: "Croissance du CA", suffix: "%" },
      { value: "85", label: "Taux d'occupation", suffix: "%" },
      { value: "10", label: "Nouveaux véhicules achetés" },
      { value: "0", label: "Effort de prospection" },
    ],
    story:
      "Une agence de location disposant de 12 véhicules peinait à maintenir un taux d'occupation supérieur à 45%. Le fondateur passait la moitié de son temps en prospection commerciale. En rejoignant le réseau FlowRide, l'agence a vu son taux d'occupation passer à 85% en 6 mois grâce à un flux constant de réservations institutionnelles. Le CA a triplé en 18 mois, permettant l'achat de 10 nouveaux véhicules. Le fondateur se concentre désormais sur la qualité de sa flotte et le management de ses chauffeurs.",
    quote: "Avant FlowRide, je passais mes journées à chercher des clients. Aujourd'hui, je me concentre sur ce que je sais faire : gérer ma flotte et former mes chauffeurs.",
    quoteAuthor: "Fondateur, Agence Partenaire Abidjan Sud",
  },
];

export const getSectionsByAudience = (audience: string): WhitepaperSection[] => {
  if (audience === "complete") return sections;
  return sections.filter((s) => s.audience === "all" || s.audience === audience);
};

export const getCaseStudiesByAudience = (audience: string): CaseStudy[] => {
  if (audience === "complete") return caseStudies;
  return caseStudies.filter((cs) => cs.audience === "all" || cs.audience === audience);
};
