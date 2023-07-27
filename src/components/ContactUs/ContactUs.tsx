import React, { FC, useEffect, useState } from 'react'
import css from './ContactUs.module.scss'
import GC from '../GC/GlobalComponent'
import GoogleMapReact from 'google-map-react'
import { useIntl } from 'react-intl'
import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import { useAppSelector } from '@/hooks/redux'
import { useRouter } from 'next/router'
import axios from 'axios'

interface IMarker {
   lat: number
   lng: number
}

const Marker: FC<IMarker> = () => <div className={css.marker} />

const ContactUs: FC = () => {
   const loc = useAppSelector((state) => state.content.currentLang)
   const router = useRouter()
   const intl = useIntl()
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })
   const defaultProps = {
      center: {
         lat: 47.22683336022236,
         lng: 39.747965461825586
      },
      zoom: 11
   }
   const initData = {
      name: '',
      mail: '',
      theme: staticTranslate('contacts-from.dropdown-1'),
      comment: ''
   }
   const initErrors = { name: '', mail: '', comment: '' }
   const [data, setData] = useState(initData)
   const [errors, setErrors] = useState(initErrors)
   const [isSelect, setisSelect] = useState(false)
   const [isLoading, setisLoading] = useState(false)

   const validation = () => {
      const err = initErrors
      const emailReg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
      err['mail'] = !emailReg.test(data.mail) ? staticTranslate('errors-name.mail') : ''
      err['name'] = !data.name
         ? staticTranslate('errors-name.empty')
         : data.name.length < 3
         ? staticTranslate('errors-name.count')
         : ''
      err['comment'] = !data.comment ? staticTranslate('errors-name.comment') : ''
      setErrors(err)
      return Object.values(err).join('')
   }

   useEffect(() => {
      setData({ ...data, theme: staticTranslate('contacts-from.dropdown-1') })
      if (Object.values(errors).join('')) validation()
   }, [loc])

   useEffect(() => {
      setErrors(initErrors)
      setisSelect(false)
   }, [router.pathname])

   const send = async () => {
      setisLoading(true)
      const isNotValid = validation()
      if (isNotValid) return setisLoading(false)
      try {
         const response = await axios.post('/api/send-email', data)
         console.log('Success:', response.data)
      } catch (error) {
         console.error('Error:', error)
      } finally {
         setisLoading(false)
      }
   }

   const theme = (c: number) => {
      setData({ ...data, theme: staticTranslate(`contacts-from.dropdown-${c}`) })
      setisSelect(isLoading)
   }

   return (
      <div className={css.wrapper}>
         <section>
            <h5>{dynamicTranslate('contacts-title')}</h5>
            <div className={css.block}>
               <div className={css.contact}>
                  <div className={css.input + `${errors.name ? ' ' + css.error : ''}`}>
                     <label htmlFor='name'>{dynamicTranslate('contacts-field.name')}</label>
                     <input
                        onFocus={() => setErrors({ ...errors, name: '' })}
                        onBlur={validation}
                        id='name'
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder={staticTranslate('contacts-field.name-ph')}
                     />
                     {errors.name && <p className={css.errorMessage}>{errors.name}</p>}
                  </div>
                  <div className={css.input + `${errors.mail ? ' ' + css.error : ''}`}>
                     <label htmlFor='mail'>{dynamicTranslate('contacts-field.mail')}</label>
                     <input
                        onFocus={() => setErrors({ ...errors, mail: '' })}
                        onBlur={validation}
                        id='mail'
                        onChange={(e) => setData({ ...data, mail: e.target.value })}
                        placeholder={staticTranslate('contacts-field.mail-ph')}
                     />
                     {errors.mail && <p className={css.errorMessage}>{errors.mail}</p>}
                  </div>

                  <div className={css.input + ' ' + css.dropdown}>
                     <label htmlFor='theme'>{dynamicTranslate('contacts-field.dropdown')}</label>
                     <input
                        onClick={() => setisSelect(!isSelect)}
                        value={data.theme}
                        id='theme'
                        className={css.input}
                        readOnly
                     />
                     <button />
                     {isSelect && (
                        <div className={css.select}>
                           {[1, 2, 3].map((n) => (
                              <span key={n} onClick={() => theme(n)}>
                                 {dynamicTranslate(`contacts-from.dropdown-${n}`)}
                              </span>
                           ))}
                        </div>
                     )}
                  </div>

                  <div className={css.input + `${errors.comment ? ' ' + css.error : ''}`}>
                     <label htmlFor='comment'>{dynamicTranslate('contacts-field.comment')}</label>
                     <textarea
                        onFocus={() => setErrors({ ...errors, comment: '' })}
                        onBlur={validation}
                        id='comment'
                        onChange={(e) => setData({ ...data, comment: e.target.value })}
                        placeholder={staticTranslate('contacts-field.comment-ph')}
                     />
                     {errors.comment && <p className={css.errorMessage}>{errors.comment}</p>}
                  </div>
                  <GC.Button isLoading={isLoading} onClick={send} buttonStyle='filled' color='secondary'>
                     {dynamicTranslate('contacts-submit')}
                  </GC.Button>
               </div>
               <div className={css.map}>
                  <GoogleMapReact
                     bootstrapURLKeys={{ key: 'AIzaSyC4IBXcJYRoUPljEc8uhG_WK855ZCzn0gA' }}
                     defaultCenter={defaultProps.center}
                     defaultZoom={defaultProps.zoom}
                     yesIWantToUseGoogleMapApiInternals
                  >
                     <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
                  </GoogleMapReact>
               </div>
            </div>
         </section>
      </div>
   )
}

export default ContactUs
