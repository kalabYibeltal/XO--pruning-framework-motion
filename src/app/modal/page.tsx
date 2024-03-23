"use client";

import { useRouter } from "next/navigation";
import {AnimatePresence, motion} from "framer-motion"


const backdrop = {
  hidden: {opacity: 0},
  visible: {
      opacity:1,
      transition: {
        delat: 0.5
      }
  },
  
 
}

const modal = {
  hidden: {
      y: "-100vh",
      opacity: 0
  },
  visible: {
      y: 0,
      opacity: 1,
      transition: {delay: 1}
  }
} 

export default function Modalmessage() {
  
  const router = useRouter()
  return (
    // <AnimatePresence mode="wait">

    <motion.div className="flex justify-center items-center h-[100vh]"
    variants={backdrop}
    initial="hidden"
    animate="visible"
    exit="hidden"
    >
      <motion.div className=" border border-black w-96 h-48  p-12 flex flex-col items-center gap-4"
      variants={modal}
      >
          <span className="text-4xl">
            You did not win. lets go again
          </span>
          <button className="flex" onClick={()=> {
            router.push("/")

          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </button>
      </motion.div>
     
    </motion.div>
    // </AnimatePresence>
  );
}
