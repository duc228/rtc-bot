import React from "react";
import ReactDOM from "react-dom/client";

import RenderRoutes from "./routes";

import { Toaster } from "react-hot-toast";

// Tailwind css
import "./index.css";

// React Query
import ReactQueryProvider from "./providers/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <RenderRoutes />
      <Toaster position="top-right" />
    </ReactQueryProvider>
  </React.StrictMode>
);
