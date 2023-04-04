import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@component/styles/Home.module.css'
import { InstantBookingBanner } from '@component/Components/CommonComponents'
import { HomeSection1, HomeSection2, HomeSection3, HomeSection4, HomeSection5 } from '@component/Components/MainComponents/HomeSections'
import { useRef } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const section2 = () => document.getElementById("homeSection2")
  
  const handleButtonClick = () => {
    section2().scrollIntoView({behavior:"smooth"})
  };
  return (
    <>
    <HomeSection1 handleButtonClick={handleButtonClick} />
    <HomeSection2
    id={"homeSection2"}
    />
    <HomeSection3/>
    <HomeSection4/>
    <HomeSection5/>
    <InstantBookingBanner/>
    </>
  )
}
