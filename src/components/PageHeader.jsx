export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
            
            {/* LEFT */}
            <div className="space-y-2">
                <h1 className="text-4xl font-black tracking-tighter italic text-slate-950">
                    {title}<span className="text-blue-600">.</span>
                </h1>

                <div className="text-gray-400 text-sm">
                    {Array.isArray(breadcrumb)
                        ? breadcrumb.map((item, i) => (
                            <span key={i}>
                                {item}
                                {i < breadcrumb.length - 1 && " / "}
                            </span>
                        ))
                        : breadcrumb}
                </div>
            </div>

            {/* RIGHT */}
            <div>{children}</div>
        </div>
    );
}