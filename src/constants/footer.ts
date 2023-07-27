export type Item = 'address' | 'phone' | 'mail'

export type IFOOTER = {
   [key in Item]?: Record<string, string>
}

export const FOOTER: IFOOTER[] = [
   {
      address: {
         icon: 'map-location.svg'
      }
   },
   {
      phone: {
         icon: 'phone.svg',
         number: '+7(863)294-38-88'
      }
   },
   {
      mail: {
         url: 'riomar@gmail.com',
         icon: 'mail.svg'
      }
   }
]
