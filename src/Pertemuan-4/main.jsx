import { createRoot } from "react-dom/client";

import './tailwind.css';
import ResponsiveText from "./ResponsiveDesign";
createRoot(document.getElementById("root"))
    .render(
        <div>
             {/* <FrameworkList/> */}
             {/* <FrameworkListSearchFilter/> */}
             <ResponsiveText/>
        </div>
    );