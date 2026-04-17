import { createRoot } from "react-dom/client";

import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
createRoot(document.getElementById("root"))
    .render(
        <div>
             {/* <FrameworkList/> */}
             <FrameworkListSearchFilter/>
        </div>
    )