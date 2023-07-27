import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { MainContent as content } from '@/i18n/pages/locales'
import { IMainProps } from '@/types/pages/main'
import { useAppSelector } from '@/hooks/redux'
import MainBlock from '@/components/Pages/main/main-block/MainBlock'
import Loader from '@/components/UI/loader/Loader'
import Description from '@/components/Pages/main/description/Description'
import ServicesBlock from '@/components/Pages/main/services-block/ServicesBlock'

const Home: NextPage = ({ content }: IMainProps) => {
   const lang = useAppSelector((state) => state.content.i18n)
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(false)
   })

   if (isLoading) return <Loader />

   return (
      <>
         <MainBlock content={content[lang]} />
         <Description />
         <ServicesBlock content={content[lang].services} />
      </>
   )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
   return {
      props: {
         content
      }
   }
}
