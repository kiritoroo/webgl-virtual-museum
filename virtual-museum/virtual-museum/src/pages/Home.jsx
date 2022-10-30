import React, { useState, useEffect, Suspense } from "react";
import { AnimatePresence, useAnimation, motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Marquee from "react-fast-marquee";

import Loader from "../components/Loader";
import HomeModel from "../components/3DExperience/HomeModel";
import Work from "./Work";

import { ReactComponent as ScrollArrow } from '../assets/ScrollArrow.svg';

const tGridWrapper = "relative w-full lg:grid-cols-8 bg-light text-gray-900 h-screen grid grid-cols-6 lg:gap-6 antialiased"
const tGridLeft = "z-10 hero_text leading lg:grid-cols-8 md:text-left text-center space-y-4 col-span-full lg:col-start-2 flex flex-col items-center justify-center lg:col-end-5 lg:h-screen h-full" 
const tGridRight = "absolute h-96 lg:h-screen top-32 lg:top-0 w-full lg:w-6/12 col-span-full lg:right-12 h-full"
const tGridBottom = "absolute bottom-0 left-1/2 transform -translate-x-1/2 inline-flex flex-col space-y-1 items-center justify-end  h-12"

const Home = () => {
  const [loading, setLoading] = useState(true);
  const variants = {
    hidden: { opacity: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: "easeInOut",
        duration: 2,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: -100,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const effectLeft = {
    hidden: { opacity: 0, x: "-100%" },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: "easeInOut",
        duration: 2,
      },
    },
    exit: { opacity: 0, x: "-100%" },
  };
  const effectRight = {
    hidden: { opacity: 0, x: "100%" },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: "easeInOut",
        duration: 2,
      },
    },
    exit: { opacity: 0, x: "100%" },
  };
  const effectBottom = {
    hidden: { opacity: 0, y: 200, x: "-50%" },
    enter: {
      opacity: 1,
      x: "-50%",
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: "easeInOut",
        duration: 2,
      },
    },
    exit: { opacity: 0, y: 200, x: "-50%" },
  };

  const controls = useAnimation();
  useEffect(() => {
    if (!loading) {
      controls.start("enter");
    } else {
      controls.start("hidden");
    }
  }, [loading, controls]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {loading ? <Loader /> : null}
      </AnimatePresence>

      <motion.div variants={variants} initial="hidden" animate={controls} exit="exit" className="w-full">
        <section data-scroll-section>
          <div className={tGridWrapper}>
            <motion.div variants={effectLeft} className={tGridLeft}>
              <div className="md:text-6xl text-3xl font-bold uppercase">
                Virtual{" "}
                <span className="wave-effect md:text-7xl text-6xl text-stroke">MUSEUM</span>{" "}
                <span className="md:text-6xl text-5xl text-stroke">BEST</span>{" "}
                Experience
              </div>
              <div className="inline-block">
                Ghé thăm bảo tàng ảo 3D ngay bây giờ để bạn có thể thưởng thức và trải nghiệm
                những điều mới mẻ. Đây là dự án IT được thực hiện bởi {" "}
                <span
                  className="inline-block fx-underline"
                  style={{ width: "300px", minWidth: "300px" }}
                >
                  <Typewriter
                    options={{
                      strings: [
                        "Mentor: Mr. Nguyen Thien Bao",
                        "Developer: Ho Xuan Hieu",
                        "Developer: Le Kien Trung",
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 100,
                      cursor: "",
                    }}
                  />
                </span>
              </div>
            </motion.div>
            <motion.div variants={effectRight} className={tGridRight}>
              <HomeModel setLoading={setLoading} />
            </motion.div>
            <motion.div variants={effectBottom} className={tGridBottom}>
              <p className="text-sm font-medium tracking-widest leading-snug text-center text-gray-900 uppercase">
                Cuộn để khám phá
              </p>
              <ScrollArrow />
            </motion.div>
          </div>
        </section>

        {/* <Work /> */}

        <section data-scroll-section className="relative">
          <div className="container p-12 px-0 flex items-center justify-center md:justify-start text-2xl font-medium tracking-widest leading-tight text-gray-900 uppercase antialiased">
            {"  "}
          </div>
          <div>
            <div>
              <Marquee gradient={true} gradientColor={[247, 247, 247]}>
                <div
                  data-scroll
                  data-scroll-direction="horizontal"
                  data-scroll-speed="3"
                  className="text-stroke text-4xl md:text-6xl font-bold tracking-widest uppercase"
                >
                  <a className="cursor-pointer" style={{ marginLeft: "2in" }}>
                    VIRTUAL MUSEUM
                  </a>
                  <a className="cursor-pointer" style={{ marginLeft: "2in" }}>
                    WEBGL
                  </a>
                </div>
              </Marquee>
            </div>
            <div>
              <Marquee gradient={true} gradientColor={[247, 247, 247]} direction="right">
                <div
                  data-scroll
                  data-scroll-direction="horizontal"
                  data-scroll-speed="-3"
                  className="py-5 text-4xl md:text-6xl h-full font-bold tracking-widest uppercase"
                >
                  <a className="cursor-pointer" style={{ marginLeft: "2in" }}>
                    TRẢI NGHIỆM
                  </a>
                  <a className="cursor-pointer" style={{ marginLeft: "2in" }}>
                    TỐT NHẤT
                  </a>
                </div>
              </Marquee>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Home;
