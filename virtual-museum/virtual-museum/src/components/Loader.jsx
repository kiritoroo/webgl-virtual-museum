import React from "react"
import { motion } from "framer-motion";

const tWrapper = "fixed bg-dark grid place-content-center w-full h-screen top-0 left-0"
const Loader = () => {
  return (
    <motion.div style={{ zIndex: 99 }} className={tWrapper}>
      <motion.div
        layoutId="loader"
        transition={{ duration: 1 }}
        className="font-medium loading text-5xl text-stone-50 uppercase tracking-widest"
        id="brand"
      >
        Virtual  Museum
      </motion.div>
    </motion.div>
  )
}

export default Loader