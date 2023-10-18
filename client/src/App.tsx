import { PropsWithChildren } from "react";
import useAuthStore from "./stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./services/auth-service";
import SocketProvider from "./providers/socket";

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
    onError: () => {
      logout();
    },
  });
  return (
    <>
      {children}
      <SocketProvider />
    </>
  );
}

export default App;
