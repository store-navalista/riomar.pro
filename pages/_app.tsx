import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import '../styles/main.scss'
import MainLayout from '@/components/Main.layout'
import { I18nProvider } from '@/i18n'
import { Provider } from 'react-redux'
import store from '@/store/store'
import { CookiesProvider } from 'react-cookie'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { Cookies } from 'react-cookie'
import { ContentActions } from '@/store/reducers/contentReducer'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

type IAppWrapperProps = Pick<AppProps, 'Component' | 'pageProps'>

function AppWrapper({ Component, pageProps }: IAppWrapperProps) {
   const dispatch = useAppDispatch()
   const currentMQ = useAppSelector((state) => state.content.mediaQuery)
   const isModalShow = useAppSelector((state) => state.content.isModalShow)
   const isLoading = useAppSelector((state) => state.content.loading)
   const cookies = new Cookies().get('language')
   const isMobile = useMediaQuery({ query: '(max-width: 870px)' })
   const isLaptop = useMediaQuery({ query: '(max-width: 1366px)' })
   const router = useRouter()

   useEffect(() => {
      dispatch(ContentActions.setCurrentPage(router.pathname.length !== 1 ? router.pathname.slice(1) : '/'))
   }, [router.pathname])

   useEffect(() => {
      if (cookies) dispatch(ContentActions.setLanguage(cookies))
      dispatch(ContentActions.setLoading(false))
   })

   useEffect(() => {
      dispatch(
         ContentActions.setMediaQuery({
            ...currentMQ,
            isMobile: isMobile,
            isLaptop: isLaptop
         })
      )
   }, [isLoading])

   useEffect(() => {
      dispatch(ContentActions.setMediaQuery({ ...currentMQ, isMobile: isMobile }))
   }, [isMobile])

   useEffect(() => {
      dispatch(ContentActions.setMediaQuery({ ...currentMQ, isLaptop: isLaptop }))
   }, [isLaptop])

   useEffect(() => {
      document.body.style.overflow = isModalShow ? 'hidden' : 'auto'

      return () => {
         document.body.style.overflow = 'auto'
      }
   }, [isModalShow])

   return (
      <MainLayout>
         <Component {...pageProps} />
      </MainLayout>
   )
}

const MyApp = ({ Component, pageProps }: IAppWrapperProps) => {
   return (
      <Provider store={store}>
         <CookiesProvider>
            <I18nProvider>
               <AppWrapper Component={Component} pageProps={pageProps} />
            </I18nProvider>
         </CookiesProvider>
      </Provider>
   )
}

export default MyApp
