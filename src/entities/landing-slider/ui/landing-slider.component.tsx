import ImageOne from '/assets/images/landing-slider/1.png'
import ImageTwo from '/assets/images/landing-slider/2.png'
import ImageThree from '/assets/images/landing-slider/3.png'
import ImageFour from '/assets/images/landing-slider/4.png'

import {
  useScroll,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useMotionTemplate, LazyMotion, domAnimation
} from "framer-motion";
import {useRef} from "react";
import {useScrollDirection} from "@shared/lib/hooks";

const slides = [ImageOne, ImageTwo, ImageThree, ImageFour, ImageOne, ImageTwo, ImageThree, ImageFour]
const VELOCITY = 0.3

export const LandingSlider = () => {
  const { scrollY } = useScroll();
  const value = useMotionValue(-50)

  const scrollDirection = useScrollDirection()
  const containerRef = useRef<HTMLDivElement>(null)
  const spring = useSpring(value, {
    stiffness: 25
  })

  const translateX = useMotionTemplate`${spring}%`
  const isInView = useInView(containerRef)


  useMotionValueEvent(scrollY, "change", () => {

    if(isInView){
      if (scrollDirection === 'down') {
        value.set(value.get() + VELOCITY)
        return
      }
      value.set(value.get() - VELOCITY)
    }
  })


  return (
    <LazyMotion features={domAnimation}>
      <div className="overflow-hidden h-[54rem] relative w-full" ref={containerRef}>
        <m.div className="absolute flex left-1/2" style={{translateX}} >
          {
            slides.map((item, index) =>
              <div className="h-[54rem] aspect-square" key={index}>
                <img src={item} alt="sld" className="w-full"/>
              </div>)
          }
        </m.div>
      </div>
    </LazyMotion>
  )
}