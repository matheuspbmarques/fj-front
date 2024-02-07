import logoSvg from '../assets/logo/logo-only-icon.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='bg-green-default min-h-dvh flex items-center justify-center w-full'>
      <Image alt='Logo' src={logoSvg} />
    </main>
  )
}