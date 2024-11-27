"use client"
import React from 'react'
import { ArrowUpRight } from 'lucide-react'
import Abstract from '@/assets/icons/Abstract'
import { motion } from "motion/react"

const HeroSection = () => {
    return (
        <div className='mt-[6.5rem] container mx-auto flex items-center justify-between flex-col sm:flex-row sm:border-0 border border-Primary2 relative h-[13rem] sm:h-auto overflow-hidden' id='Home'>
            <motion.div
                initial={{
                    opacity: 0,
                    translateY: -10
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
            >
                <span className='sm:text-lg uppercase font-thin tracking-[0.1rem] text-Primary3'>web/mobile developer</span>
                <h1 className='sm:mt-2 uppercase text-4xl sm:text-6xl font-medium'>Keyner de la hoz</h1>
            </motion.div>
            <div className='h-[max-content] scale-[1.2] sm:scale-1 absolute sm:relative -z-10 sm:-z-0 rotate-[42deg] sm:rotate-[0deg] left-[5rem] sm:-left-[0rem] top-[1rem]'>
                <Abstract />
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    translateY: -10
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                className='flex flex-col'>
                <div className='flex items-end gap-4'>
                    <span className='text-2xl mt-3 uppercase sm:text-5xl font-medium'>Let’s</span>
                    <span className='flex items-center justify-center rounded-md cursor-pointer h-11 px-5 bg-bgSecondary hover:bg-secondary1 w-20'>
                        <ArrowUpRight />
                    </span>
                </div>
                <span className='text-2xl mt-3 uppercase sm:text-5xl font-medium'>Work Together</span>
            </motion.div>
        </div>
    )
}

export default HeroSection