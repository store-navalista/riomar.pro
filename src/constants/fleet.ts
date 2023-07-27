type ID = 'captain-shemilkin' | 'captain-pshenitsin' | 'samara-city' | 'astrakhan-city'

type FleetType = 'oil' | 'product'

export interface Vessel {
   _id: ID
   IMO: number
   vclass: string
   deadweight: string
   foto?: string
   pdf?: string
}

type TFleet = {
   [type in FleetType]: Vessel[]
}

export default {
   oil: [
      {
         _id: 'captain-shemilkin',
         IMO: 8727965,
         vclass: 'KM L4 1 R2-RSN Oil Tanker',
         deadweight: '5562 MT',
         foto: 'captain-shemilkin.jpg',
         pdf: 'captain-shemilkin'
      },
      {
         _id: 'captain-pshenitsin',
         IMO: 8727941,
         vclass: 'KM L4 1 R2-RSN Oil Tanker',
         deadweight: '5562 MT',
         foto: 'captain-pshenitsin.jpg',
         pdf: 'captain-pshenitsin'
      }
   ],
   product: [
      {
         _id: 'samara-city',
         IMO: 8711966,
         vclass: 'KM(*) L4  [1]  R2-RSN Oil/chemical tanker type 2',
         deadweight: '5580 MT',
         foto: 'samara-city.jpg',
         pdf: 'samara-city'
      },
      {
         _id: 'astrakhan-city',
         IMO: 9080156,
         vclass: 'KM(*) L4  [1]  R2-RSN Oil/chemical tanker type 2',
         deadweight: '5619 MT',
         foto: 'astrakhan-city.jpg',
         pdf: 'astrakhan-city'
      },
      {
         _id: 'kazan-city',
         IMO: 9104782,
         vclass: 'KM(*) L4  [1]  R2-RSN Oil/chemical tanker type 2',
         deadweight: '5619 MT',
         foto: 'kazan-city.jpg',
         pdf: 'kazan-city'
      }
   ]
} as TFleet
