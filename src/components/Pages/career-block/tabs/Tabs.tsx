import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import React, { Dispatch, FC, SetStateAction } from 'react'
import css from './Tabs.module.scss'
import { ITabsProps } from '@/constants/career'

interface ITabs {
   tabs: ITabsProps[]
   setTab: Dispatch<SetStateAction<number>>
}

const Tabs: FC<ITabs> = ({ tabs, setTab }) => {
   return (
      <div className={css.wrapper}>
         <div className={css.tabs}>
            {tabs.map((tab, i) => {
               const { _id } = tab
               return (
                  <button onClick={() => setTab(i)} key={i} className={css.tab}>
                     <span
                        style={{ backgroundImage: `url(/assets/images/svg/tabs-${_id}.svg)` }}
                        className={css.image}
                     />
                     <span>{dynamicTranslate(`career-${_id}`)}</span>
                  </button>
               )
            })}
         </div>
      </div>
   )
}

export default Tabs
