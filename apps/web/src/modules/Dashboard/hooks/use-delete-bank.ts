import { API } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function deleteBank(bankId: number) {
    const response = await API.delete(`/api/v1/banks/${bankId}`);
    return response.data;
}

export function useDeleteBank() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteBank,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["banks"],
            });
        },
    });

    return mutation;
}
