import { API } from "@/lib/api";
import type { CreateUser } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";



async function createUser(data: CreateUser) {
    const response = await API.post("/api/v1/users", data);
    return response.data;
}

export function usecreateUser() {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    return mutation;
}
