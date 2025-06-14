import { API } from "@/lib/api";
import type { UpdateBankAccount } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function updateBank({ bankId, data }: { bankId: number; data: UpdateBankAccount }) {
  const response = await API.put(`/api/v1/banks/${bankId}`, data);
  return response.data;
}

export function useUpdateBank() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBank,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["banks"],
      });
    },
  });
}
