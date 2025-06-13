
import { API } from "@/lib/api";
import type { ListBankAccounts } from "@nhakonta/shared";
import { useQuery } from "@tanstack/react-query";


async function listBanks() {
    const response = await API.get<ListBankAccounts>("/api/v1/banks");
    return response.data;
}

export function useBanks() {
    const queryKey = ["banks"];
    const query = useQuery({
        queryKey,
        queryFn: listBanks,
        retry: false,
        refetchInterval: 1000 * 60 * 5,
        staleTime: 1000 * 60 * 5,
    });

    return {
        ...query,
        data: query.data,
        isEmpty: query.data?.totalAccounts === 0,
        queryKey,
    };
}
