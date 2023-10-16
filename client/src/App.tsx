import { PropsWithChildren } from "react";
import useAuthStore from "./stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./services/auth-service";

type AppProps = PropsWithChildren;

function App({ children }: AppProps) {
  const { isAuthenticated, setUser, logout } = useAuthStore();

  useQuery({
    queryKey: ["user"],
    queryFn: getProfile,
    enabled: isAuthenticated,
    onSuccess: (data: any) => {
      setUser(data?.data);
    },
    onError: (error: any) => {
      logout();
    },
  });
  return <>{children}</>;
}

export default App;
