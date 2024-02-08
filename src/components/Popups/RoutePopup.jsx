import { useEffect } from "react";
import Popup from "../interface/Popup";
import { Loader } from '@googlemaps/js-api-loader';
import { fakeList } from "@/pages/dashboard/clients";
import fonts from "@/configs/fonts";

const loader = new Loader({
    apiKey: "AIzaSyDbyK-4PuxixbND30OXkJLmCwkLFvCDkfY",
    version: "weekly"
});

const mapOptions = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 4
};

export default function RoutePopup({ close }){
    useEffect(() => {
        loader.loadCallback(e => {
            if (e) {
                console.log(e);
            } else {
                new google.maps.Map(document.getElementById("map"), mapOptions);
            }
          });
    }, [])

    const renderFakeList = fakeList.map(({ name, email, phone, coordenada_x, coordenada_y }, index) => {
        return(
            <li key={index} className="">
                <button className="bg-green-default p-2 rounded text-zinc-50 w-full text-start">
                    { name }
                </button>
            </li>
        )
    })

    return(
        <Popup close={close} title={'Ordem de visita'} className={`w-full h-full`}>
            <div className="flex flex-1 gap-2">
                <div className="flex flex-col gap-2">
                    <p className={`${fonts.kulimPark.bold}`}>Clientes</p>
                    <ul className="flex flex-col gap-2">
                        {renderFakeList}
                    </ul>
                </div>
                <div id="map" className="flex-1 rounded">
                </div>
            </div>
        </Popup>
    )
}