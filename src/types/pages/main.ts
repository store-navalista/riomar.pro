export interface IMainBlock {
   title: string
   description: string
   href?: string
}

export interface IMainProps {
   [locale: string]: {
      title: string
      services: IMainBlock[]
   }
}
