import React, { FC, useEffect, useRef, useState } from 'react'
import { useAppSelector } from '@/hooks/redux'
import HeadingMain from '../../heading-main/HeadingMain'
import MainBlockService from './MainBlockService'
import css from './MainBlock.module.scss'
import { IMainProps } from '@/types/pages/main'

import bg_1 from '@/img/pages/main/slider/main-bg-1.jpg'
import bg_2 from '@/img/pages/main/slider/main-bg-2.jpg'
import bg_3 from '@/img/pages/main/slider/main-bg-3.jpg'
import bg_4 from '@/img/pages/main/slider/main-bg-4.jpg'

const MainBlock: FC<IMainProps> = ({ content }) => {
   const isLaptop = useAppSelector((state) => state.content.mediaQuery.isLaptop)
   const ref = useRef()
   const [currentImage, setCurrentImage] = useState(0)

   const { title, services } = content

   useEffect(() => {
      const imageInterval = setInterval(() => {
         setCurrentImage((prevImage) => (prevImage + 1) % 4)
      }, 5000)

      return () => {
         clearInterval(imageInterval)
      }
   }, [])

   return (
      <div className={css.wrapper}>
         {!isLaptop && (
            <div className={css.heading}>
               <HeadingMain title={title} />
               {/* <span>&#129045; HOVER</span> */}
               <h2>Fleet Managers Corp.</h2>
            </div>
         )}
         <div className={css.background}>
            {[bg_1, bg_2, bg_3, bg_4].map((image, i) => {
               return (
                  <div
                     key={i}
                     style={{
                        backgroundImage: `url(${image.src})`,
                        opacity: i === currentImage ? 0.9 : 0
                     }}
                  />
               )
            })}
         </div>
         <div ref={ref} className={css.box}>
            <MainBlockService blocks={services} activeService={currentImage} />
         </div>
      </div>
   )
}

export default MainBlock
