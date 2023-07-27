import React, { Fragment, useEffect, useState } from 'react'
import { GetStaticProps, NextPage } from 'next'
import css from './index.module.scss'
import { IAboutProps } from '@/types/pages/about'
import { AboutContent as content } from '@/i18n/pages/locales'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Loader from '@/components/UI/loader/Loader'
import { SERVICES } from '@/constants/services'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import Modal from '@/components/UI/modals/Modal'
import Image from 'next/image'
import { ContentActions } from '@/store/reducers/contentReducer'

import license from '@/img/pages/about-us/lic.jpg'
import license_men from '@/img/pages/about-us/lic-min.jpg'
import GC from '@/components/GC/GlobalComponent'

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
   const width = 500

   return (
      <div className={css.wrapper}>
         <div className={css.info}>
            <GC.Heading>{dynamicTranslate('about-title')}</GC.Heading>
            <div className={css.textDesc}>{dynamicTranslate('about-description')}</div>
            <div className={css.license}>
               <Image src={license_men} width={width} height={width * 1.43} alt='License' />
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
                     <div className={css.video}>
                        <video autoPlay loop>
                           <source src={`/assets/images/pages/about-us/gifs/${SERVICES[i].video}`} type='video/mp4' />
                           Your browser does not support the video tag.
                        </video>
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
