import { useEffect, useState } from "react";
import Popup from "../interface/Popup";
import { Loader } from '@googlemaps/js-api-loader';
import fonts from "@/configs/fonts";
import Clients from "@/apis/cleanHouse/Clients";
import IButton from "../interface/Button";
import GoogleIcons from "../GoogleIcons";

const loader = new Loader({
    apiKey: "AIzaSyDbyK-4PuxixbND30OXkJLmCwkLFvCDkfY",
    version: "weekly"
});

export default function RoutePopup({ close }){
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    function createRouter(){
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: -1.3696467605166314,
                    lng: -48.37931530384497
                },
                zoom: 18
            })
            
            Clients.getRoutes().then(({ data }) => {
                setClients(data)
                setLoading(false)
                const directionsService = new google.maps.DirectionsService()
                const directionsRenderer = new google.maps.DirectionsRenderer()
            
                directionsRenderer.setMap(map)
                const start = new google.maps.LatLng(-1.3696467605166314, -48.37931530384497)
                const destination = new google.maps.LatLng(data[data.length - 1].coordinate_x, data[data.length - 1].coordinate_y)
                const waypoints = []

                data.map((client, index) => {
                    if(index < data.length - 1){
                        waypoints.push({
                            location: new google.maps.LatLng(client.coordinate_x, client.coordinate_y),
                            stopover: true
                        })
                    }
                })

                const request = {
                    origin: start,
                    destination: destination,
                    travelMode: 'DRIVING',
                    waypoints: waypoints
                }

                directionsService.route(request, function(result, status) {
                    if (status == 'OK') {
                        directionsRenderer.setDirections(result);
                    }
                })
            })
        })


    }

    useEffect(() => {
        loader.loadCallback(e => {
            if (e) {
                console.log(e);
            } else {
                createRouter()
            }
        });
    }, [])

    const renderClients = clients.map(({ name }, index) => {
        return(
            <li key={index} className="">
                <button className="bg-green-default p-2 rounded text-zinc-50 w-full text-start">
                    { name }
                </button>
            </li>
        )
    })

    return(
        <Popup close={close} title={'Ordem de visita'} className={`w-full h-full maxw-[1024px]`}>
            <div className="flex flex-1 gap-2 overflow-hidden">

                {/**Clients */}
                <div className="flex flex-col gap-2 min-w-32 max-h-full overflow-hidden">
                    {/* <nav className="">
                        <IButton className={`flex items-center gap-2`}>
                            <GoogleIcons name={'location_on'} />
                            Ir para a posição atual
                        </IButton>
                    </nav>

                    <div className="h-[2px] bg-zinc-400 w-full rounded-full" /> */}

                    <p className={`${fonts.kulimPark.bold}`}>Clientes</p>
                    {
                        loading
                        ?
                        <div className="overflow-y-auto">
                            <div className="flex flex-col gap-2 h-max">
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                                <div className="h-10 bg-zinc-300 rounded animate-pulse" />
                            </div>
                        </div>
                        :
                        <div className="overflow-y-auto">
                            <ul className="flex flex-col gap-2">
                                {renderClients}
                            </ul>
                        </div>
                    }
                </div>

                <div id="map" className="flex-1 rounded">
                </div>
            </div>
        </Popup>
    )
}