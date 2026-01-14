import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Authprovider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="233650429634-vb7sbhh5hr54jhrth9984ecafv08n329.apps.googleusercontent.com">
      <BrowserRouter>
        <Authprovider>
          <App />
        </Authprovider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
