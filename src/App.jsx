import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/tailwind.css";

import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./components/NotFound";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // cek apakah route valid
    const validRoutes = ["/", "/orders", "/customers"];
    const isErrorPage = !validRoutes.includes(location.pathname);

    // 👉 kalau error → tampil full screen TANPA sidebar
    if (isErrorPage) {
        return <NotFound />;
    }

    return (
        <div className="flex min-h-screen bg-[#FDFDFD] font-sans">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <div className="flex-1 p-4 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;