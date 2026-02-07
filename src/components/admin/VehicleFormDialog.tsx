import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Database } from "@/integrations/supabase/types";

type VehicleCategory = Database["public"]["Enums"]["vehicle_category"];
type VehicleInsert = Database["public"]["Tables"]["vehicles"]["Insert"];
type Vehicle = Database["public"]["Tables"]["vehicles"]["Row"];

const categoryLabels: Record<VehicleCategory, string> = {
  berline: "Berline",
  suv: "SUV / 4x4",
  minibus: "Minibus",
  prestige: "Prestige",
};

interface VehicleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle?: Vehicle | null;
  onSubmit: (data: VehicleInsert) => void;
  isPending: boolean;
}

const defaultForm: VehicleInsert = {
  name: "",
  brand: "",
  model: "",
  category: "berline",
  seats: 4,
  transmission: "Automatique",
  fuel_type: "Essence",
  daily_rate: 0,
  features: [],
  is_available: true,
  is_popular: false,
  image_url: "",
};

export function VehicleFormDialog({
  open,
  onOpenChange,
  vehicle,
  onSubmit,
  isPending,
}: VehicleFormDialogProps) {
  const [form, setForm] = useState<VehicleInsert>(defaultForm);
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    if (vehicle) {
      setForm({
        name: vehicle.name,
        brand: vehicle.brand,
        model: vehicle.model,
        category: vehicle.category,
        seats: vehicle.seats,
        transmission: vehicle.transmission,
        fuel_type: vehicle.fuel_type,
        daily_rate: vehicle.daily_rate,
        features: vehicle.features,
        is_available: vehicle.is_available,
        is_popular: vehicle.is_popular,
        image_url: vehicle.image_url || "",
      });
      setFeaturesInput(vehicle.features.join(", "));
    } else {
      setForm(defaultForm);
      setFeaturesInput("");
    }
  }, [vehicle, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    onSubmit({ ...form, features });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {vehicle ? "Modifier le véhicule" : "Ajouter un véhicule"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom du véhicule</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Toyota Land Cruiser 300"
                required
              />
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input
                id="brand"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="Toyota"
                required
              />
            </div>

            {/* Model */}
            <div className="space-y-2">
              <Label htmlFor="model">Modèle</Label>
              <Input
                id="model"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                placeholder="Land Cruiser 300"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm({ ...form, category: v as VehicleCategory })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Seats */}
            <div className="space-y-2">
              <Label htmlFor="seats">Nombre de places</Label>
              <Input
                id="seats"
                type="number"
                min={1}
                max={50}
                value={form.seats}
                onChange={(e) =>
                  setForm({ ...form, seats: parseInt(e.target.value) || 4 })
                }
              />
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <Label>Transmission</Label>
              <Select
                value={form.transmission}
                onValueChange={(v) => setForm({ ...form, transmission: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatique">Automatique</SelectItem>
                  <SelectItem value="Manuelle">Manuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fuel */}
            <div className="space-y-2">
              <Label>Carburant</Label>
              <Select
                value={form.fuel_type}
                onValueChange={(v) => setForm({ ...form, fuel_type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Essence">Essence</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Hybride">Hybride</SelectItem>
                  <SelectItem value="Électrique">Électrique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Daily Rate */}
            <div className="space-y-2">
              <Label htmlFor="daily_rate">Tarif journalier (FCFA)</Label>
              <Input
                id="daily_rate"
                type="number"
                min={0}
                value={form.daily_rate}
                onChange={(e) =>
                  setForm({ ...form, daily_rate: parseInt(e.target.value) || 0 })
                }
                required
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image_url">URL de l'image</Label>
            <Input
              id="image_url"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              placeholder="https://example.com/vehicle.jpg"
            />
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label htmlFor="features">
              Équipements (séparés par des virgules)
            </Label>
            <Input
              id="features"
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Climatisation, GPS, Bluetooth, Cuir"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <Switch
                id="is_available"
                checked={form.is_available}
                onCheckedChange={(v) => setForm({ ...form, is_available: v })}
              />
              <Label htmlFor="is_available">Disponible</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="is_popular"
                checked={form.is_popular}
                onCheckedChange={(v) => setForm({ ...form, is_popular: v })}
              />
              <Label htmlFor="is_popular">Populaire</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Sauvegarde..."
                : vehicle
                  ? "Mettre à jour"
                  : "Ajouter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
