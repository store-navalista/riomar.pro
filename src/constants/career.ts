export interface ITabsProps {
   _id: 'vac-ship' | 'vac-coast' | 'vac-resume'
}

type Vessels = 'volgoneft-630' | 'volgoneft-111'

export type Vacancy =
   | 'master'
   | 'chief-officer'
   | 'second-officer'
   | 'third-officer'
   | 'boatswain'
   | 'cadet'
   | 'chief-engineer'
   | 'second-engineer'
   | 'third-engineer'
   | 'fourth-engineer'
   | 'el-officer'
   | 'pumpman'
   | 'motorman'
   | 'able-seaman'
   | 'ordinary-seaman'
   | 'cook'
   | 'radio-officer'

export type IJob = { [key in Vessels]?: Vacancy[] }

export const TabsProps: ITabsProps[] = [{ _id: 'vac-ship' }, { _id: 'vac-coast' }, { _id: 'vac-resume' }]

export const Jobs: IJob[] = [
   {
      'volgoneft-630': [
         'master',
         'chief-officer',
         'second-officer',
         'chief-engineer',
         'second-engineer',
         'third-engineer',
         'el-officer',
         'pumpman',
         'motorman',
         'able-seaman',
         'ordinary-seaman',
         'cook'
      ]
   }
]
