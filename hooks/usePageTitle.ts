import { useEffect } from 'react'
import { useLang } from './useLang'

export const usePageTitle = (page: string, additionalText = '') => {
  const { lang, translations } = useLang()

  useEffect(() => {
    document.title = `${lang === 'ru' ? 'Систел' : 'Systel'} | ${
      (translations[lang].breadcrumbs as { [index: string]: string })[page]
    }${additionalText ? ` - ${additionalText}` : ''}`
  }, [additionalText, lang, page, translations])
}
