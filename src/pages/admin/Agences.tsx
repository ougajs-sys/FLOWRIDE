import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAgencies } from "@/hooks/useAgencies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Search, Eye, Mail, Phone, MapPin, Car, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Agency = Database["public"]["Tables"]["agencies"]["Row"];
type PartnerStatus = Database["public"]["Enums"]["partner_status"];

const statusLabels: Record<PartnerStatus, string> = {
  candidature: "Candidature",
  en_verification: "En vérification",
  approuve: "Approuvé",
  refuse: "Refusé",
  suspendu: "Suspendu",
};

const statusColors: Record<PartnerStatus, string> = {
  candidature: "bg-blue-100 text-blue-800",
  en_verification: "bg-yellow-100 text-yellow-800",
  approuve: "bg-green-100 text-green-800",
  refuse: "bg-red-100 text-red-800",
  suspendu: "bg-gray-100 text-gray-800",
};

const legalStatusLabels: Record<string, string> = {
  sarl: "SARL",
  sa: "SA",
  sas: "SAS",
  ei: "Entreprise Individuelle",
  other: "Autre",
};

const vehicleTypeLabels: Record<string, string> = {
  berline: "Berlines",
  suv: "SUV / 4x4",
  minibus: "Minibus",
  prestige: "Véhicules de prestige",
};

export default function Agences() {
  const { agencies, isLoading, updateStatus, updateNotes } = useAgencies();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [notes, setNotes] = useState("");

  const filteredAgencies = agencies?.filter((agency) => {
    const matchesSearch =
      agency.name.toLowerCase().includes(search.toLowerCase()) ||
      agency.contact_name.toLowerCase().includes(search.toLowerCase()) ||
      agency.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || agency.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, status: PartnerStatus) => {
    updateStatus.mutate({ id, status });
  };

  const handleOpenDetail = (agency: Agency) => {
    setSelectedAgency(agency);
    setNotes(agency.notes || "");
  };

  const handleSaveNotes = () => {
    if (selectedAgency) {
      updateNotes.mutate({ id: selectedAgency.id, notes });
    }
  };

  return (
    <AdminLayout
      title="Gestion des Agences"
      subtitle="Gérez les candidatures et agences partenaires"
    >
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, contact ou ville..."
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
              Chargement des agences...
            </div>
          ) : filteredAgencies?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Aucune agence trouvée
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agence</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Ville</TableHead>
                  <TableHead>Flotte</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgencies?.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{agency.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {legalStatusLabels[agency.legal_status] || agency.legal_status}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{agency.contact_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {agency.contact_role}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{agency.city}</TableCell>
                    <TableCell>{agency.fleet_size}</TableCell>
                    <TableCell>
                      {format(new Date(agency.created_at), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={agency.status}
                        onValueChange={(value) =>
                          handleStatusChange(agency.id, value as PartnerStatus)
                        }
                      >
                        <SelectTrigger className="w-36 h-8">
                          <Badge className={statusColors[agency.status]}>
                            {statusLabels[agency.status]}
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
                        onClick={() => handleOpenDetail(agency)}
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
        open={!!selectedAgency}
        onOpenChange={() => setSelectedAgency(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedAgency?.name}
              {selectedAgency && (
                <Badge className={statusColors[selectedAgency.status]}>
                  {statusLabels[selectedAgency.status]}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedAgency && (
            <div className="space-y-6">
              {/* Agency Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Statut juridique</p>
                  <p className="font-medium">
                    {legalStatusLabels[selectedAgency.legal_status] || selectedAgency.legal_status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">N° RCCM</p>
                  <p className="font-medium">{selectedAgency.registration_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ancienneté</p>
                  <p className="font-medium">{selectedAgency.years_in_business}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">{selectedAgency.address}</p>
                  <p className="text-sm text-muted-foreground">{selectedAgency.city}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{selectedAgency.contact_name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({selectedAgency.contact_role})
                  </span>
                </div>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${selectedAgency.contact_email}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {selectedAgency.contact_email}
                  </a>
                  <a
                    href={`tel:${selectedAgency.contact_phone}`}
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {selectedAgency.contact_phone}
                  </a>
                </div>
              </div>

              {/* Fleet */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Flotte: {selectedAgency.fleet_size}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedAgency.vehicle_types.map((type) => (
                    <Badge key={type} variant="outline">
                      {vehicleTypeLabels[type] || type}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Chauffeurs: {selectedAgency.has_drivers === "yes-all" 
                    ? "Oui, pour tous les véhicules" 
                    : selectedAgency.has_drivers === "yes-some" 
                      ? "Oui, pour certains" 
                      : "Non"}
                </p>
              </div>

              {/* Motivation */}
              {selectedAgency.motivation && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Motivation</p>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {selectedAgency.motivation}
                  </p>
                </div>
              )}

              {/* Notes */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Notes internes</p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajouter des notes sur cette agence..."
                  rows={3}
                />
                <Button
                  onClick={handleSaveNotes}
                  size="sm"
                  className="mt-2"
                  disabled={updateNotes.isPending}
                >
                  {updateNotes.isPending ? "Sauvegarde..." : "Sauvegarder les notes"}
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Candidature reçue le{" "}
                {format(new Date(selectedAgency.created_at), "dd MMMM yyyy à HH:mm", {
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
