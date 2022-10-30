import React, { useRef, useState } from 'react'
import BrowerModel from './3DExperience/BrowerModel';
import { motion } from "framer-motion";

const Item = ({ pid }) => {
  const ProjectRef = useRef(null);
  const refItem = useRef(null);

  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);

  return (
    <motion.div
      ref={ProjectRef}
      className="Container__ProjectModel_reveal Container__ProjectModel cursor-pointer relative h-full w-full"
    >
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-screen w-screen overflow-hidden"
          layoutId={`image-${pid}`}
          transition={{ duration: 1, delay: 0.15 }}
        >
          <img
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            className={hovered ? 'wave-effect object-cover h-2/3' : 'object-cover h-2/3'} 
            src={`./show/${pid}_thumbnail.png`}
            alt=""
            draggable={false}
          />
        </motion.div>
      </div>
      <div
        ref={refItem}
        className="opacity-0 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 ProjectModel"
      >
        {/* <BrowerModel ProjectRef={ProjectRef} pid={pid} /> */}
      </div>
    </motion.div>
  )
}

export default Item
