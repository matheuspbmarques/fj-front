import fonts from "@/configs/fonts";
import IButton from "./Button";
import GoogleIcons from "../GoogleIcons";

export default function Popup({ children, title, close, className, disableClose }){
    return(
        <div className="bg-zinc-900/25 w-full min-h-dvh fixed top-0 flex items-center justify-center p-6">
            <div className="absolute w-full h-full p-6">
                <div className={`bg-zinc-50 p-4 rounded-lg flex flex-col gap-4 ${className}`}>
                    <header className="flex justify-between items-center">
                        <h2 className={`${fonts.kulimPark.bold} text-lg`}>{ title }</h2>
                        <IButton className={'flex !p-1'} onClick={close} disable={disableClose}>
                            <GoogleIcons name={'close_small'} />
                        </IButton>
                    </header>
                    { children }
                </div>
            </div>
        </div>
    )
}