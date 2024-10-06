import { LoaderCircle } from "lucide-react";

const Button = ({disabled, text, children, loading, onclick, customClass}) => {
    return <button disabled={disabled} onClick={onclick} className={`flex w-fit items-center gap-2 h-12 px-6 rounded-lg font-semibold bg-emerald-400 ${customClass ? customClass : ""}`}>{loading ? <LoaderCircle className="animate-spin" /> : children}</button>;
};

export default Button;