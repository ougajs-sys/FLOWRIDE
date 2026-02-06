import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Prospect = Database["public"]["Tables"]["prospects"]["Row"];
type ProspectStatus = Database["public"]["Enums"]["prospect_status"];

export function useProspects() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: prospects, isLoading, error } = useQuery({
    queryKey: ["prospects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("prospects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Prospect[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ProspectStatus }) => {
      const { error } = await supabase
        .from("prospects")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prospects"] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut du prospect a été modifié avec succès.",
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

  return {
    prospects,
    isLoading,
    error,
    updateStatus,
  };
}
