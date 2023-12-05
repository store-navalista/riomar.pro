import { AnchorHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'

export type gcHeadingProps = {
   children: ReactNode
   isDecor?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>

export type gcButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
   AnchorHTMLAttributes<HTMLAnchorElement> &
   LabelHTMLAttributes<HTMLLabelElement> & {
      href?: string
      disabled?: boolean
      buttonType?: 'anchor' | 'button' | 'label'
      buttonStyle?: 'filled' | 'unfilled'
      color?: 'primary' | 'secondary'
      isLoading?: boolean
   }
