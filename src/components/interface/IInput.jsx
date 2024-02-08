import { useRef, useState } from "react"

export default function IIpunt({ label, inputId, name, errorMessage, onChange, value, inputMode, maxLength }){
    const labelRef = useRef()

    const [hiddenLabel, setHiddenLabel] = useState(false)

    return(
        <div className="w-full relative pt-2">
            <label
                htmlFor={inputId}
                className="absolute top-3 duration-300 left-0 cursor-text select-none" ref={labelRef} 
                style={{
                    top: hiddenLabel ? 0 : 16,
                    fontSize: hiddenLabel ? 12 : 16
                }}
            >{ label }</label>
            <input
                type="text"
                id={inputId}
                name={name}
                className={`
                    outline-none border-b-2 border-zinc-400 duration-300
                    hover:border-green-hover focus:border-green-hover bg-transparent
                    mt-2 w-full py-1
                `}
                onFocus={() => {
                    setHiddenLabel(true)
                }}
                onBlur={(e) => {
                    e.currentTarget.value == '' && setHiddenLabel(false)
                }}
                onChange={onChange}
                value={value}
                inputMode={inputMode}
                maxLength={maxLength}
            />
            { errorMessage && <span className="text-xs text-rose-600">{ errorMessage }</span> }
        </div>
    )
}