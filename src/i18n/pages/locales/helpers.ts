import translate from '@/i18n/translate'
import { default as DM } from '@/i18n/messages/defaultMessages'

export const dynamicTranslate = (id: string) => translate(id, DM[id].defaultMessage)
