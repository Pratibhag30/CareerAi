import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-md border-b border-purple-100 fixed top-0 left-0">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                <ArrowLeft className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-semibold">Back to Dashboard</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg bg-gradient-to-r from-purple-500 to-indigo-500">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        CareerAI
                    </h2>
                    <p className="text-xs text-purple-600 font-medium">Your AI Career Guide</p>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
