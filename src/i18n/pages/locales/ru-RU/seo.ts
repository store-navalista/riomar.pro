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
      siteTitle: 'Риомар',
      pageTitle: 'О Нас',
      description: 'Когда вы познакомтесь с компанией Риомар вы захотите с нами сотрудничать.'
   },
   fleet: {
      siteTitle: 'Риомар',
      pageTitle: 'Флот',
      description:
         'Судоходная компания «Риомар» владеет собственным танкерным флотом и осуществляет перевозки в основном в Каспийском, Азовском, Черном, Мраморном морях и речные перевозки.'
   },
   career: {
      siteTitle: 'Риомар',
      pageTitle: 'Карьера',
      description: 'Постройте свою карьеру с командой специалистов в профессиональной компании.'
   },
   contacts: {
      siteTitle: 'Риомар',
      pageTitle: 'Контакты',
      description: 'Свяжитесь с нами для дальнейшего сотрудничества.'
   },
   main: {
      siteTitle: 'Риомар',
      pageTitle: 'Главная',
      description:
         'Судоходная компания «Риомар» владеет собственным танкерным флотом и осуществляет перевозки в основном в Каспийском, Азовском, Черном, Мраморном морях и речные перевозки. Компания специализируется на перевозке сырой нефти и различных сыпучих грузов.'
   }
} as ISEO
