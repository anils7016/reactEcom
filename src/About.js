//import React, { useContext } from 'react'
import HeroSection from './components/HeroSection'
import { useProductContext } from './context/productcontext'

const About = () => {
  const {myname} = useProductContext()
  const data = {
    name : "Ecommerce Dev"
  }
  return (
    <>
      <div>{myname}</div>
      <HeroSection myData={data}/>
    </>
  )
}

export default About