import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { orders } from "../data/orders";
import { 
    HiPlus, 
    HiOutlineSearch, 
    HiOutlineDocumentDownload, 
    HiDotsHorizontal,
    HiOutlineCube
} from "react-icons/hi";

export default function Orders({ searchTerm = "" }) {
    const [showModal, setShowModal] = useState(false);

    const filtered = orders.filter((o) =>
        o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FDFDFD] p-8 md:p-12 relative overflow-hidden text-slate-900 font-sans">
            
            {/* AMBIENT LIGHTING BACKGROUND */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-100/30 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/20 blur-[100px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                
                {/* ✅ ELITE HEADER SECTION */}
                <PageHeader
                    title="Orders"
                    breadcrumb={["Operations", "Orders"]}
                >
                    <div className="flex gap-4">
                        <button className="hidden md:flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-500 rounded-2xl hover:text-indigo-600 hover:shadow-xl hover:shadow-indigo-50 transition-all font-bold text-xs uppercase tracking-widest">
                            <HiOutlineDocumentDownload className="text-lg" />
                            Report
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="group flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-200 hover:bg-indigo-600 hover:-translate-y-1 active:translate-y-0 transition-all font-bold text-sm"
                        >
                            <HiPlus className="group-hover:rotate-90 transition-transform" />
                            Create Order
                        </button>
                    </div>
                </PageHeader>

                {/* 📊 TABLE CARD - ULTRA SLEEK */}
                <div className="mt-12 bg-white/70 backdrop-blur-md border border-white rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50">
                                    <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Order Ref</th>
                                    <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Client</th>
                                    <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-center">Status</th>
                                    <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-right">Revenue</th>
                                    <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.length > 0 ? (
                                    filtered.map((o) => (
                                        <tr key={o.orderId} className="group hover:bg-slate-50/50 transition-all duration-300">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-3 font-mono text-[11px] font-black text-indigo-500">
                                                    <span className="w-2 h-2 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform"></span>
                                                    ORD-{o.orderId}
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm border border-white shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                        {o.customerName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-slate-800 text-sm tracking-tight">{o.customerName}</div>
                                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{o.orderDate}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-center">
                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border
                                                    ${o.status === 'Completed' || o.status === 'Selesai' 
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                                        : o.status === 'Pending' || o.status === 'Menunggu' 
                                                        ? 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse' 
                                                        : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right font-black text-slate-900 text-sm tracking-tighter">
                                                {o.totalPrice}
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-white rounded-lg shadow-none hover:shadow-sm transition-all">
                                                    <HiDotsHorizontal />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-10 py-32 text-center">
                                            <div className="flex flex-col items-center justify-center grayscale opacity-20">
                                                <HiOutlineCube className="text-8xl mb-4" />
                                                <p className="text-2xl font-black uppercase tracking-widest italic">No Data Stream</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 🛡️ PREMIUM MODAL DESIGN */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <div 
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl transition-all duration-500"
                            onClick={() => setShowModal(false)}
                        ></div>
                        
                        <div className="relative bg-white/90 border border-white rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] max-w-md w-full p-12 transform transition-all animate-in zoom-in duration-300">
                            <div className="mb-10 text-center">
                                <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-3">
                                    <HiPlus className="text-3xl" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Register Order</h2>
                                <p className="text-slate-400 text-sm mt-2">Initialize a new transaction record.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="group">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2 transition-colors group-focus-within:text-indigo-600">Customer Identity</label>
                                    <input 
                                        type="text"
                                        placeholder="Full Name" 
                                        className="w-full bg-slate-50 border-none rounded-[1.2rem] px-6 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/5 focus:bg-white shadow-inner transition-all"
                                    />
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2 transition-colors group-focus-within:text-indigo-600">Order Amount</label>
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-300">Rp</div>
                                        <input 
                                            type="number"
                                            placeholder="0.00" 
                                            className="w-full bg-slate-50 border-none rounded-[1.2rem] px-14 py-4 text-slate-700 font-bold focus:ring-4 focus:ring-indigo-500/5 focus:bg-white shadow-inner transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex flex-col gap-3">
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] hover:bg-indigo-600 shadow-2xl shadow-indigo-100 transition-all hover:-translate-y-1 active:translate-y-0"
                                >
                                    CONFIRM TRANSACTION
                                </button>
                                <button 
                                    onClick={() => setShowModal(false)}
                                    className="w-full text-slate-400 font-bold py-2 text-[10px] uppercase tracking-[0.3em] hover:text-rose-500 transition-colors"
                                >
                                    Discard Change
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}