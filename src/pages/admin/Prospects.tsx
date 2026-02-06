import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useProspects } from "@/hooks/useProspects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Prospect = Database["public"]["Tables"]["prospects"]["Row"];
type ProspectStatus = Database["public"]["Enums"]["prospect_status"];

const statusLabels: Record<ProspectStatus, string> = {
  nouveau: "Nouveau",
  contacte: "Contacté",
  qualifie: "Qualifié",
  converti: "Converti",
  perdu: "Perdu",
};

const statusColors: Record<ProspectStatus, string> = {
  nouveau: "bg-blue-100 text-blue-800",
  contacte: "bg-yellow-100 text-yellow-800",
  qualifie: "bg-purple-100 text-purple-800",
  converti: "bg-green-100 text-green-800",
  perdu: "bg-gray-100 text-gray-800",
};

export default function Prospects() {
  const { prospects, isLoading, updateStatus } = useProspects();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const filteredProspects = prospects?.filter((prospect) => {
    const matchesSearch =
      prospect.company_name.toLowerCase().includes(search.toLowerCase()) ||
      prospect.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      prospect.contact_email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || prospect.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: ProspectStatus) => {
    updateStatus.mutate({ id, status });
  };

  return (
    <AdminLayout
      title="Gestion des Prospects"
      subtitle="Suivez et gérez vos demandes de devis"
    >
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par entreprise, contact ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Chargement des prospects...
            </div>
          ) : filteredProspects?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Aucun prospect trouvé
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Besoins</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProspects?.map((prospect) => (
                  <TableRow key={prospect.id}>
                    <TableCell className="font-medium">
                      {prospect.company_name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{prospect.contact_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {prospect.contact_email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {prospect.vehicle_needs || "-"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(prospect.created_at), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={prospect.status}
                        onValueChange={(value) =>
                          handleStatusChange(prospect.id, value as ProspectStatus)
                        }
                      >
                        <SelectTrigger className="w-32 h-8">
                          <Badge className={statusColors[prospect.status]}>
                            {statusLabels[prospect.status]}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedProspect(prospect)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedProspect}
        onOpenChange={() => setSelectedProspect(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProspect?.company_name}</DialogTitle>
          </DialogHeader>
          {selectedProspect && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{selectedProspect.contact_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <Badge className={statusColors[selectedProspect.status]}>
                    {statusLabels[selectedProspect.status]}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={`mailto:${selectedProspect.contact_email}`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {selectedProspect.contact_email}
                </a>
                <a
                  href={`tel:${selectedProspect.contact_phone}`}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {selectedProspect.contact_phone}
                </a>
              </div>

              {selectedProspect.vehicle_needs && (
                <div>
                  <p className="text-sm text-muted-foreground">Besoins véhicules</p>
                  <p className="text-sm">{selectedProspect.vehicle_needs}</p>
                </div>
              )}

              {selectedProspect.message && (
                <div>
                  <p className="text-sm text-muted-foreground">Message</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedProspect.message}
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Reçu le{" "}
                {format(new Date(selectedProspect.created_at), "dd MMMM yyyy à HH:mm", {
                  locale: fr,
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
