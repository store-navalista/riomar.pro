import React, { FC, ReactNode, useEffect, useState } from 'react'
import Seo from './seo'
import st from './Main.layout.module.scss'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useAppSelector } from '@/hooks/redux'
import ContactUs from './ContactUs/ContactUs'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
   const isLaptop = useAppSelector((state) => state.content.mediaQuery.isLaptop)
   const [scrollStep, setcrollStep] = useState(0)
   const scroll = () => {
      setcrollStep(window.pageYOffset)
   }

   useEffect(() => {
      window.addEventListener('scroll', scroll)
   })

   return (
      <>
         <Seo />
         <main className={st.wrapper}>
            <Header scrollStep={scrollStep} />
            {children}
            <ContactUs />
            <Footer scrollStep={scrollStep} isLaptop={isLaptop} />
         </main>
      </>
   )
}

export default MainLayout
