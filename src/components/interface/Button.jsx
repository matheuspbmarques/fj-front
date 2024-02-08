import fonts from "@/configs/fonts";

export default function IButton({ children, className, onClick, type, disable }){
    return <button
        className={`
            ${fonts.kulimPark.default} text-base ${disable ? 'bg-green-block cursor-wait' : 'bg-green-default hover:bg-green-hover'}
            duration-300 rounded py-3 px-2 text-zinc-50 ${className}
        `}
        onClick={onClick}
        type={type}
        disabled={disable}
    >
        { children }
    </button>
}