import React from 'react'
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const variants = {
    open: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
      transition: {
        // duration: 0.1,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
  };
  const childVariants = {
    open: {
      y: 0,
      opacity: 1,
      rotateZ: "0deg",
      transition: { stiffness: 1000 },
    },
    closed: {
      y: 50,
      opacity: 0,
      rotateZ: "5deg",
      transition: { stiffness: 200, duration: 0.1 },
    },
  };

  return (
    <motion.nav
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      exitBeforeEnter
      className=" bg-white fixed container rounded-b-xl shadow pointer-events-none left-1/2 transfrom -translate-x-1/2 md:px-2 px-4 mx-auto text-gray-900 z-20 top-0 transition duration-1000 ease-in-out antialiased w-full py-4"
    >
      <div className="px-4 flex justify-center items-center">
        <ul className="md:flex pointer-events-auto hidden items-center space-x-20 text-xm antialiased font-medium tracking-widest">
          <li>
            <Link className="glitch h-8 flex flex-col justify-center fx-underline">
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link className="wave-effect h-8 flex flex-col justify-center fx-underline">
              TRẢI NGHIỆM 3D
            </Link>
          </li>
          <li>
            <Link className="h-8 flex flex-col justify-center fx-underline">
              DỰ ÁN
            </Link>
          </li>
        </ul>
      </div>


    </motion.nav>
  )
}

export default Navbar