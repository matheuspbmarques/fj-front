import GoogleIcons from "@/components/GoogleIcons"
import FilterPopup from "@/components/Popups/FilterPopup"
import RegisterPopup from "@/components/Popups/RegisterPopup"
import RoutePopup from "@/components/Popups/RoutePopup"
import IButton from "@/components/interface/Button"
import DashboardLayout from "@/components/layouts/Dashboard"
import fonts from "@/configs/fonts"
import { useEffect, useState } from "react"
import { zinc } from 'tailwindcss/colors'
import Clients from "@/apis/cleanHouse/Clients"
import Lottie from "lottie-react"
import emptyListAnimation from '../../assets/animations/empty-list.json'
import searchAnimation from '../../assets/animations/search.json'
import { useRouter, useSearchParams } from "next/navigation"

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
    const params = useSearchParams()
    const router = useRouter()

    const name = params.get('name')
    const email = params.get('email')
    const phone = params.get('phone')

    const [showFilterPopup, setShowFilterPopup] = useState(false)
    const [showRegisterPopup, setShowRegisterPopup] = useState(false)
    const [showRoutePopup, setShowRoutePopup] = useState(false)
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    const renderClients = clients?.map(({ name, email, phone, coordinate_x, coordinate_y }, index) => {
        return(
            <tr key={index} className={`${ index % 2 === 0 ? 'bg-green-default/25' : 'bg-green-default/10' }`}>
                <td className="p-2 whitespace-nowrap">{ name }</td>
                <td className="p-2 whitespace-nowrap">{ email }</td>
                <td className="p-2 whitespace-nowrap">{ phone }</td>
                <td className="p-2 whitespace-nowrap">{ coordinate_x }</td>
                <td className="p-2 whitespace-nowrap">{ coordinate_y }</td>
            </tr>
        )
    })

    function getAllClients(name, email, phone){
        Clients.getAll({ name: name, email: email, phone: phone }).then(({ data }) => {
            setClients(data)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllClients(name, email, phone)
    }, [name, email, phone])

    return(
        <DashboardLayout>
            <h1 className={`${fonts.kulimPark.bold} text-2xl px-6`}>Clientes</h1>

            {/**Buttons */}
            <div className="flex flex-col gap-2 px-6">
                <div className="flex gap-6">
                    <div className="flex flex-1 gap-1">
                        <IButton className={`flex items-center justify-center gap-2 flex-1`} onClick={() => setShowFilterPopup(true)}>
                            <GoogleIcons name={'filter_list'} color={zinc[50]} />
                            Filtrar
                        </IButton>

                        <IButton className={`flex items-center justify-center gap-2 px-3 pr-4 bg-rose-600 hover:bg-rose-500`} onClick={() => router.push(`/dashboard/clients`)}>
                            <GoogleIcons name={'close_small'} color={zinc[50]} />
                            Limpar
                        </IButton>
                    </div>
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
                <div className="px-6 w-full">
                    {
                        loading
                        ?
                        <div className="flex flex-col gap-4">
                            <Lottie animationData={searchAnimation} loop={true} className="h-80" />
                            <span className="text-center">Procurando clientes...</span>
                        </div>
                        :
                        clients.length > 0
                            ?
                            <table className="rounded overflow-hidden w-full">
                                <thead>
                                    <tr className="bg-green-default text-zinc-50">
                                        <th className={`p-2 whitespace-nowrap text-start`}>Nome</th>
                                        <th className={`p-2 whitespace-nowrap text-start`}>Email</th>
                                        <th className={`p-2 whitespace-nowrap text-start`}>Telefone</th>
                                        <th className={`p-2 whitespace-nowrap text-start`}>Coordenada X</th>
                                        <th className={`p-2 whitespace-nowrap text-start`}>Coordenada Y</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { renderClients }
                                </tbody>
                            </table>
                            :
                            <div className="flex flex-1 flex-col items-center w-full">
                                <Lottie animationData={emptyListAnimation} loop={true} className="h-80" />
                                <span className="text-center">Ops! Nenhum cliente encontrado.</span>
                            </div>
                    }
                </div>
            </div>

            {showFilterPopup && <FilterPopup close={() => setShowFilterPopup(false)} />}
            {showRegisterPopup && <RegisterPopup close={() => setShowRegisterPopup(false)} getClients={getAllClients} />}
            {showRoutePopup && <RoutePopup close={() => setShowRoutePopup(false)} />}
        </DashboardLayout>
    )
}