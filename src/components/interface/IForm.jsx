import verification from "@/tools/verification"

/**
 * IForm é um componente de interface para re-uso em outras páginas/components
 * @param {{
 *      children: ReactNode,
 *      className: string,
 *      submit: (error: boolean, data) => void,
 *      verifications: Array<{
 *          inputName: string,
 *          types: Array<{
 *              type: 'isDefined' | 'isEmail' | 'isPhone',
 *              errorMessage: string
 *          }>
 *      }>
 * }} Props 
 * @returns {JSX.Element}
 */
export default function IForm({ children, className, submit, verifications }){
    return(
        <form
            className={className}
            onSubmit={e => {
                e.preventDefault()

                const form = new FormData(e.target)
                const keys = form.keys()

                const result = {}

                for(const key of keys){
                    const value = form.getAll(key)
        
                    Object.assign(result, { [key]: value.length == 1 ? value[0] : value })
                }

                if(verifications){
                    for(const { inputName, types } of verifications){
                        for(const { type, errorMessage } of types){
                            const value = result[inputName]
    
                            if(!verification(value, type)){
                                submit(true, {
                                    [inputName]: {
                                        errorMessage: errorMessage
                                    }
                                })
    
                                return
                            }
                        }
                    }
                }

                submit && submit(false, result)
            }}
        >
            {children}
        </form>
    )
}