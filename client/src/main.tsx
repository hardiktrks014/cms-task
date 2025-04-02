import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom CSS variables for CMS Design System colors
const style = document.createElement('style');
style.textContent = `
  :root {
    --cms-primary: #0071bc;
    --cms-secondary: #2e6da4;
    --cms-accent: #fdb81e;
    --cms-dark: #212121;
    --cms-gray: #5b616b;
    --cms-gray-light: #d6d7d9;
    --cms-gray-lighter: #f1f1f1;
    --cms-success: #2e8540;
    --cms-error: #e31c3d;
    --cms-info: #02bfe7;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
