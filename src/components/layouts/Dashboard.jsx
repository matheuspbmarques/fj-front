import Image from 'next/image'
import logoHorizontalSvg from '../../assets/logo/logo-horizontal.svg'
import GoogleIcons from '../GoogleIcons'
import { zinc } from 'tailwindcss/colors'
import Link from 'next/link'
import fonts from '@/configs/fonts'
import { useEffect, useRef, useState } from 'react'

function LateralMenu({ show, setShow }){
    const containerRef = useRef()
    const emptySpaceRef = useRef()
    const menuRef = useRef()

    useEffect(() => {
        if(show){
            containerRef.current.style.right = '0'
            setTimeout(() => {
                emptySpaceRef.current.style.backgroundColor = 'rgb(24 24 27 / 0.25)'
                menuRef.current.style.right = '0'
            }, 1)
        }else{
            emptySpaceRef.current.style.backgroundColor = 'rgb(24 24 27 / 0)'
            menuRef.current.style.right = '-100%'
            setTimeout(() => {
                containerRef.current.style.right = '-100%'
            }, 300)
        }
    }, [show])

    return(
        <div className='min-h-dvh w-full fixed flex' ref={containerRef}>

            <div className='flex-1 duration-300' ref={emptySpaceRef} onClick={() => setShow(show ? false : true)} />

            <nav className='w-3/4 min-h-dvh flex flex-col bg-green-default p-6 gap-6 duration-300 absolute' ref={menuRef}>
                <header className='flex justify-between items-center'>
                    <Image alt='Logo' src={logoHorizontalSvg} />
                    <button className='flex hover:bg-green-hover duration-300 p-1 rounded' onClick={() => setShow(show ? false : true)}>
                        <GoogleIcons name={'close'} color={zinc[50]} />
                    </button>
                </header>

                <div className='w-full h-[2px] bg-green-hover' />

                <ul>
                    <li>
                        <Link href={''} className={`py-3 px-2 hover:bg-green-hover ${fonts.kulimPark.default} text-base flex gap-2 items-center text-zinc-50 duration-300 rounded`}>
                            <GoogleIcons name={'group'} color={zinc[50]} />
                            Clientes
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default function DashboardLayout({ children }){
    const [showLateralMenu, setShowLateralMenu] = useState(false)

    return(
        <>
            <LateralMenu show={showLateralMenu} setShow={setShowLateralMenu} />
            <div className='flex flex-col'>
                <header className='bg-green-default p-6 flex justify-between items-center'>
                    <Image alt='Logo' src={logoHorizontalSvg} />

                    <button className='flex' onClick={() => setShowLateralMenu(showLateralMenu ? false : true)}>
                        <GoogleIcons name={'menu_open'} color={zinc[50]} />
                    </button>
                </header>
                <main className='py-6 gap-6 flex flex-col'>
                    { children }
                </main>
            </div>
        </>
    )
}