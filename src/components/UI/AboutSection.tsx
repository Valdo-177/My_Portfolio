"use client"
import React from 'react'
import User from '../../assets/ImageSujet.png'
import Image from 'next/image'
import { Linkedin } from 'lucide-react'
import { Button } from './button'
import { motion } from "motion/react"

const AboutSection = () => {
    return (
        <div className='container mx-auto mt-10 px-3 sm:px-0' id='About_Me'>
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
                    delay: 0.2
                }}
                className='flex flex-col gap-1 sm:pb-8 pb-4 border-b-2 border-b-Primary2'>
                <span className='sm:text-lg uppercase font-thin tracking-[0.1rem] text-Primary3'>About</span>
                <span className='sm:mt-2 uppercase sm:text-5xl text-3xl font-medium'>i am Keyner de la hoz</span>
            </motion.div>
            <div className='flex flex-col sm:flex-row items-center mt-10 gap-7'>
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
                >
                    <Image src={User} alt='' className='w-[42rem]' />
                </motion.div>
                <motion.div
                    initial={{
                        translateY: +50,
                        opacity: 0
                    }}
                    whileInView={{
                        translateY: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.4
                    }}
                    className='border-2 border-Primary2 rounded-xl w-full'
                >
                    <div className='p-6 border-b-2 border-b-Primary2'>
                        <h2 className='text-Primary3 text-2xl font-medium mb-1'>Introduction</h2>
                        <p className='text-Primary3'>
                            My journey as a photographer has been a lifelong quest to capture the extraordinary in the ordinary, to freeze fleeting moments in time, and to share the worlds beauty as I see it. Based in the enchanting landscapes of the USA, I find inspiration in every corner of this diverse and vibrant country. Join me as we embark on a visual odyssey, where each photograph tells a story, and every frame is a piece of my heart.
                        </p>
                    </div>
                    <div className='p-6'>
                        <h2 className='text-Primary3 text-2xl font-medium mb-1'>Contact Information</h2>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <p className='text-Primary3'>Email</p>
                                <p className='text-Primary3'>damienbraun@gmail.com</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-Primary3'>Phone Number</p>
                                <p className='text-Primary3'>+00 000000000</p>
                            </div>
                        </div>
                        <div className='mt-3 flex justify-between items-center'>
                            <div className='px-3 py-2 border w-[max-content] flex items-center gap-2 border-Primary2 rounded-full'>
                                <div className='border border-Primary2 bg-Primary4 rounded-full p-[0.6rem] w-[max-content]'>
                                    <Linkedin className='text-Primary3' size={20} strokeWidth={0.7} />
                                </div>
                                <div className='border border-Primary2 bg-Primary4 rounded-full p-[0.6rem] w-[max-content]'>
                                    <Linkedin className='text-Primary3' size={20} strokeWidth={0.7} />
                                </div>
                            </div>
                            <Button className='h-[3.4rem]'>Download CV</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default AboutSection