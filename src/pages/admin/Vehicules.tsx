import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useVehicles } from "@/hooks/useVehicles";
import { VehicleFormDialog } from "@/components/admin/VehicleFormDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  Fuel,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { Database } from "@/integrations/supabase/types";

type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];
type VehicleCategory = Database["public"]["Enums"]["vehicle_category"];

const categoryLabels: Record<VehicleCategory, string> = {
  berline: "Berline",
  suv: "SUV / 4x4",
  minibus: "Minibus",
  prestige: "Prestige",
};

const categoryColors: Record<VehicleCategory, string> = {
  berline: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  suv: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  minibus: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  prestige: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

export default function Vehicules() {
  const {
    vehicles,
    isLoading,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    toggleAvailability,
  } = useVehicles();

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterAvailability, setFilterAvailability] = useState<string>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredVehicles = vehicles?.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || v.category === filterCategory;
    const matchesAvailability =
      filterAvailability === "all" ||
      (filterAvailability === "available" && v.is_available) ||
      (filterAvailability === "unavailable" && !v.is_available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleAdd = () => {
    setEditingVehicle(null);
    setFormOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: Database["public"]["Tables"]["vehicles"]["Insert"]) => {
    if (editingVehicle) {
      updateVehicle.mutate(
        { id: editingVehicle.id, ...data },
        { onSuccess: () => setFormOpen(false) }
      );
    } else {
      addVehicle.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteVehicle.mutate(deletingId, {
        onSuccess: () => setDeletingId(null),
      });
    }
  };

  const totalVehicles = vehicles?.length || 0;
  const availableCount = vehicles?.filter((v) => v.is_available).length || 0;
  const popularCount = vehicles?.filter((v) => v.is_popular).length || 0;

  return (
    <AdminLayout
      title="Gestion des Véhicules"
      subtitle="Gérez le catalogue de véhicules FlowRide"
    >
      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold font-display">{totalVehicles}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disponibles</p>
              <p className="text-2xl font-bold font-display">{availableCount}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Fuel className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Populaires</p>
              <p className="text-2xl font-bold font-display">{popularCount}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Add button */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, marque ou modèle..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-44">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filterAvailability}
              onValueChange={setFilterAvailability}
            >
              <SelectTrigger className="w-full md:w-44">
                <SelectValue placeholder="Disponibilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="available">Disponibles</SelectItem>
                <SelectItem value="unavailable">Indisponibles</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">
              Chargement des véhicules...
            </div>
          ) : filteredVehicles?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Aucun véhicule trouvé
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Places</TableHead>
                  <TableHead>Transmission</TableHead>
                  <TableHead>Tarif / jour</TableHead>
                  <TableHead>Disponible</TableHead>
                  <TableHead>Ajouté le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles?.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {vehicle.image_url ? (
                          <img
                            src={vehicle.image_url}
                            alt={vehicle.name}
                            className="h-10 w-14 rounded object-cover"
                          />
                        ) : (
                          <div className="h-10 w-14 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                            N/A
                          </div>
                        )}
                        <div>
                          <p className="font-medium flex items-center gap-1.5">
                            {vehicle.name}
                            {vehicle.is_popular && (
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {vehicle.brand} · {vehicle.fuel_type}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryColors[vehicle.category]}>
                        {categoryLabels[vehicle.category]}
                      </Badge>
                    </TableCell>
                    <TableCell>{vehicle.seats}</TableCell>
                    <TableCell>{vehicle.transmission}</TableCell>
                    <TableCell className="font-medium">
                      {vehicle.daily_rate.toLocaleString("fr-FR")} FCFA
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={vehicle.is_available}
                        onCheckedChange={(checked) =>
                          toggleAvailability.mutate({
                            id: vehicle.id,
                            is_available: checked,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(vehicle.created_at), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(vehicle)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletingId(vehicle.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <VehicleFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        vehicle={editingVehicle}
        onSubmit={handleFormSubmit}
        isPending={addVehicle.isPending || updateVehicle.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingId}
        onOpenChange={() => setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce véhicule ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le véhicule sera définitivement
              retiré du catalogue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteVehicle.isPending ? "Suppression..." : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
