import { createRoot } from "react-dom/client";
import { startTransition } from "react";
import App from "./App.tsx";
import "./index.css";

// Use startTransition to mark the initial render as non-urgent,
// allowing the browser to remain responsive to user input
startTransition(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
