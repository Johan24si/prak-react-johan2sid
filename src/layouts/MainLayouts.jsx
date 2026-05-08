import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayouts(){
    return(
 <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header/>
                <div className="flex-1 p-4 overflow-y-auto">
                <Header/>
                <Outlet/>   
                </div>
            </div>
        </div>
    );
}