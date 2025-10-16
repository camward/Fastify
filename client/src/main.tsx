import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  LIGHT_THEME,
  FontsVTBGroup,
  DropdownProvider,
} from "@admiral-ds/react-ui";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={LIGHT_THEME}>
        <DropdownProvider>
          <FontsVTBGroup />
          <App />
        </DropdownProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
