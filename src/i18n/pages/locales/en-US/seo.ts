import { PageNames } from '@/constants/pages'

interface SEO {
   siteTitle: string
   pageTitle: string
   description: string
}

type Pages = PageNames | 'main'

export type ISEO = {
   [key in Pages]: SEO
}

export default {
   'about-us': {
      siteTitle: 'Riomar',
      pageTitle: 'About Us',
      description: 'When you get to know Riomar, you will want to work with us.'
   },
   fleet: {
      siteTitle: 'Riomar',
      pageTitle: 'Fleet',
      description:
         'The shipping company Riomar owns its own tanker fleet and carries out transportation mainly in the Caspian, Azov, Black, Marmara Seas and inland shipping.'
   },
   career: {
      siteTitle: 'Riomar',
      pageTitle: 'Career',
      description: 'Build your career with a team of specialists in a professional company.'
   },
   contacts: {
      siteTitle: 'Riomar',
      pageTitle: 'Contacts',
      description: 'Contact us for further cooperation.'
   },
   main: {
      siteTitle: 'Riomar',
      pageTitle: 'Main Page',
      description:
         'The shipping company Riomar owns its own tanker fleet and carries out transportation mainly in the Caspian, Azov, Black, Marmara Seas and inland shipping. Company specializes in the transportation of crude oil and various bulk cargoes.'
   }
} as ISEO
