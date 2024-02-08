import GoogleIcons from "@/components/GoogleIcons"
import FilterPopup from "@/components/Popups/FilterPopup"
import RegisterPopup from "@/components/Popups/RegisterPopup"
import RoutePopup from "@/components/Popups/RoutePopup"
import IButton from "@/components/interface/Button"
import DashboardLayout from "@/components/layouts/Dashboard"
import fonts from "@/configs/fonts"
import { useState } from "react"
import { zinc } from 'tailwindcss/colors'

export const fakeList = [
    {
        name: 'João da Silva',
        email: 'joao.silva@exemplo.com',
        phone: '(91) 91234-8920',
        coordenada_x: '-1.231212',
        coordenada_y: '-28.2132'
    },
    {
        name: 'Carlos de Nobrega',
        email: 'carlos.nobrega@exemplo.com',
        phone: '(91) 91234-1203',
        coordenada_x: '-1.123192',
        coordenada_y: '-28.2392342'
    },
    {
        name: 'Renata Puttin',
        email: 'renata.Puttin@exemplo.com',
        phone: '(91) 91234-7654',
        coordenada_x: '-1.39482934',
        coordenada_y: '-28.2980234'
    }
]

export default function Client(){
    const [showFilterPopup, setShowFilterPopup] = useState(false)
    const [showRegisterPopup, setShowRegisterPopup] = useState(false)
    const [showRoutePopup, setShowRoutePopup] = useState(false)

    const renderFakeList = fakeList.map(({ name, email, phone, coordenada_x, coordenada_y }, index) => {
        return(
            <tr key={index} className={`${ index % 2 === 0 ? 'bg-green-default/25' : 'bg-green-default/10' }`}>
                <td className="p-2">{ name }</td>
                <td className="p-2">{ email }</td>
                <td className="p-2">{ phone }</td>
                <td className="p-2">{ coordenada_x }</td>
                <td className="p-2">{ coordenada_y }</td>
            </tr>
        )
    })

    return(
        <DashboardLayout>
            <h1 className={`${fonts.kulimPark.bold} text-2xl px-6`}>Clientes</h1>

            {/**Buttons */}
            <div className="flex flex-col gap-2 px-6">
                <div className="flex gap-2">
                    <IButton className={`flex items-center justify-center gap-2 flex-1`} onClick={() => setShowFilterPopup(true)}>
                        <GoogleIcons name={'filter_list'} color={zinc[50]} />
                        Filtrar
                    </IButton>
                    <IButton className={`flex items-center justify-center gap-2 flex-1`} onClick={() => setShowRegisterPopup(true)}>
                        <GoogleIcons name={'add'} color={zinc[50]} />
                        Adicionar
                    </IButton>
                </div>
                <IButton className={`flex items-center justify-center gap-2 flex-1`} onClick={() => setShowRoutePopup(true)}>
                    <GoogleIcons name={'route'} color={zinc[50]} />
                    Ordem de visita
                </IButton>
            </div>

            {/**Table container */}
            <div className="w-full h-max overflow-x-scroll" draggable={true}>
                {/**Table contents */}
                <div className="px-6 w-max">
                    <table className="rounded overflow-hidden">
                        <thead>
                            <tr className="bg-green-default text-zinc-50">
                                <th className={`p-2`}>Nome</th>
                                <th className={`p-2`}>Email</th>
                                <th className={`p-2`}>Telefone</th>
                                <th className={`p-2`}>Coordenada X</th>
                                <th className={`p-2`}>Coordenada Y</th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderFakeList }
                        </tbody>
                    </table>
                </div>
            </div>

            {showFilterPopup && <FilterPopup close={() => setShowFilterPopup(false)} />}
            {showRegisterPopup && <RegisterPopup close={() => setShowRegisterPopup(false)} />}
            {showRoutePopup && <RoutePopup close={() => setShowRoutePopup(false)} />}
        </DashboardLayout>
    )
}