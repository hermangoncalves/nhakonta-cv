import { API } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { ListUsersAvatars } from "@/schemas";


async function getLatestUsersAvatars() {
    const response = await API.get<ListUsersAvatars>("/api/v1/users/latest");
    return response.data;
}

export function useLatestUsersAvatars() {
    const queryKey = ["latest-users"];
    const query = useQuery({
        queryKey,
        queryFn: getLatestUsersAvatars,
        retry: false,
        refetchInterval: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        latestUsers: query.data,
        isEmpty: query.data?.count === 0,
        queryKey,
    };
}
