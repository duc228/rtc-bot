import { PropsWithChildren } from "react";

type AppProps = PropsWithChildren;

function App({ children }: AppProps) {
  return <>{children}</>;
}

export default App;
