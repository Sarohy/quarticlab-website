import db from '@component/firebase/firebaseConfig'
import React, { useEffect } from 'react'
const name = process.env.NEXT_PUBLIC_TEST

function HomeSection4() {
  useEffect(() => {
    console.log("DB ==> ",db)
  }, [])
  return (
    <div style={{ border: "2px solid red", height: "100vh" }}>HomeSection4</div>
  )
}

export default HomeSection4