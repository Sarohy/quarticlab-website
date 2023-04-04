import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@component/styles/Home.module.css'
import { Header, InstantBookingBanner } from '@component/Components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div style={{border:"2px solid red", height:"85vh"}} >      
      <h1>HOME1</h1>
    </div>
    <div style={{border:"2px solid red", height:"100vh"}} >      
      <h1>HOME2</h1>
    </div>
    <div style={{border:"2px solid red", height:"100vh"}} >      
      <h1>HOME3</h1>
    </div>
    <div style={{border:"2px solid red", height:"100vh"}} >      
      <h1>HOME4</h1>
    </div>
    <div style={{border:"2px solid red", height:"100vh"}} >      
      <h1>HOME5</h1>
    </div>
    <InstantBookingBanner/>
    </>
  )
}
