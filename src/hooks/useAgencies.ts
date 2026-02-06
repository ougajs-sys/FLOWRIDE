import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Agency = Database["public"]["Tables"]["agencies"]["Row"];
type PartnerStatus = Database["public"]["Enums"]["partner_status"];

export function useAgencies() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: agencies, isLoading, error } = useQuery({
    queryKey: ["agencies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agencies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Agency[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: PartnerStatus }) => {
      const { error } = await supabase
        .from("agencies")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agencies"] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut de l'agence a été modifié avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut.",
        variant: "destructive",
      });
      console.error("Update error:", error);
    },
  });

  const updateNotes = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from("agencies")
        .update({ notes })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agencies"] });
      toast({
        title: "Notes sauvegardées",
        description: "Les notes ont été mises à jour.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les notes.",
        variant: "destructive",
      });
      console.error("Update error:", error);
    },
  });

  return {
    agencies,
    isLoading,
    error,
    updateStatus,
    updateNotes,
  };
}
