"use client"
import Image from 'next/image'
import React from 'react'
import GridImage1 from '../../assets/GidImage1.svg'
import GridImage2 from '../../assets/GidImage2.svg'
import GridImage3 from '../../assets/GidImage3.svg'
import GridImage4 from '../../assets/GidImage4.svg'
import GridImage5 from '../../assets/GidImage5.svg'
import GridImage6 from '../../assets/GidImage6.svg'
import GridImage7 from '../../assets/GidImage7.svg'
import { motion } from "motion/react"

interface IAnimateImage {
  children: React.ReactElement;
  className: string;
  delay: number;
}

const AnimateImage = ({ children, className, delay }: IAnimateImage) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: -10,
        scale: 0
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        scale: 1
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
      className={`w-[max-content] ${className}`}>
      {children}
    </motion.div>
  )
}

const GridImage = () => {
  return (
    <div className='container mx-auto relative my-5 hidden sm:block'>
      <AnimateImage className='mb-[0.7rem]' delay={0}>
        <Image src={GridImage1} alt='' />
      </AnimateImage>
      <AnimateImage className='' delay={0.2}>
        <Image src={GridImage2} alt='' />
      </AnimateImage>
      <AnimateImage className='absolute top-[9.5rem] left-[11rem]' delay={0.4}>
        <Image src={GridImage3} alt='' />
      </AnimateImage>
      <AnimateImage className='absolute left-[26.5rem] top-[19rem]' delay={0.6}>
        <Image src={GridImage4} alt='' />
      </AnimateImage>
      <AnimateImage className='absolute top-0 left-[32.3rem]' delay={0.8}>
        <Image src={GridImage5} alt='' />
      </AnimateImage>
      <AnimateImage className='absolute top-0 right-0' delay={1}>
        <Image src={GridImage6} alt='' />
      </AnimateImage>
      <AnimateImage className='absolute bottom-0 right-0' delay={1.2}>
        <Image src={GridImage7} alt='' />
      </AnimateImage>
    </div>
  )
}

export default GridImage