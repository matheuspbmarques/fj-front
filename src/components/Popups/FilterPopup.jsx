import IButton from "../interface/Button"
import IIpunt from "../interface/IInput"
import Popup from "../interface/Popup"

export default function FilterPopup({ close }){
    return(
        <Popup title={'Filtrar por:'} close={close}>
            <IIpunt label={'Nome'} inputId={'name'} />
            <IIpunt label={'E-mail'} inputId={'email'} />
            <IIpunt label={'Telefone'} inputId={'phone'} />
            <IButton>Filtrar</IButton>
        </Popup>
    )
}