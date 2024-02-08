const cleanHouseApi = require('../../configs/cleanHouseApi')

class Clients{
    create(name, email, phone, coordinateX, coordinateY){
        return cleanHouseApi.post(`/clients`, {
            name: name,
            email: email,
            phone: phone,
            coordinateX: coordinateX,
            coordinateY: coordinateY
        })
    }

    /**
     * 
     * @param {{ name: string, email: string, phone: string }} filters 
     * @returns 
     */
    getAll(filters){
        let params = ''

        if(filters){
            const keys = Object.keys(filters)
    
            for(const key of keys){
                const value = filters[key]
    
                params += value != null ? params == '' ? `?${key}=${value}` : `&${key}=${value}` : ''
            }
        }

        return cleanHouseApi.get(`/clients${params}`)
    }

    getRoutes(){
        return cleanHouseApi.get(`/clients/routes`)
    }
}

module.exports = new Clients