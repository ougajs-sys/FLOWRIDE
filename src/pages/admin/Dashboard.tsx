import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProspects } from "@/hooks/useProspects";
import { useAgencies } from "@/hooks/useAgencies";
import { Users, Building2, Car, FileText, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const statusLabels: Record<string, string> = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  qualifie: "Qualifié",
  converti: "Converti",
  perdu: "Perdu",
  candidature: "Candidature",
  en_verification: "En vérification",
  approuve: "Approuvé",
  refuse: "Refusé",
  suspendu: "Suspendu",
};

const statusColors: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-800",
  contacte: "bg-yellow-100 text-yellow-800",
  qualifie: "bg-purple-100 text-purple-800",
  converti: "bg-green-100 text-green-800",
  perdu: "bg-gray-100 text-gray-800",
  candidature: "bg-blue-100 text-blue-800",
  en_verification: "bg-yellow-100 text-yellow-800",
  approuve: "bg-green-100 text-green-800",
  refuse: "bg-red-100 text-red-800",
  suspendu: "bg-gray-100 text-gray-800",
};

export default function Dashboard() {
  const { prospects, isLoading: prospectsLoading } = useProspects();
  const { agencies, isLoading: agenciesLoading } = useAgencies();

  const newProspectsCount = prospects?.filter(p => p.status === "nouveau").length || 0;
  const pendingAgenciesCount = agencies?.filter(a => a.status === "candidature" || a.status === "en_verification").length || 0;
  const approvedAgenciesCount = agencies?.filter(a => a.status === "approuve").length || 0;

  const recentProspects = prospects?.slice(0, 5) || [];
  const recentAgencies = agencies?.slice(0, 5) || [];

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Vue d'ensemble de votre activité"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Nouveaux prospects"
          value={newProspectsCount}
          change={{ value: 12, label: "vs mois dernier" }}
          icon={Users}
        />
        <StatCard
          title="Candidatures en attente"
          value={pendingAgenciesCount}
          icon={Clock}
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Agences partenaires"
          value={approvedAgenciesCount}
          change={{ value: 8, label: "vs mois dernier" }}
          icon={Building2}
          iconColor="text-green-600"
        />
        <StatCard
          title="Véhicules actifs"
          value={24}
          icon={Car}
          iconColor="text-blue-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prospects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Derniers prospects</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {prospectsLoading ? (
              <p className="text-muted-foreground text-sm">Chargement...</p>
            ) : recentProspects.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun prospect pour le moment</p>
            ) : (
              <div className="space-y-4">
                {recentProspects.map((prospect) => (
                  <div
                    key={prospect.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-sm">{prospect.company_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {prospect.contact_name} • {format(new Date(prospect.created_at), "dd MMM yyyy", { locale: fr })}
                      </p>
                    </div>
                    <Badge className={statusColors[prospect.status]}>
                      {statusLabels[prospect.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Agencies */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Dernières candidatures</CardTitle>
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {agenciesLoading ? (
              <p className="text-muted-foreground text-sm">Chargement...</p>
            ) : recentAgencies.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucune candidature pour le moment</p>
            ) : (
              <div className="space-y-4">
                {recentAgencies.map((agency) => (
                  <div
                    key={agency.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium text-sm">{agency.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {agency.city} • {agency.fleet_size} véhicules
                      </p>
                    </div>
                    <Badge className={statusColors[agency.status]}>
                      {statusLabels[agency.status]}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
