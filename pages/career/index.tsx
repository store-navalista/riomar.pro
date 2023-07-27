import React, { FC, useEffect, useState } from 'react'
import { NextPage } from 'next'
import css from './index.module.scss'
import Loader from '@/components/UI/loader/Loader'
import GC from '@/components/GC/GlobalComponent'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import Image from 'next/image'
import Tabs from '@/components/Pages/career-block/tabs/Tabs'
import { TabsProps } from '@/constants/career'
import TabsContent from '@/components/Pages/career-block/tabs-content/TabsContent'
import TabsJobs from '@/components/Pages/career-block/tabs-content/TabsJobs'
import TabsResume from '@/components/Pages/career-block/tabs-content/TabsResume'

const Tab: FC<{ tab: number }> = ({ tab }) => {
   switch (tab) {
      case 0:
         return <TabsJobs />
      case 2:
         return <TabsResume />
      default:
         return
   }
}

const Career: NextPage = () => {
   const [tab, setTab] = useState(0)

   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      setLoading(false)
   })

   if (isLoading) return <Loader />

   return (
      <div className={css.wrapper}>
         <GC.Heading>{dynamicTranslate('career-title')}</GC.Heading>
         <div className={css.block}>
            <Tabs setTab={setTab} tabs={TabsProps} />
            <div className={css.image}>
               <Image src={`/assets/images/pages/career/${TabsProps[tab]._id}.png`} layout='fill' alt='License' />
            </div>
            <TabsContent tab={tab} />
            <Tab tab={tab} />
         </div>
      </div>
   )
}

export default Career
