import fonts from "@/configs/fonts";

export default function IButton({ children, className }){
    return <button className={`${fonts.kulimPark.default} text-base bg-green-default hover:bg-green-hover duration-300 rounded py-3 px-2 text-zinc-50 ${className}`}>
        { children }
    </button>
}