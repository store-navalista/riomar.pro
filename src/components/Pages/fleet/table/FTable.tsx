import { Vessel } from '@/constants/fleet'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import React, { FC } from 'react'
import { useIntl } from 'react-intl'
import Image from 'next/image'
import css from './FTable.module.scss'
import { useAppSelector } from '@/hooks/redux'

const FTableHead: FC = () => {
   const lang = useAppSelector((state) => state.content.i18n)
   const titles = ['name', 'class', 'deadweight']

   return (
      <div className={css.heading}>
         {titles.map((n, i) => (
            <div data-loc={lang} key={i}>
               <span>{dynamicTranslate(`fleet-table.${n}`)}</span>
            </div>
         ))}
      </div>
   )
}

const FTableBody: FC<{ rows: Vessel[] }> = ({ rows }) => {
   const intl = useIntl()
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })

   return (
      <div className={css.rows}>
         {rows.map((v, i) => {
            const { _id, IMO, vclass, foto, deadweight, pdf } = v
            return (
               <a
                  href={`/assets/pdf/fleet/${pdf}.pdf`}
                  download={staticTranslate(`fleet-${_id}`)}
                  key={i}
                  className={css.row}
               >
                  <div className={css.image}>
                     <Image src={`/assets/images/pages/fleet/avatars/${foto}`} layout='fill' alt='vessel' />
                  </div>
                  <p>
                     {dynamicTranslate(`fleet-${_id}`)} <br /> {IMO}
                  </p>
                  <p>{vclass}</p>
                  <p>{deadweight}</p>
                  <span className={css.download} />
               </a>
            )
         })}
      </div>
   )
}

const FTable: FC<{ vessels: Vessel[] }> = ({ vessels }) => {
   const isMobile = useAppSelector((state) => state.content.mediaQuery.isMobile)
   return (
      <div className={css.wrapper}>
         {!isMobile && <FTableHead />}
         <FTableBody rows={vessels} />
      </div>
   )
}

export default FTable
