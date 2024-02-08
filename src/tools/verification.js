/**
 * @param {string} value Valor do input
 * @param {'isDefined' | 'isEmail' | 'isPhone'} type Tipo de verificação que será feita
 * @returns {boolean}
 */
function verification(value, type){
    switch(type){
        case 'isDefined':{
            return value !== ''
        }

        case 'isEmail':{
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(value)
        }

        case 'isPhone': {
            return /\([0-9]{2}\) {1}9{0,1}[0-9]{4}-{1}[0-9]{4}/
            .test(value)
        }
    }
}

export default verification