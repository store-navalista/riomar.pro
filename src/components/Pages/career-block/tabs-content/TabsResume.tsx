import { dynamicTranslate } from '@/i18n/pages/locales/helpers'
import React, { FC, useEffect, useReducer, useRef, useState } from 'react'
import css from './TabsResume.module.scss'
import { useAppSelector } from '@/hooks/redux'
import GC from '@/components/GC/GlobalComponent'
import { useIntl } from 'react-intl'

const TabsResume: FC = () => {
   const intl = useIntl()
   const staticTranslate = (id: string) => intl.formatMessage({ id: id, defaultMessage: id })
   const loc = useAppSelector((state) => state.content.currentLang)
   const [fileName, setFileName] = useState('No files')
   const [icon, setIcon] = useState('icon.file-upload.svg')
   const [isLoading, setisLoading] = useState(false)
   const fileInput = useRef<HTMLInputElement>()

   type TData = {
      position: string
      name: string
      phone: string
      mail: string
      file: string
   }

   const fields: TData = { position: '', name: '', phone: '', mail: '', file: '' }

   const sep = (s, a, t) => {
      switch (t) {
         case 'position':
            return { ...s, position: a }
         case 'name':
            return { ...s, name: a }
         case 'phone':
            return { ...s, phone: a }
         case 'mail':
            return { ...s, mail: a }
         case 'file':
            return { ...s, file: a }
         default:
            return s
      }
   }

   const [errors, setErrors] = useReducer((state, action) => sep(state, action.payload, action.type), fields)
   const [data, setData] = useReducer((state, action) => sep(state, action.payload, action.type), fields)
   const [isErrorVisible, setisErrorVisible] = useState(false)

   type EndsTypes = '.pdf' | '.doc' | '.docx' | '.xlsx'

   const fileUpload = (e) => {
      const selectedFile = e.target.files[0]
      const checkEnds = (ex: EndsTypes) => selectedFile.name.toLowerCase().endsWith(ex)
      const allowedExtensions = ['.pdf', '.doc', '.docx', '.xlsx'] as EndsTypes[]

      if (selectedFile && allowedExtensions.some((ex) => checkEnds(ex))) {
         formatIcon(allowedExtensions.findIndex((ex) => checkEnds(ex)))
         setErrors({ type: 'file', payload: '' })
         setFileName(selectedFile.name)
         setData({ type: 'file', payload: selectedFile })
      } else {
         setFileName('No files')
         if (!e.target.files.length) {
            setIcon('icon.file-upload.svg')
            return setErrors({ type: 'file', payload: dynamicTranslate('errors-file.empty') })
         }
         setErrors({ type: 'file', payload: dynamicTranslate('errors-file.ends') })
      }
   }

   const formatIcon = (icon: number) => {
      switch (icon) {
         case 0:
            return setIcon('icon.file-pdf.svg')
         case 2:
            return setIcon('icon.file-doc.svg')
         case 3:
            return setIcon('icon.file-xls.svg')
         default:
            return setIcon('icon.file-upload.svg')
      }
   }

   useEffect(() => {
      validation()
   }, [loc, data])

   const validation = () => {
      const maxSize = 5 * 1024 * 1024 /* 5MB **/
      Object.keys(fields).forEach((f) => setErrors({ type: f, payload: '' }))

      !data.position && setErrors({ type: 'position', payload: staticTranslate('errors-position.empty') })
      !data.phone && setErrors({ type: 'phone', payload: staticTranslate('errors-phone.empty') })
      !data.name && setErrors({ type: 'name', payload: staticTranslate('errors-name.empty') })
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.mail) &&
         setErrors({ type: 'mail', payload: staticTranslate('errors-name.mail') })
      !data.mail && setErrors({ type: 'mail', payload: staticTranslate('errors-mail.empty') })
      data.file.size > maxSize && setErrors({ type: 'file', payload: dynamicTranslate('errors-file.size') })
      !fileInput.current.files.length && setErrors({ type: 'file', payload: dynamicTranslate('errors-file.empty') })
   }

   const send = async (e) => {
      e.preventDefault()
      setisErrorVisible(true)
      if (!Object.values(errors).join('')) {
         setisLoading(true)
         const formData = new FormData()
         formData.append('position', data.position)
         formData.append('name', data.name)
         formData.append('phone', data.phone)
         formData.append('mail', data.mail)
         formData.append('file', data.file)
         try {
            const response = await fetch('/api/send-resume', {
               method: 'POST',
               body: formData
            })

            if (!response.ok) {
               console.log('Error:', response)
               setisLoading(false)
            } else {
               const responseData = await response.json()
               console.log('Success:', responseData)
               setisLoading(false)
            }
         } catch (error) {
            console.log('Exception:', error)
         }
      }
   }

   return (
      <div className={css.wrapper}>
         <div className={css.form}>
            <h5>{dynamicTranslate('career-resume.title')}</h5>
            <div className={css.block_field}>
               {(['position', 'name', 'phone', 'mail'] as (keyof TData)[]).map((_, i) => {
                  return (
                     <div key={i} className={`${css.field} ${errors[_] && isErrorVisible && css.error}`}>
                        <label>{dynamicTranslate(`career-resume.field-${_}`)}</label>
                        <input
                           value={data[_]}
                           onBlur={validation}
                           onChange={(e) => {
                              switch (_) {
                                 case 'phone': {
                                    if (/^(\+?[0-9]*)$/.test(e.target.value)) {
                                       setData({ type: _, payload: e.target.value })
                                    }
                                    break
                                 }
                                 default:
                                    return setData({ type: _, payload: e.target.value })
                              }
                           }}
                           placeholder={staticTranslate(`career-resume.field-${_}.ph`)}
                        />
                        {errors[_] && (
                           <p style={{ opacity: isErrorVisible ? 1 : 0 }} className={css.error}>
                              {errors[_]}
                           </p>
                        )}
                     </div>
                  )
               })}
            </div>
            <div className={css.block_file}>
               <div className={css.choose}>
                  <input
                     ref={fileInput}
                     onChange={(e) => fileUpload(e)}
                     type='file'
                     accept='.pdf, .doc, .docx, .xlsx'
                     name='file'
                     id='input__file'
                     className={css.input_file}
                  />
                  <GC.Button htmlFor='input__file' buttonType='label'>
                     {dynamicTranslate('career-resume.file')}
                  </GC.Button>
                  <span style={{ backgroundImage: `url(/assets/images/svg/${icon})` }} />
                  {errors.file && (
                     <p style={{ opacity: isErrorVisible ? 1 : 0 }} className={`${css.error} ${css.errorFile}`}>
                        {errors.file}
                     </p>
                  )}
               </div>
               <GC.Button isLoading={isLoading} onClick={send} color='secondary' buttonStyle='filled'>
                  {dynamicTranslate('career-resume.send')}
               </GC.Button>
            </div>
            <p className={css.fileName}>{fileName}</p>
         </div>
      </div>
   )
}

export default TabsResume
