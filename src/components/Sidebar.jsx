import { NavLink } from "react-router-dom";
import { AiFillAppstore, AiFillCustomerService } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { FaChevronRight, FaUsers } from "react-icons/fa";
import { MdWidgets } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
    const { profile, isAdmin, signOut } = useAuth();

    const allMenus = [
        // Menu Admin/Staff
        { id: "dashboard",  name: "Dashboard",        icon: <AiFillAppstore size={22} />,       to: "/",          roles: ["admin", "staff"] },
        { id: "orders",     name: "Orders",            icon: <HiOutlineShoppingBag size={22} />, to: "/orders",    roles: ["admin", "staff"] },
        { id: "customers",  name: "Customers",         icon: <AiFillCustomerService size={22} />, to: "/customers", roles: ["admin", "staff"] },
        { id: "produk",     name: "Produk",            icon: <MdWidgets size={22} />,            to: "/produk",    roles: ["admin", "staff"] },
        { id: "users",      name: "Manajemen User",    icon: <FaUsers size={20} />,              to: "/users",     roles: ["admin"] },
        { id: "notes",      name: "Notes",             icon: <TbListDetails size={22} />,        to: "/notes",     roles: ["admin", "staff"] },
        
        // Menu Member
        { id: "member-dash",  name: "Loyalty Dashboard",  icon: <AiFillAppstore size={22} />,       to: "/member",          roles: ["member"] },
        { id: "member-orders",name: "Riwayat Belanja",    icon: <HiOutlineShoppingBag size={22} />, to: "/member/orders",   roles: ["member"] },
    ];

    const currentRole = profile?.role || "staff";
    const menuList = allMenus.filter(m => m.roles.includes(currentRole));

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive
            ? "text-hijau bg-green-200 font-extrabold"
            : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

    const displayName = profile?.full_name || "Pengguna";
    const roleLabel = profile?.role === "admin" ? "Administrator" : profile?.role === "member" ? "Pelanggan VIP" : "Staff";

    return (
        <div className="w-72 bg-[#F8F9FA] min-h-screen flex flex-col justify-between border-r border-gray-200/60 p-4 sticky top-0 h-screen">
            
            <div>
                {/* Logo Section */}
                <div className="px-4 py-8 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                            <span className="text-white font-black text-xl">S</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 leading-none">
                                Sedap<span className="text-green-500">.</span>
                            </h1>
                            <p className="text-[10px] text-gray-400 font-medium mt-1">MANAGEMENT SYSTEM</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 ml-4 mb-4 uppercase tracking-[2px]">Overview</p>
                    <ul className="space-y-2">
                        {menuList.map((item) => (
                            <li key={item.id}>
                                <NavLink to={item.to} end={item.to === "/"} className={menuClass}>
                                    {({ isActive }) => (
                                        <>
                                            <div className="flex items-center gap-4 z-10">
                                                <span className={`${isActive ? "text-green-500" : "text-gray-400 group-hover:text-green-400"} transition-colors duration-300`}>
                                                    {item.icon}
                                                </span>
                                                <span className={`font-semibold text-sm ${isActive ? "opacity-100" : "opacity-80"}`}>
                                                    {item.name}
                                                </span>
                                            </div>

                                            {isActive && (
                                                <>
                                                    <FaChevronRight size={10} className="text-green-500" />
                                                    <div className="absolute left-0 w-1.5 h-6 bg-green-500 rounded-r-full"></div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Footer: Profile Card Section */}
            <div className="relative mt-auto pt-10">
                <div className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-xl shadow-gray-200/50 text-center relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                        <div className="relative">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
                                className="w-20 h-20 rounded-3xl border-4 border-white shadow-2xl object-cover rotate-3 hover:rotate-0 transition-transform duration-500"
                                alt="avatar"
                            />
                            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h4 className="font-bold text-gray-800 text-sm">{displayName}</h4>
                        <p className="text-[11px] text-gray-400 mt-1 mb-5">{roleLabel}</p>
                        
                        <button
                            onClick={signOut}
                            className="group w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-red-600 text-white text-[11px] font-bold py-3 rounded-2xl transition-all duration-300 active:scale-95"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                <div className="mt-8 px-2 flex justify-between items-center opacity-40 grayscale">
                   <span className="text-[9px] font-bold text-gray-500">SEDAP V.2.0</span>
                   <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                   </div>
                </div>
            </div>
        </div>
    );
}