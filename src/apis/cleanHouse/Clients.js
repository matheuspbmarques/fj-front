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
}

module.exports = new Clients