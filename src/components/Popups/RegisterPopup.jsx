import IButton from "../interface/Button";
import IIpunt from "../interface/IInput";
import Popup from "../interface/Popup";
import IForm from "../interface/IForm";
import Clients from '../../apis/cleanHouse/Clients'
import { useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from '../../assets/animations/loading-gray.json'
import Mask from "@/tools/Mask";

export default function RegisterPopup({ close, getClients }){
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState('')

    function register(error, data){
        setLoading(true)

        if(error){
            setError(data)
            setLoading(false)

            return
        }

        Clients.create(data.name, data.email, data.phone, data.coordinateX, data.coordinateY).then(() => {
            getClients()
            close()
        })
    }

    return(
        <Popup close={close} title={'Novo cliente'} disableClose={loading} className={`w-full max-w-80`}>
            <IForm
                className={`flex flex-col gap-2`}
                submit={register}
                verifications={[
                    { // Name
                        inputName: 'name',
                        types: [{ type: 'isDefined', errorMessage: 'O nome do cliente é obrigatório' }]
                    },
                    { // Email
                        inputName: 'email', types: [
                            { type: "isDefined", errorMessage: 'O e-mail é obrigatório' },
                            { type: 'isEmail', errorMessage: 'O e-mail não é valido' }
                        ]
                    },
                    { // Phone
                        inputName: 'phone', types: [
                            { type: 'isDefined', errorMessage: 'Telefone é obrigatório' },
                            { type: 'isPhone', errorMessage: 'O telefone informado é invalido' }
                        ]
                    },
                    { // Coordinate X
                        inputName: 'coordinateX', types: [
                            { type: 'isDefined', errorMessage: 'Coordenada X é obrigatória' }
                        ]
                    },
                    { // Coordinate Y
                        inputName: 'coordinateY', types: [
                            { type: 'isDefined', errorMessage: 'Coordenada Y é obrigatória' }
                        ]
                    }
                ]}
            >
                <IIpunt label={'Nome'} inputId={'name'} name={'name'} errorMessage={error?.name?.errorMessage} onChange={() => setError(undefined)} />
                <IIpunt label={'E-mail'} inputId={'email'} name={'email'} errorMessage={error?.email?.errorMessage} onChange={() => setError(undefined)} />
                <IIpunt label={'Telefone'} inputId={'phone'} name={'phone'} errorMessage={error?.phone?.errorMessage}
                    onChange={(e) => {
                        setError(undefined)
                        setPhone(Mask.phone(e.target.value))
                    }}
                    value={phone}
                    inputMode={'numeric'}
                    maxLength={15}
                />
                <IIpunt label={'Coordenada X'} inputId={'coordinate-x'} name={'coordinateX'} errorMessage={error?.coordinateX?.errorMessage} onChange={() => setError(undefined)} />
                <IIpunt label={'Coordenada Y'} inputId={'coordinate-y'} name={'coordinateY'} errorMessage={error?.coordinateY?.errorMessage} onChange={() => setError(undefined)} />
                <IButton type={'submit'} disable={loading} >
                    { loading ? <Lottie animationData={loadingAnimation} loop={true} className="h-6" /> : 'Adicionar' }
                </IButton>
            </IForm>
        </Popup>
    )
}