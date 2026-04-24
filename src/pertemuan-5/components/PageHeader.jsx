export default function PageHeader() {
    return (
        <div
            id="pageheader-container"
            className="flex items-center justify-between p-4"
        >
            {/* Kiri */}
            <div
                id="pageheader-left"
                className="flex flex-col"
            >
                <span
                    id="pageheader-title"
                    className="text-3xl font-semibold"
                >
                    Dashboard
                </span>

                <div
                    id="breadcrumb-links"
                    className="flex items-center font-medium space-x-2 mt-2"
                >
                    <span
                        id="breadcrumb-home"
                        className="text-gray-500"
                    >
                        Dashboard
                    </span>

                    <span
                        id="breadcrumb-separator"
                        className="text-gray-500"
                    >
                        /
                    </span>

                    <span
                        id="breadcrumb-current"
                        className="text-gray-500"
                    >
                        Order List
                    </span>
                </div>
            </div>

            {/* Kanan */}
            <div id="action-button">
                <button
                    id="add-button"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Add Button
                </button>
            </div>
        </div>
    );
}