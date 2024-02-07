import GoogleIcons from "@/components/GoogleIcons"
import IButton from "@/components/interface/Button"
import DashboardLayout from "@/components/layouts/Dashboard"
import fonts from "@/configs/fonts"
import { zinc } from 'tailwindcss/colors'

export default function Client(){
    return(
        <DashboardLayout>
            <h1 className={`${fonts.kulimPark.bold} text-2xl`}>Clientes</h1>

            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <IButton className={`flex items-center justify-center gap-2 flex-1`}>
                        <GoogleIcons name={'filter_list'} color={zinc[50]} />
                        Filtrar
                    </IButton>
                    <IButton className={`flex items-center justify-center gap-2 flex-1`}>
                        <GoogleIcons name={'add'} color={zinc[50]} />
                        Adicionar
                    </IButton>
                </div>
                <IButton className={`flex items-center justify-center gap-2 flex-1`}>
                    <GoogleIcons name={'route'} color={zinc[50]} />
                    Ordem de visita
                </IButton>
            </div>
        </DashboardLayout>
    )
}