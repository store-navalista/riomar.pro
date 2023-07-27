import React, { FC } from 'react'
import css from './Description.module.scss'
import Image from 'next/image'
import GC from '@/components/GC/GlobalComponent'
import { PAGES } from '@/constants/pages'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'

const Description: FC = () => {
   const { 'about-us': aboutUs } = PAGES.find((obj) => 'about-us' in obj)

   return (
      <div className={css.wrapper}>
         <div className={css.content}>
            <span>{dynamicTranslate('main-description.title')}</span>
            <h1>{dynamicTranslate('main-description')}</h1>
            <GC.Button buttonType='anchor' href={aboutUs.href}>
               {dynamicTranslate('main-description.button')}
            </GC.Button>
         </div>
         <Image src='/assets/images/pages/main/description/background.png' width={800} height={800} alt='Tanker' />
      </div>
   )
}

export default Description
