import Link from 'next/link'
import React, { FC } from 'react'
import css from './GC.button.module.scss'
import { gcButtonProps } from './GC.types'

const GCButton: FC<gcButtonProps> = ({
   children,
   buttonStyle = 'unfilled',
   buttonType = 'button',
   color = 'primary',
   disabled,
   href,
   onClick,
   isLoading = false,
   htmlFor
}) => {
   switch (buttonType) {
      case 'button':
         return (
            <button
               onClick={onClick}
               data-color={color}
               data-type={buttonStyle}
               onMouseDown={(e) => e.preventDefault()}
               className={css.wrapper + `${isLoading ? ' ' + css.loading : ''}`}
               data-disabled={disabled}
            >
               {isLoading ? <span className={css.loader} /> : children}
            </button>
         )
      case 'anchor':
         return (
            <Link href={href}>
               <a data-type={buttonStyle} data-color={color} className={css.wrapper}>
                  {children}
               </a>
            </Link>
         )
      case 'label':
         return (
            <label
               htmlFor={htmlFor}
               data-color={color}
               data-type={buttonStyle}
               className={css.wrapper + `${isLoading ? ' ' + css.loading : ''}`}
               data-disabled={disabled}
            >
               {isLoading ? <span className={css.loader} /> : children}
            </label>
         )
      default:
         return
   }
}

export default GCButton
