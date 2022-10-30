import React, { useState, useEffect } from "react";
import { 
  motion, 
  useAnimation, 
} from "framer-motion";

import List from "./List";

const Work = () => {
  const [loading, setLoading] = useState(true)
  const controls = useAnimation();
  const variants = {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: "easeInOut",
        duration: 2
      }
    },
    exit: {
      opacity: 0,
      x: 0,
      y: -100,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      controls.start("enter");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      controls.start("hidden");
    }
  }, [loading, controls]);

  return (
    <>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
        exit="exit"
        className="opacity-1 transition duration-2000"
      >
        <List controls={controls} />
      </motion.div>
    </>
  )
}

export default Work
