"use client";

import { useEffect, useState } from "react";
import WinCheck from "@/hooks/winCheck";
import NextMove from "@/hooks/nextMove";
import {motion, useMotionValue, useTransform, animate} from "framer-motion"
import CursorBlinker from "./_components/cursor";
import TypingAnimation from "./_components/text";

const boxVariants = {
  hidden: { 
    opacity: 0,
    x: 0,
   },
  visible: {
     opacity: 1 ,
      x: 0,
      transition : {
        ease: "easeInOut",
        delay: 0.5,
        duration: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.4
      }

    },
    exit: {
      x: '-100vw',
      transition: {
        ease: 'easeInOut'
      }
    }
}

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {duration: 2, ease: 'easeInOut'}
  }
}

const textVariants = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: 'spring', stiffness: 50, damping: 20 },
      opacity: { duration: 0.5 },
      default: { delay: 0.5, duration: 1.5 },
    },
  },
};

const messages = [
  "let's see what you got",
  "Is that your best",
  "Try harder",
  "Mere child's play 😌",
  "Boooring",
]
const backdrop = {
  hidden: {opacity: 0},
  visible: {
      opacity:1,
      transition: {
        delat: 0.5
      }

  }
 
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


export default function Home() {
  const [turn , setTurn] = useState('O')
  const [board, setBoard] = useState([["", "", ""], ["", "", ""], ["", "", ""]])
  const [winner, setWinner] = useState("")
  const [messageIndex, setMessageIndex] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  // const count = useMotionValue(0);
  // const rounded = useTransform(count, (latest) => Math.round(latest));
  // const displayText = useTransform(rounded, (latest) =>
  //   messages[messageIndex].slice(0, latest)
  // );
  // const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    if (winner !== "" || messageIndex === 4) {
      setTimeout(() => {
        setGameOver(true)
      },1000)
    }
  },[messageIndex, winner])


  // useEffect(() => {
  //   const controls = animate(count, 60, {
  //     type: "tween", 
  //     duration: 1,
  //     ease: "easeInOut",
     
    
  //   });
  //   return controls.stop;
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [messageIndex]);
 
  async function onClick(i: number, j: number) {

     new Promise<void>(async (resolve, reject) => {

      board[i][j] = "O"

      setTurn("X")
      setMessageIndex(messageIndex + 1)
      
  
      const winner = await WinCheck(board)
      setWinner(winner);
    
      resolve();

    }).then(async () => {
        const move = await NextMove({board, turn:"X"}) 
        board[move[0]][move[1]] = "X"
        setTurn("O")
  
      const winner = await WinCheck(board)
      setWinner(winner);


    })
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-[100vh]">
      
      <div className={`absolute ${!gameOver ? '' : 'blur-sm'} flex flex-col justify-center items-center`}>
      <motion.div className=""
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      exit="exit"

      >
          <div className="mb-6 flex gap-2">

          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user ">
            
            <motion.path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            />
            <motion.circle cx="12" cy="7" r="4"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            />
            </svg>

          {/* <motion.p className="text-2xl "
          variants={textVariants}
          > */}
            <div className="text-2xl">
              
            <motion.span>
              {/* {displayText} */}
              <TypingAnimation text={messages[messageIndex]} />
              {/* {messages[messageIndex]} */}
            </motion.span>
            <CursorBlinker />
            </div>
            
          {/* </motion.p> */}
          </div>
         

      {Array.from({ length: 3 }).map((_, i) => (
         <div key={i + 9}>
          <div key={i} className="flex flex-row ">
              { Array.from({ length : 3}).map((_, j) => (
              
              
                  <motion.button
                    key={j}
                    className={`w-32 h-32  ${i !=2 && "border-b border-blue-700" }  ${j !=2 && "border-r border-blue-700" } text-4xl` }
                    variants={pathVariants}

                    onClick={() => {
                         if (board[i][j] === "")
                         {

                           onClick(i, j)
                         }
                      }
                      }

                    > {board[i][j]}

                    </motion.button>
                  ))}
                </div>
                <hr className="h-full w-2"/>
              </div>
              ))}
              </motion.div>

              <div className="text-4xl mt-4">
              {winner !== "" ? `${winner} wins!` : `It's ${turn}'s turn`}
              </div>

      </div>

   {gameOver && <motion.div className="relative flex justify-center items-center h-[100vh] z-1"
    variants={backdrop}
    initial="hidden"
    animate="visible"
    exit="hidden"
    >
      <motion.div className=" border border-black w-96 h-48  p-12 flex flex-col items-center gap-4"
      variants={modal}
      >
          <span className="text-4xl text-red-600 ml-3">
            You did not win. lets go again
          </span>
          <button className="flex" onClick={()=> {
            setBoard([["", "", ""], ["", "", ""], ["", "", ""]])
            setWinner("")
            setMessageIndex(0)
            setGameOver(false)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
             stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-rotate-ccw">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/></svg>
          </button>
      </motion.div>
     
    </motion.div>
}

    </div>
  );
}
