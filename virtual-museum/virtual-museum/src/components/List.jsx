import React from 'react'
import { motion } from "framer-motion";
import items from "../assets/ShowData.json";
import Item from './Item';
import { Link } from 'react-router-dom'

function Card({ pid, isMob }) {
  return (
    <li className="card">
      <Link>
        <Item
          pid={pid}
          isMob={isMob}
          thumbnail={`./show/${pid}_thumbnail.png`}
        />
      </Link>
    </li>
  );
}

const List = () => {
  return (
    <motion.ul data-scroll-section className="flex flex-wrap bg-light">
      <motion.div className="card">
        <span className="grid text-center place-content-center h-full text-2xl font-medium tracking-widest leading-tight text-gray-900 uppercase">
          HY LẠP CỔ ĐẠI
        </span>
      </motion.div>

      { items.slice(0, 6).map((card) => <Card key={card.pid} {...card} />) }

      <div className="card">
        <span className="wave-effect grid text-center place-content-center h-full text-2xl font-medium tracking-widest leading-tight text-light uppercase">
          <Link className="px-8 py-5 bg-gray-100 rounded-full text-xl tracking-widest leading-none text-center text-gray-900 uppercase">
            TRẢI NGHIỆM 3D
          </Link>
        </span>
      </div>
    </motion.ul>
  );
}

export default List
