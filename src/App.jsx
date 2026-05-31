import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./assets/tailwind.css";

import React, { Suspense } from "react";
import Loading from "./components/Loading";

// Layouts
const MainLayouts = React.lazy(() => import("./layouts/MainLayouts"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Components
const Sidebar = React.lazy(() => import("./components/Sidebar"));
const Header = React.lazy(() => import("./components/Header"));
const NotFound = React.lazy(() => import("./components/NotFound"));

// Menggunakan React.lazy untuk halaman (Pages)
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Components = React.lazy(() => import("./pages/Components"));


function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // cek apakah route valid
    const validRoutes = ["/", "/orders", "/customers", "/components", "/login", "/register", "/forgot"];
    const isErrorPage = !validRoutes.includes(location.pathname);

    // 👉 kalau error → tampil full screen TANPA sidebar
    if (isErrorPage) {
        return <NotFound />;
    }

    return (
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route element={<MainLayouts/>}>
                        <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/components" element={<Components />} />
                        <Route path="/400" element={
                            <NotFound 
                                code="400" 
                                title="Bad Request" 
                                description="Permintaan tidak valid (Bad Request)." 
                                imageUrl="https://cdn-icons-png.flaticon.com/512/8281/8281802.png" 
                            />
                        } />
                        <Route path="/401" element={
                            <NotFound 
                                code="401" 
                                title="Unauthorized" 
                                description="Anda tidak memiliki izin akses (Unauthorized)." 
                                imageUrl="https://cdn-icons-png.flaticon.com/512/2598/2598851.png" 
                            />
                        } />
                        <Route path="/403" element={
                            <NotFound 
                                code="403" 
                                title="Forbidden" 
                                description="Akses halaman ini dilarang (Forbidden)." 
                                imageUrl="https://cdn-icons-png.flaticon.com/512/3855/3855833.png" 
                            />
                        } />

                        {/* Catch-all untuk 404 asli */}
                        <Route path="*" element={<NotFound />} />
                        </Route>

                         <Route element={<AuthLayout/>}>
                         <Route path="/login" element={<Login />} />
                         <Route path="/register" element={<Register/>} />
                         <Route path="/forgot" element={<Forgot/>} />
                        </Route>
                    </Routes>
                    </Suspense>
                
    );
}

export default App;