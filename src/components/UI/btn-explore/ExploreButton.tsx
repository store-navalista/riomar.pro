import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import React, { CSSProperties, FC } from 'react'
import st from './ExploreButton.module.scss'

interface IExploreButton {
   href: string
   style?: CSSProperties
}

const ExploreButton: FC<IExploreButton> = ({ style, href }) => {
   return (
      <a href={href} style={{ ...style }} className={st.button}>
         <i />
         <span>{dynamicTranslate('btn-explore')}</span>
      </a>
   )
}

export default ExploreButton
