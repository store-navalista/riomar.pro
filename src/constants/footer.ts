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
         number: '+44 7308 849885'
      }
   },
   {
      mail: {
         url: 'mi@riomar.pro ',
         icon: 'mail.svg'
      }
   }
]
