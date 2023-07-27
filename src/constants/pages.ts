export type PageNames = 'about-us' | 'fleet' | 'career' | 'contacts'

interface Page {
   href: string
}

export type IPAGES = {
   [key in PageNames]?: Page
}

export const PAGES: IPAGES[] = [
   {
      'about-us': {
         href: 'about-us'
      }
   },
   {
      fleet: {
         href: 'fleet'
      }
   },
   {
      career: {
         href: 'career'
      }
   },
   {
      contacts: {
         href: 'contacts'
      }
   }
]
