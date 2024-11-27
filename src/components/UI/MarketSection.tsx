"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

const MarketSection = () => {
  const items = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Microservices",
    "Cloud Computing",
    "Firebase",
    "Supabase",
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Microservices",
    "Cloud Computing",
    "Firebase",
    "Supabase",
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Microservices",
    "Cloud Computing",
    "Firebase",
    "Supabase",
  ];

  const repeatedItems = [...items, ...items];

  return (
    <div className="bg-Primary4 border-Primary2 border-2 h-12 flex overflow-hidden w-full">
      <motion.div
        className="flex gap-4 items-center whitespace-nowrap"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          duration: 200, 
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        {repeatedItems.map((item, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <Database strokeWidth={0.9} size={20} />
            <span className="text-xl font-thin">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarketSection;




// import { Database } from 'lucide-react'
// import React from 'react'

// const MarketSection = () => {
//     return (
//         <div className='bg-Primary4 border-Primary2 border-2 h-12 gap-3 items-center flex overflow-hidden w-full'>
//             {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((item) => (
//                 <div className='flex gap-2 items-center w-full' key={item}>
//                     <Database strokeWidth={0.9} size={20} />
//                     <span className='text-xl font-thin w-[max-content]'>Data base</span>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default MarketSection