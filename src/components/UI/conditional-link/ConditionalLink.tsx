import Link from 'next/link'
import React, { FC, ReactNode } from 'react'

interface IConditionalLinkProps {
   href: string
   as?: string
   children: ReactNode
   disabled?: boolean
   className?: string
}

const ConditionalLink: FC<IConditionalLinkProps> = ({ href, as, children, disabled = false, className }) => {
   if (disabled) {
      return <div className={className}>{children}</div>
   }

   return (
      <Link href={href} as={as} passHref>
         <a className={className}>{children}</a>
      </Link>
   )
}

export default ConditionalLink
