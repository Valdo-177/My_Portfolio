import GridImage from '@/components/UI/GridImage'
import HeroSection from '@/components/UI/HeroSection'
import MarketSection from '@/components/UI/MarketSection'
import React from 'react'
import AboutSection from '@/components/UI/AboutSection'
import ServicesSection from '@/components/UI/ServicesSection'
import ProjectSection from '@/components/UI/ProjectSection'

const HomePage = () => {
    return (
        <main>
            <HeroSection />
            <MarketSection/>
            <GridImage/>
            <AboutSection/>    
            <ServicesSection/>
            <ProjectSection/>
        </main>
    )
}

export default HomePage