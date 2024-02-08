import { useEffect } from 'react'
import logoSvg from '../assets/logo/logo-only-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard/clients')
    }, 3000)
  }, [])

  return (
    <main className='bg-green-default min-h-dvh flex items-center justify-center w-full'>
      <Image alt='Logo' src={logoSvg} />
    </main>
  )
}