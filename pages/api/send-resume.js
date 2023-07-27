import multer from 'multer'
import nodemailer from 'nodemailer'
import path from 'path'
import fs from 'fs'

export const config = {
   api: {
      bodyParser: false
   }
}

const upload = multer({
   dest: '/tmp',
   limits: {
      fileSize: 5 * 1024 * 1024
   },
   fileFilter: (req, file, cb) => {
      const filetypes = /pdf|doc|docx|xls/
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
      const mimetype = filetypes.test(file.mimetype)

      if (mimetype && extname) {
         return cb(null, true)
      } else {
         return cb('Error: File upload only supports the following filetypes - ' + filetypes)
      }
   }
})

export default async function handler(req, res) {
   if (req.method === 'POST') {
      upload.single('file')(req, res, function (err) {
         if (err instanceof multer.MulterError) {
            res.status(500).json({ error: err })
            return
         } else if (err) {
            res.status(500).json({ error: err })
            return
         }

         const { position, name, phone, mail } = req.body
         const file = req.file
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: process.env.MAIL_USER,
               pass: process.env.MAIL_PASS
            },
            tls: {
               rejectUnauthorized: false
            }
         })

         const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.EMAIL,
            subject: `Message from ${name}`,
            html: `<table style="border-collapse: collapse; border-spacing: 0">
               <thead>
                 <tr>
                   <th
                     colspan="2"
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 16px;
                       font-weight: bold;
                       overflow: hidden;
                       padding: 10px 15px;
                       word-break: normal;
                       text-align: center;
                       vertical-align: top;
                       background-color: #d2232a;
                       color: #fff;
                     "
                   >
                     Запрос на трудоустройство
                   </th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 14px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       font-weight: bold;
                       text-align: left;
                       vertical-align: middle;
                     "
                   >
                     Должность:
                   </td>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 16px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       background-color: #efefef;
                       color: #003d63;
                       text-align: left;
                       vertical-align: top;
                     "
                   >
                     ${position}
                   </td>
                 </tr>
                 <tr>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 14px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       font-weight: bold;
                       text-align: left;
                       vertical-align: middle;
                     "
                   >
                     Кандидат:
                   </td>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 16px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       background-color: #efefef;
                       color: #003d63;
                       text-align: left;
                       vertical-align: top;
                     "
                   >
                     ${name}
                   </td>
                 </tr>
                 <tr>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 14px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       font-weight: bold;
                       text-align: left;
                       vertical-align: top;
                     "
                   >
                     Номер телефона:
                   </td>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 16px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       background-color: #efefef;
                       color: #003d63;
                       text-align: left;
                       vertical-align: top;
                     "
                   >
                   <a href='tel:${phone}'>${phone}</a>
                   </td>
                 </tr>
                 <tr>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 14px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       font-weight: bold;
                       text-align: left;
                       vertical-align: top;
                     "
                   >
                     Почта:
                   </td>
                   <td
                     style="
                       border-color: #9b9b9b;
                       border-style: solid;
                       border-width: 1px;
                       font-family: Arial, sans-serif;
                       font-size: 16px;
                       overflow: hidden;
                       padding: 10px 5px;
                       word-break: normal;
                       background-color: #efefef;
                       color: #003d63;
                       text-align: left;
                       vertical-align: top;
                     "
                   >
                   <a href='mailto:${mail}'>${mail}</a>
                   </td>
                 </tr>
               </tbody>
             </table>
             `,
            attachments: [
               {
                  filename: file.originalname,
                  path: file.path
               }
            ]
         }

         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               res.status(500).json({ error })
            } else {
               fs.unlink(file.path, (err) => {
                  if (err) {
                     console.error('Error deleting the file: ', err)
                  }
               })

               res.status(200).json({ success: true })
            }
         })
      })
   } else {
      res.status(405).json({ error: 'We only support POST' })
   }
}
