import { Search } from "lucide-react";

const templates = [
    { name: "Ramadhan Saltur", url: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop" },
    { name: "Ramadhan NgAbubuit", url: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop" },
    { name: "Ramadhan Iffar", url: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop" },
    { name: "Ramadhan Tarswih", url: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop" },
];

export default function LeftPanel() {
    return (
        <aside className="w-[300px] border-r border-[#0f2e2e]/60 bg-[#030d0e] flex flex-col h-full overflow-y-auto overflow-x-hidden text-[#e2f1f0] shrink-0">
            <div className="p-4 flex flex-col gap-6">

                {/* Templates Box */}
                <div className="rounded-xl border border-[#0f2e2e] bg-[#061819] p-4 flex flex-col gap-4">
                    <h2 className="text-sm font-medium text-[#2dd4bf] uppercase tracking-wider">Templates</h2>

                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#437575]" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="w-full bg-[#030d0e] border border-[#0f2e2e] rounded-md pl-9 pr-3 py-2 text-xs text-[#e2f1f0] focus:outline-none focus:border-[#2dd4bf]/50 transition-all placeholder:text-[#437575]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {templates.map((t, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
                                <div className="rounded border border-[#0f2e2e] overflow-hidden w-full aspect-square bg-[#030d0e]">
                                    <img src={t.url} alt={t.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300" />
                                </div>
                                <span className="text-[11px] font-medium text-center text-[#9dbcb9] leading-tight">
                                    {t.name.replace("Ramadhan ", "Ramadhan\n")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Logs Section */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-base font-medium text-[#edfdfd] pl-1">Logs</h2>
                    <div className="rounded-xl border border-[#0f2e2e] bg-[#061819] p-4 flex flex-col min-h-[160px]">
                        <h3 className="text-sm font-medium text-[#edfdfd] mb-4">Output</h3>

                        <div className="flex flex-col gap-1 text-xs">
                            <span className="text-[#648e8c]">12:07:08</span>
                            <p className="text-[#a5c6c4]">
                                <span className="text-[#4dd0e1]">Prompt</span> : Generated a new prompt
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}
