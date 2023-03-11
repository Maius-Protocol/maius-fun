import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { logEvent as firebaseLogEvent } from 'firebase/analytics'

import '../styles/globals.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { analytics } from '../utils/firebase'

export default function App({ Component, pageProps }: AppProps) {
  const routers = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const logEvent = (url: string) => {
        firebaseLogEvent(analytics!, 'page_view', { page_path: url })
      }

      routers.events.on('routeChangeComplete', logEvent)
      logEvent(window.location.pathname)

      return () => {
        routers.events.off('routeChangeComplete', logEvent)
      }
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
