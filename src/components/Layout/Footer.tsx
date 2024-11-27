import { Linkedin } from 'lucide-react'
import React from 'react'
import { Button } from '../UI/button'

const Footer = () => {
    return (
        <footer className='container mx-auto border-t border-t-Primary2 pt-10 pb-5 flex flex-col items-center'>
            <div className='flex flex-col sm:flex-row gap-7 sm:gap-0 items-center justify-between w-full'>
                <div className='flex flex-col gap-1'>
                    <span className='sm:text-lg uppercase font-thin tracking-[0.1rem] text-Primary3'>Stunning Photography by</span>
                    <span className='mt-2 uppercase sm:text-6xl text-4xl font-medium'>Keyner de la hoz</span>
                </div>
                <div>
                    <div className='mt-3 flex flex-row sm:flex-col sm:gap-5 gap-9 justify-between items-center'>
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
            </div>
            <span className='font-thin text-Primary3 sm:text-[1rem] text-sm mt-6 sm:mt-0'>
                © 2024 Damien Braun Photography. All rights reserved.
            </span>
        </footer>
    )
}

export default Footer