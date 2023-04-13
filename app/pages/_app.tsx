// import "@fontsource/montserrat"
import { useEffect } from "react"
import {
  AppProps,
  ErrorBoundary,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
  useSession,
  useRouter,
} from "blitz"
import { ThemeProvider, ErrorComponent } from "app/core/components"
import "app/core/styles/index.css"

import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { domAnimation, LazyMotion } from "framer-motion"
import Sentry from "integrations/sentry"

export default function App({ Component, pageProps, err }: AppProps & { err: any }) {
  const session = useSession({ suspense: false })
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  useEffect(() => {
    if (session.userId) Sentry.setUser({ id: session.userId.toString() })
  }, [session])

  return (
    <LazyMotion features={domAnimation} strict>
      <ErrorBoundary
        onError={(error, componentStack) => {
          Sentry.captureException(error, { contexts: { react: { componentStack } } })
        }}
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={useQueryErrorResetBoundary().reset}
      >
        <ThemeProvider>
          <ToastContainer theme="dark" transition={Zoom} position="bottom-right" limit={4} />
          {getLayout(<Component {...pageProps} err={err} />)}
        </ThemeProvider>
      </ErrorBoundary>
    </LazyMotion>
  )
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
