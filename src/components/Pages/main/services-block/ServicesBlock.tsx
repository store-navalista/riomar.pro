import React, { FC, useRef } from 'react'
import { useAppSelector } from '@/hooks/redux'
import useHover from '@/hooks/useHover'
import HeadingMain from '../../heading-main/HeadingMain'
import css from './ServicesBlock.module.scss'
import { IMainBlock } from '@/types/pages/main'
import { useIntl } from 'react-intl'

import bg_1 from '@/img/pages/main/services/cargo-transportation.jpg'
import bg_2 from '@/img/pages/main/services/technical-management.jpg'
import bg_3 from '@/img/pages/main/services/commercial-management.jpg'
import bg_4 from '@/img/pages/main/services/crewing-management.jpg'
import Image from 'next/image'

const ServicesBlock: FC<{ content: IMainBlock[] }> = ({ content }) => {
   const intl = useIntl()
   const isLaptop = useAppSelector((state) => state.content.mediaQuery.isLaptop)
   const ref = useRef()
   const isHovering = useHover(ref)
   const images = [bg_1, bg_2, bg_3, bg_4]
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })

   return (
      <div className={css.wrapper}>
         {!isLaptop ? (
            <div className={css.heading}>
               <HeadingMain title={staticTranslate('main-services.title')} />
            </div>
         ) : (
            <div className={css.separate} />
         )}
         {content.map((service, i) => {
            const { title, description } = service
            return (
               <section id={`page-${i}`} key={i}>
                  <div className={css.block}>
                     <div className={css.image}>
                        <Image src={images[i]} width={500} height={500} alt='Service' />
                     </div>
                     <div className={css.textblock}>
                        <h3>{title}</h3>
                        <span style={{ backgroundImage: `url(/assets/images/svg/tech-icon-${i + 1}.svg)` }} />
                        <p>{description}</p>
                     </div>
                  </div>
               </section>
            )
         })}
      </div>
   )
}

export default ServicesBlock
