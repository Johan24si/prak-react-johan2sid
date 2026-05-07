import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { customers } from "../data/customers";
import { 
    HiUserAdd, HiMail, HiPhone, HiBadgeCheck, 
    HiDotsVertical, HiSearch, HiFilter, HiOutlineCloudDownload,
    HiTrendingUp
} from "react-icons/hi";

export default function Customers() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen bg-[#F4F7FA] p-8 md:p-12 relative overflow-hidden text-slate-900 font-sans">
            
            {/* 🌌 DYNAMIC AMBIENT LIGHTING */}
            <div className="absolute top-[-15%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-200/20 blur-[160px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-200/20 blur-[140px] rounded-full animate-bounce duration-[10s]"></div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* ✅ ELITE HEADER */}
                <PageHeader
                    title="Client Intelligence"
                    breadcrumb={["Core", "Directory", "Clients"]}
                >
                    <div className="flex items-center gap-4">
                        <button className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-md border border-white text-slate-500 rounded-2xl hover:text-indigo-600 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] transition-all active:scale-95 font-bold text-xs uppercase tracking-widest">
                            <HiOutlineCloudDownload className="text-lg" />
                            Export
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] hover:bg-indigo-600 hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 font-black text-sm tracking-tight"
                        >
                            <HiUserAdd className="text-lg group-hover:scale-125 transition-transform" />
                            <span>Register New Client</span>
                        </button>
                    </div>
                </PageHeader>

                {/* 🔍 SMART ACTION BAR */}
                <div className="mt-12 mb-8 flex flex-col lg:flex-row justify-between items-end lg:items-center gap-6">
                    <div className="relative w-full lg:w-[500px] group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-3 border-r border-slate-100 pr-3">
                            <HiSearch className="text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Identify customer by name, email or global ID..."
                            className="w-full bg-white border-none rounded-[1.5rem] py-5 pl-16 pr-6 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-tighter border border-emerald-100 shadow-sm">
                            <HiTrendingUp />
                            Active Growth: +12%
                        </div>
                        <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-500 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                            <HiFilter />
                            Refine
                        </button>
                    </div>
                </div>

                {/* 💎 GLASS TABLE CARD */}
                <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.08)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/50 border-b border-white/20">
                                    <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400">Client Profile</th>
                                    <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400">Connectivity</th>
                                    <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400 text-center">Engagement Tier</th>
                                    <th className="px-10 py-7 text-[11px] uppercase tracking-[0.25em] font-black text-slate-400 text-right">Options</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/20">
                                {customers.map((c, i) => (
                                    <tr key={c.customerId} className="group hover:bg-white/80 transition-all duration-300">
                                        <td className="px-10 py-7">
                                            <div className="flex items-center gap-6">
                                                <div className="relative group/avatar">
                                                    <div className="w-14 h-14 rounded-[1.4rem] bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center font-black text-white text-xl shadow-xl group-hover/avatar:scale-105 group-hover/avatar:rotate-3 transition-all duration-500">
                                                        {c.customerName.charAt(0)}
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm animate-pulse"></div>
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">{c.customerName}</div>
                                                    <div className="inline-block text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md mt-1 tracking-widest uppercase">ID: {c.customerId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <div className="flex flex-col gap-1">
                                                <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                                    <HiMail className="text-slate-300" />
                                                    {c.email}
                                                </div>
                                                <div className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                                                    <HiPhone className="text-slate-200" />
                                                    {c.phone}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <div className="flex justify-center">
                                                <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 group-hover:scale-110
                                                    ${c.loyalty === 'VIP' ? 'bg-slate-900 text-white shadow-[0_10px_20px_-5px_rgba(15,23,42,0.4)]' : 
                                                      c.loyalty === 'Gold' ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)]' : 
                                                      'bg-white text-slate-500 border border-slate-100'}`}>
                                                    {c.loyalty}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7 text-right">
                                            <button className="w-12 h-12 inline-flex items-center justify-center bg-transparent text-slate-300 rounded-2xl hover:bg-slate-900 hover:text-white hover:shadow-xl transition-all duration-300 group/btn">
                                                <HiDotsVertical className="group-hover/btn:scale-125 transition-transform" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 🛡️ ULTRA-LUXURY MODAL */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div 
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl transition-all animate-in fade-in duration-700"
                            onClick={() => setShowModal(false)}
                        ></div>
                        
                        <div className="relative bg-white border border-white/40 rounded-[4rem] shadow-[0_60px_150px_-30px_rgba(0,0,0,0.5)] max-w-xl w-full p-16 transform transition-all animate-in zoom-in slide-in-from-bottom-20 duration-500">
                            <div className="absolute top-12 right-12">
                                <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center font-black cursor-pointer hover:bg-rose-50 hover:text-rose-500 transition-all" onClick={() => setShowModal(false)}>✕</div>
                            </div>

                            <div className="mb-12">
                                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Onboarding System</span>
                                <h2 className="text-4xl font-black text-slate-900 leading-[0.9] tracking-tighter">New Client<br/><span className="text-indigo-600 italic font-serif tracking-normal">Registration</span></h2>
                            </div>

                            <div className="space-y-8">
                                {[
                                    { label: "Legal Entity Name", icon: <HiUserAdd />, placeholder: "Ex: Jonathan Wick" },
                                    { label: "Business Email", icon: <HiMail />, placeholder: "john@continental.com" },
                                    { label: "Global Secure Line", icon: <HiPhone />, placeholder: "+1 (555) 000-000" }
                                ].map((field, idx) => (
                                    <div key={idx} className="group relative">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-3 ml-2 group-focus-within:text-indigo-600 transition-colors">
                                            {field.label}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all">
                                                {field.icon}
                                            </div>
                                            <input 
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-[1.8rem] py-5 pl-16 pr-8 text-slate-800 font-bold focus:outline-none focus:bg-white focus:border-indigo-100 focus:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all placeholder:text-slate-200"
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16">
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="w-full bg-slate-900 text-white font-black py-6 rounded-[2.2rem] hover:bg-indigo-600 shadow-[0_25px_50px_-12px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-2 active:translate-y-0"
                                >
                                    AUTHORIZE & SAVE DATA
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}