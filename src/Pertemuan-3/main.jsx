import { createRoot } from "react-dom/client";
import Tailwindcss from "./TailwindCSS";
import './tailwind.css';
createRoot(document.getElementById("root"))
    .render(
        <div>
             <Tailwindcss/>
        </div>
    )