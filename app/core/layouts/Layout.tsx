import { useAtom } from "jotai"
import { Head, BlitzLayout } from "blitz"
import { AuthModal } from "app/core/components"
import { authModalAtom } from "app/core/atoms/authModal"
import { Header } from "app/core/features"

export const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useAtom(authModalAtom)

  const onClose = () => setIsOpen(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto h-full max-w-screen-xl px-4 xl:px-0">
        {children}

        <AuthModal onClose={onClose} isOpen={isOpen} />
      </main>
    </>
  )
}
