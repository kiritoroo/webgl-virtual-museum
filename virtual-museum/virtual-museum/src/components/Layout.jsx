import React, { useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Cursor from "./Cursor";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll
} from "react-locomotive-scroll";
import { AnimateSharedLayout } from "framer-motion";
import { useRouter } from "../hooks/useRouter";


const Layout = (props) => {
  const containerRef = useRef(null)
  const router = useRouter()
  const pathname = router.pathname
  const path = pathname.split("?")[0]
  const { scroll } = useLocomotiveScroll()
  
  return (
    <AnimateSharedLayout type="crossfade">
      <LocomotiveScrollProvider
        options={{
          smooth: true
        }}
        watch={[path]}
        location={path}
        containerRef={containerRef}
        onLocationChange={(scroll) =>
          scroll.scrollTo(0, { duration: 0, disableLerp: true })
        }
      >
        <div data-scroll-container className="w-screen" ref={containerRef}>
          <div
            className="Layout md:px-4 container mx-auto bg-light antialiased text-gray-900 w-screen h-full"
          >
            <Header />
              {props.children}
            <Footer scroll={scroll}/>
          </div>
        </div>
      </LocomotiveScrollProvider>

      <Cursor />
    </AnimateSharedLayout>
  );
};

export default Layout;
