import { API } from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";
import { useLayoutEffect, type PropsWithChildren } from "react";

export default function APIInterceptorProvider({
  children,
}: PropsWithChildren) {
  const { getToken } = useAuth();

  useLayoutEffect(() => {
    const interceptor = API.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token && config.headers)
        config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => {
      API.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return <>{children}</>;
}
