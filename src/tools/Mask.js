class Mask{
    phone(value){
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d{4,5})/, '($1) $2')
            .replace(/(\(\d{2}\) {1}\d{4,5})(\d{4})$/, '$1-$2')
    }
}

export default new Mask