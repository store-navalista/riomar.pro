import React, { FC, ReactNode, useEffect, useState } from 'react'
import Seo from './seo'
import st from './Main.layout.module.scss'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { SEO } from '@/i18n/pages/locales'
import { useAppSelector } from '@/hooks/redux'
import ContactUs from './ContactUs/ContactUs'
import { useRouter } from 'next/router'

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
   const router = useRouter()
   const lang = useAppSelector((state) => state.content.i18n)
   const page = router.pathname.length !== 1 ? router.pathname.slice(1) : 'main'
   const seo = SEO[lang][page]
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
         <Seo {...seo} />
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
