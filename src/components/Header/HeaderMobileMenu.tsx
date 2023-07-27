import Link from 'next/link'
import React, { FC, useState } from 'react'
import BurgerButton from '../UI/btn-burger/BurgerButton'
import st from './HeaderMobileMenu.module.scss'
import { ILayoutComponentProps } from '../../types/layout'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import { PAGES } from '@/constants/pages'

const HeaderMobileMenu: FC<ILayoutComponentProps> = ({ scrollStep }) => {
   const [isOpen, setisOpen] = useState(false)
   return (
      <div className={st.wrapper}>
         <BurgerButton isOpen={isOpen} setisOpen={setisOpen} scrollStep={scrollStep} />
         {isOpen && (
            <div
               className={st.list}
               style={{
                  top: scrollStep > 0 ? '50px' : '80px',
                  height: scrollStep > 0 ? 'calc(100vh - 50px' : 'calc(100vh - 80px)'
               }}
            >
               <nav>
                  {PAGES.map((page, i) => {
                     const [{ href }] = Object.values(page)
                     return (
                        <div key={i} className={st.link}>
                           <Link href={href}>
                              <a onClick={() => setisOpen(false)}>{dynamicTranslate(`header-link.${href}`)}</a>
                           </Link>
                        </div>
                     )
                  })}
               </nav>
            </div>
         )}
      </div>
   )
}

export default HeaderMobileMenu
