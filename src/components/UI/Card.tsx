"use client"
import { useState } from 'react'
import imagProject from '../../assets/ImageProject.png'
import imagProject2 from '../../assets/ImageSujet.png'
import Image from 'next/image'

const Card = () => {
    const [hover, setHover] = useState(false)
    return (
        <div
            className='sm:<w-[25rem] flex flex-col'
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <div
                className="relative rounded-3xl mb-3 h-[18rem] flex items-center justify-center overflow-hidden">
                <Image
                    src={imagProject}
                    alt=""
                    className={`
                        w-full h-auto transition-all duration-500 ease-in-out top-0 left-0 absolute
                        ${hover ? 'scale-[1.1]' : 'scale-1'} 
                        ${hover ? 'opacity-1' : 'opacity-0'}
                        ${hover ? 'translate-y-0' : 'translate-y-5'} 
                        `}
                />
                <Image
                    src={imagProject2}
                    alt=""
                    className={`
                        w-full h-auto transition-all duration-500 ease-in-out top-0 left-0 absolute
                        ${hover ? '-translate-y-5' : 'translate-y-0'} 
                        ${hover ? 'scale-1' : 'scale-[1.1]'} 
                        ${hover ? 'opacity-0' : 'opacity-1'}
                        `}
                />
            </div>
            <h4 className='text-2xl mb-1'>Faces of Resilience</h4>
            <p className='font-light text-Primary3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et quae similique nihil corporis est, amet nulla provident ullam sint ducimus possimus, repudiandae dolor, necessitatibus esse rerum facilis. Reprehenderit, blanditiis laboriosam?</p>
            <div className='py-1 gap-2 flex flex-wrap'>
                <span className='px-2 py-[5px] rounded-xl border-Primary2 border-2'>React.js</span>
                <span className='px-2 py-[5px] rounded-xl border-Primary2 border-2'>Next.js</span>
                <span className='px-2 py-[5px] rounded-xl border-Primary2 border-2'>TypeScript</span>
                <span className='px-2 py-[5px] rounded-xl border-Primary2 border-2'>TypeScript</span>
            </div>
        </div>
    )
}

export default Card