import React from "react";
import ReactDOM from "react-dom/client";

import RenderRoutes from "./routes";

// Tailwind css
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RenderRoutes />
  </React.StrictMode>
);
