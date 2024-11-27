"use client"
import React from 'react'
import Card from './Card'
import { motion } from "motion/react"

const ProjectSection = () => {
    return (
        <div className='mx-auto container mt-20 px-3 sm:px-0'>
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
                className='flex flex-col gap-1 pb-8 border-b-2 border-b-Primary2' id='Portfolio'>
                <span className='sm:text-lg uppercase font-thin tracking-[0.1rem] text-Primary3'>Portfolio</span>
                <span className='sm:mt-2 uppercase sm:text-5xl text-3xl font-medium'>My Photography Services</span>
            </motion.div>
            <div className='py-8 grid sm:grid-cols-3 grid-cols-1 gap-10 justify-items-center'>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <motion.div
                        key={item}
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
                        <Card key={item} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ProjectSection