import React, { FC } from 'react'
import css from './GC.heading.module.scss'
import { gcHeadingProps } from './GC.types'

const GCHeading: FC<gcHeadingProps> = ({ children, isDecor = true, style }) => {
   return (
      <div className={css.heading}>
         <h1 style={style}>{children}</h1>
         {isDecor && <span />}
      </div>
   )
}

export default GCHeading
