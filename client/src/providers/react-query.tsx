import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";
import SocketProvider from "./socket";

type ReactQueryProviderProps = PropsWithChildren;

const config = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: config })
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <SocketProvider />
      <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
