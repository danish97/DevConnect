import React from 'react'
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Navbar from '../components/navbar'
const Home = () => {
  return (
    <div className='min-h-screen overflow-x-hidden items-center'>
      <Navbar />
      <main>     
        <HeroSection/>
        <HowItWorks/>
        <Features/>
      </main>
    </div>
  )
}

export default Home
