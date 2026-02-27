import React from 'react'
import Navbar from '../pages/Navbar'
import { useSelector } from 'react-redux'
import Hero from './Hero'
import ProductSection from './ProductSection'
import TestimonialSection from './TestimonialSection'
import Footer from './Footer'
import Gallery from './Gallery'

const Home = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)
  console.log("user is here", user)

  return (
    <div>
      <Navbar />
      <Hero />
      <ProductSection/>
      <TestimonialSection/>
      <Gallery/>
      <Footer/>
    </div>
  )
}

export default Home