"use client"
import { Figma } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ImageServises from '../../assets/ImageServises.svg'
import { Button } from './button'
import { motion } from "motion/react"

const ServicesSection = () => {
    return (
        <div className='container mx-auto px-3 sm:px-0 mt-10' id='Services'>
            <motion.div
                initial={{
                    translateX: -50,
                    opacity: 0
                }}
                whileInView={{
                    translateX: 0,
                    opacity: 1
                }}
                transition={{
                    delay: 0.4
                }}
                className='flex flex-col gap-1 pb-8 border-b-2 border-b-Primary2'
            >
                <span className='sm:text-lg uppercase font-thin tracking-[0.1rem] text-Primary3'>Services</span>
                <span className='sm:mt-2 uppercase sm:text-5xl text-3xl font-medium'>My Photography Services</span>
            </motion.div>
            <div className='py-5'>
                <div className='flex items-center flex-col sm:flex-row gap-10'>
                    <motion.div
                        initial={{
                            translateY: -50,
                            opacity: 0
                        }}
                        whileInView={{
                            translateY: 0,
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.4
                        }}
                        className='flex flex-col gap-4 sm:w-[50rem]'
                    >
                        <div className='border-l-8 pl-2 py-1'>
                            <div className='flex items-center gap-2'>
                                <Figma className='text-Primary3' />
                                <span className='text-2xl text-Primary3'>Desinger UX IX</span>
                            </div>
                            <p className='text-Primary3 text-sm sm:text-[1rem]'>My journey as a photographer has been a lifelong quest to capture the extraordinary in the ordinary, to freeze fleeting moments in time, and to share the worlds beauty as I see it. Based in the enchanting landscapes of the USA, I find inspiration in every corner of this diverse and </p>
                        </div>
                        <div className='border-l-8 pl-2 py-1'>
                            <div className='flex items-center gap-2'>
                                <Figma className='text-Primary3' />
                                <span className='text-2xl text-Primary3'>Desinger UX IX</span>
                            </div>
                            <p className='text-Primary3 text-sm sm:text-[1rem]'>My journey as a photographer has been a lifelong quest to capture the extraordinary in the ordinary, to freeze fleeting moments in time, and to share the worlds beauty as I see it. Based in the enchanting landscapes of the USA, I find inspiration in every corner of this diverse and </p>
                        </div>
                        <div className='border-l-8 pl-2 py-1'>
                            <div className='flex items-center gap-2'>
                                <Figma className='text-Primary3' />
                                <span className='text-2xl text-Primary3'>Desinger UX IX</span>
                            </div>
                            <p className='text-Primary3 text-sm sm:text-[1rem]'>My journey as a photographer has been a lifelong quest to capture the extraordinary in the ordinary, to freeze fleeting moments in time, and to share the worlds beauty as I see it. Based in the enchanting landscapes of the USA, I find inspiration in every corner of this diverse and </p>
                        </div>
                        <Button className='h-[2.7rem] mx-auto w-[max-content]'>Servicies</Button>
                    </motion.div>
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.7
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1
                        }}
                        transition={{
                            delay: 0.4
                        }}
                    >
                        <Image src={ImageServises} alt='' />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ServicesSection