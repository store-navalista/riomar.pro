import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import React, { FC } from 'react'
import css from './TabsContent.module.scss'

interface ITabsContent {
   tab: number
}

const Content: FC<{ tab: number }> = ({ tab }) => {
   switch (tab) {
      case 0: {
         return (
            <p>
               {dynamicTranslate('career-vac.title-ship')}
               <a href='/assets/docs/seaman-profile.docx' download>
                  {dynamicTranslate('career-resume.link')}
               </a>
            </p>
         )
      }
      case 1: {
         return <p>{dynamicTranslate('career-vac.title-coast')}</p>
      }
      default:
         return <></>
   }
}

const TabsContent: FC<ITabsContent> = ({ tab }) => {
   return (
      <div className={css.wrapper}>
         <div className={css.block}>
            <Content tab={tab} />
         </div>
      </div>
   )
}

export default TabsContent
