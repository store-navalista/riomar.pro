import React, { FC } from 'react'
import { ILayoutComponentProps } from '@/types/layout'
import FooterMenu from './FooterMenu'

const Footer: FC<ILayoutComponentProps> = ({ scrollStep, isLaptop }) => {
   return <>{!isLaptop && <FooterMenu scrollStep={scrollStep} />}</>
}

export default Footer
