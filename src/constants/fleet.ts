type ID = 'rodion-oslyabya' | 'dmitriy-donskoy' | 'dobrynya-nikitich' | 'ilya-muromets' | 'muse' | 'volgo-balt-242'

type FleetType = 'cargo'

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
   cargo: [
      {
         _id: 'rodion-oslyabya',
         IMO: 8891560,
         vclass: 'General Cargo',
         deadweight: '3709 MT',
         foto: 'captain-shemilkin.jpg',
         pdf: 'captain-shemilkin'
      },
      {
         _id: 'dmitriy-donskoy',
         IMO: 8872526,
         vclass: 'General Cargo',
         deadweight: '3853 MT',
         foto: 'dmitriy-donskoy.jpg',
         pdf: 'dmitriy-donskoy'
      },
      {
         _id: 'dobrynya-nikitich',
         IMO: 8942905,
         vclass: 'General Cargo',
         deadweight: '5180 MT',
         foto: 'dobrynya-nikitich.jpg',
         pdf: 'dobrynya-nikitich'
      },
      {
         _id: 'ilya-muromets',
         IMO: 8866333,
         vclass: 'General Cargo',
         deadweight: '5176 MT',
         foto: 'ilya-muromets.jpg',
         pdf: 'ilya-muromets'
      },
      {
         _id: 'muse',
         IMO: 8101434,
         vclass: 'General Cargo',
         deadweight: '3811 MT',
         foto: 'muse.jpg',
         pdf: 'muse'
      },
      {
         _id: 'volgo-balt-242',
         IMO: 8230560,
         vclass: 'General Cargo',
         deadweight: '4206 MT',
         foto: 'volgo-balt-242.jpg',
         pdf: 'volgo-balt-242'
      }
   ]
} as TFleet
