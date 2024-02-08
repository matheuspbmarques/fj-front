import { useState } from "react"
import IButton from "../interface/Button"
import IForm from "../interface/IForm"
import IIpunt from "../interface/IInput"
import Popup from "../interface/Popup"
import { useRouter } from "next/navigation"
import Mask from "@/tools/Mask"

export default function FilterPopup({ close }){
    const router = useRouter()

    const [error, setError] = useState()
    const [phone, setPhone] = useState('')

    function submit(error, filters){
        if(error){
            setError(data)

            return
        }

        const keys = Object.keys(filters)
        let filtersQuery = ''

        for(const key of keys){
            const value = filters[key]

            filtersQuery += value != '' ? filtersQuery == '' ? `?${key}=${value}` : `?${key}=${value}` : ''

            close()
            router.push(`/dashboard/clients${filtersQuery}`)
        }
    }

    return(
        <Popup title={'Filtrar por:'} close={close} className={`w-full max-w-80`}>
            <IForm
                className="flex flex-col gap-2"
                submit={submit}
            >
                <IIpunt label={'Nome'} inputId={'name'} name={'name'} errorMessage={error?.name?.errorMessage} onChange={() => setError(undefined)} />
                <IIpunt label={'E-mail'} inputId={'email'} name={'email'} errorMessage={error?.email?.errorMessage} onChange={() => setError(undefined)} />
                <IIpunt label={'Telefone'} inputId={'phone'} name={'phone'} errorMessage={error?.phone?.errorMessage}
                    onChange={(e) => {
                        setPhone(Mask.phone(e.target.value))
                        setError(undefined)
                    }}
                    value={phone}
                />
                <IButton type={'submit'} className={'w-full'}>Filtrar</IButton>
            </IForm>
        </Popup>
    )
}