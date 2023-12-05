import GC from '@/components/GC/GlobalComponent'
import Loader from '@/components/UI/loader/Loader'
import Modal from '@/components/UI/modals/Modal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { AboutContent as content } from '@/i18n/pages/locales'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import { ContentActions } from '@/store/reducers/contentReducer'
import { IAboutProps } from '@/types/pages/about'
import { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import css from './index.module.scss'

import img_1 from '@/img/pages/about-us/images/img-1.jpg'
import img_2 from '@/img/pages/about-us/images/img-2.jpg'
import img_3 from '@/img/pages/about-us/images/img-3.jpg'
import img_4 from '@/img/pages/about-us/images/img-4.jpg'
import license_men from '@/img/pages/about-us/lic-min.jpg'
import license from '@/img/pages/about-us/lic.jpg'
const images = [img_1, img_2, img_3, img_4]

const About: NextPage = ({ content }: IAboutProps) => {
   const lang = useAppSelector((state) => state.content.i18n)
   const services = content[lang]
   const [isLoading, setLoading] = useState(false)
   const modalProps = useAppSelector((state) => state.content.modalProps)
   const dispatch = useAppDispatch()

   const zoom = () => {
      dispatch(ContentActions.setModalProps(license.src))
      dispatch(ContentActions.toggleModalShow(true))
   }

   useEffect(() => {
      setLoading(false)
   })

   if (isLoading) return <Loader />
   const lic_width = 600
   const img_width = 1200

   return (
      <div className={css.wrapper}>
         <div className={css.info}>
            <GC.Heading style={{ textTransform: 'none' }}>{dynamicTranslate('about-title')}</GC.Heading>
            <div className={css.textDesc}>{dynamicTranslate('about-description')}</div>
            <div className={css.license}>
               <Image src={license_men} width={lic_width * 1.43} height={lic_width} alt='License' />
               <button onClick={zoom} />
            </div>
            {services.map((service, i) => {
               const { title, description } = service
               return (
                  <Fragment key={i}>
                     <div className={css.textServ}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                     </div>
                     <div className={css.image}>
                        <Image src={images[i]} width={img_width * 1.43} height={img_width} alt='Service' />
                     </div>
                  </Fragment>
               )
            })}
         </div>
         <Modal type='zoomImage' image={modalProps} />
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   return {
      props: {
         content
      }
   }
}

export default About
