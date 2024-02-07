import { Kulim_Park } from 'next/font/google'

const kulimPark = Kulim_Park({ weight: '400', subsets: ['latin'] })
const kulimParkBold = Kulim_Park({ weight: '700', subsets: ['latin'] })

const fonts = {
    kulimPark: {
        default: kulimPark.className,
        bold: kulimParkBold.className
    }
}

export default fonts