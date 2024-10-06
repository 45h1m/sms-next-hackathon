import { User } from "lucide-react";


const Header = () => {
    return (
        <header className="border-b-2 border-white/20 sticky top-0 z-10">
            <div className="flex items-center p-4 bg-emerald-700">
                <div className="left">
                    <p className="logo text-white font-bold text-xl tracking-wide flex items-center">EDU <img className="px-2 grayscale brightness-200" width="50" src="/pecha.png"/> Admin</p>
                    
                </div>
                <div className="flex flex-1"></div>
                <div className="right">
                    <div className="size-10 bg-emerald-200 rounded-full relative flex items-center justify-center"><User className="text-black/40" /></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
