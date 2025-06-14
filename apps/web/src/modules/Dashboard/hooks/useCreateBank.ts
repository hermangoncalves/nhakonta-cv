import { API } from "@/lib/api";
import type { CreateBankAccount } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createBank(data: CreateBankAccount) {
    const response = await API.post("/api/v1/banks", data);
    return response.data;
}

export function useCreateBank() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createBank,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["banks"],
            });
        },
    });

    return mutation;
}
