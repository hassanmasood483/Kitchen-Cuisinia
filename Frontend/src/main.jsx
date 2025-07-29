import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StoreContextProvidor } from "./context/StoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvidor>
      <App />
    </StoreContextProvidor>
  </BrowserRouter>
);
