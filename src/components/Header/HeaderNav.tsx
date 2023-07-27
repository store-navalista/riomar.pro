import React from 'react'
import css from './HeaderNav.module.scss'
import Link from 'next/link'
import { useAppSelector } from '@/hooks/redux'
import { PAGES } from '@/constants/pages'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'

const HeaderNav = () => {
   const currentPage = useAppSelector((state) => state.content.currentPage)

   return (
      <nav className={css.nav}>
         {PAGES.map((page, i) => {
            const [name] = Object.keys(page)
            const [{ href }] = Object.values(page)

            return (
               <Link key={i} href={`${href}`}>
                  <a className={css.link + ` ${currentPage === name ? css.active : ''}`}>
                     {dynamicTranslate(`header-link.${name}`)}
                  </a>
               </Link>
            )
         })}
      </nav>
   )
}

export default HeaderNav
