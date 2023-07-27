import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import React, { FC, Fragment, useState } from 'react'
import css from './TabsJobs.module.scss'
import { Jobs } from '@/constants/career'
import { CareerContent as content } from '@/i18n/pages/locales'
import { useAppSelector } from '@/hooks/redux'
import Image from 'next/image'

const TabsJobs: FC = () => {
   const lang = useAppSelector((state) => state.content.i18n)
   const [activeButtonIndex, setActiveButtonIndex] = useState(null)

   return (
      <div className={css.wrapper}>
         <div className={css.block}>
            <h2>{dynamicTranslate('career-vac.find')}</h2>
            {Jobs.map((j, i) => {
               const [vessel] = Object.keys(j)
               const [vacs] = Object.values(j)
               const currentVacs = content[lang].filter((m) => vacs.includes(m._id))

               return (
                  <div key={i} className={css.vessel}>
                     <h4>{dynamicTranslate(`career-vessel.${vessel}`)}</h4>
                     <ul>
                        {currentVacs.map((_) => {
                           const { title, description, _id } = _
                           return (
                              <>
                                 <li
                                    onClick={() => setActiveButtonIndex(activeButtonIndex === i ? null : i)}
                                    key={i}
                                    className={!description ? css.disable : activeButtonIndex === i ? css.active : ''}
                                 >
                                    <div className={css.vac_block}>
                                       <div className={css.icon}>
                                          <Image src={`/assets/images/svg/vac-${_id}.svg`} layout='fill' alt={title} />
                                       </div>
                                       <span className={css.title}>{title}</span>
                                       <span className={css.open} />
                                    </div>
                                    {description && activeButtonIndex === i && (
                                       <div className={css.desc}>{description}</div>
                                    )}
                                 </li>
                              </>
                           )
                        })}
                     </ul>
                  </div>
               )
            })}
         </div>
      </div>
   )
}

export default TabsJobs
