import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayouts({ searchTerm, setSearchTerm }) {
    return (
        <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}