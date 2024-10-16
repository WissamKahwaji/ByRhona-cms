import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Wrapper from "./Wrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Wrapper />
  </StrictMode>
);
