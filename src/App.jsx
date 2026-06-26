import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./assets/tailwind.css";

import React, { Suspense } from "react";
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
const MainLayouts = React.lazy(() => import("./layouts/MainLayouts"));
const AuthLayout  = React.lazy(() => import("./layouts/AuthLayout"));

// Components
const NotFound = React.lazy(() => import("./components/NotFound"));

// Pages
const Dashboard      = React.lazy(() => import("./pages/Dashboard"));
const Orders         = React.lazy(() => import("./pages/Orders"));
const Customers      = React.lazy(() => import("./pages/Customers"));
const CustomerDetail = React.lazy(() => import("./pages/CustomerDetail"));
const Produk         = React.lazy(() => import("./pages/Produk"));
const ProductDetail  = React.lazy(() => import("./pages/ProductDetail"));
const Components     = React.lazy(() => import("./pages/Components"));
const UserManagement = React.lazy(() => import("./pages/UserManagement"));
const Login          = React.lazy(() => import("./pages/auth/Login"));
const Register       = React.lazy(() => import("./pages/auth/Register"));
const Forgot         = React.lazy(() => import("./pages/auth/Forgot"));
const Note           = React.lazy(() => import("./pages/Note"));

// Member Pages
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
const MemberOrders    = React.lazy(() => import("./pages/member/MemberOrders"));

function App() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Semua rute di dalam MainLayouts — dilindungi ProtectedRoute */}
                <Route element={
                    <ProtectedRoute>
                        <MainLayouts searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    </ProtectedRoute>
                }>
                    {/* Admin/Staff Routes */}
                    <Route path="/"                element={<Dashboard searchTerm={searchTerm} />} />
                    <Route path="/orders"          element={<Orders />} />
                    <Route path="/customers"       element={<Customers />} />
                    <Route path="/customers/:id"   element={<CustomerDetail />} />
                    <Route path="/produk"          element={<Produk />} />
                    <Route path="/products/:id"    element={<ProductDetail />} />
                    <Route path="/users"           element={<UserManagement />} />
                    <Route path="/components"      element={<Components />} />
                    <Route path="/notes"           element={<Note />} />
                    
                    {/* Member Routes */}
                    <Route path="/member"          element={<MemberDashboard />} />
                    <Route path="/member/orders"   element={<MemberOrders />} />

                    {/* Halaman Error Statis */}
                    <Route path="/400" element={
                        <NotFound code="400" title="Bad Request"
                            description="Permintaan tidak valid (Bad Request)."
                            imageUrl="https://cdn-icons-png.flaticon.com/512/8281/8281802.png" />
                    } />
                    <Route path="/401" element={
                        <NotFound code="401" title="Unauthorized"
                            description="Anda tidak memiliki izin akses (Unauthorized)."
                            imageUrl="https://cdn-icons-png.flaticon.com/512/2598/2598851.png" />
                    } />
                    <Route path="/403" element={
                        <NotFound code="403" title="Forbidden"
                            description="Akses halaman ini dilarang (Forbidden)."
                            imageUrl="https://cdn-icons-png.flaticon.com/512/3855/3855833.png" />
                    } />

                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* Semua rute di dalam AuthLayout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login"    element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot"   element={<Forgot />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;