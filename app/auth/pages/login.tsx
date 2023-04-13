import { useRouter, BlitzPage } from "blitz"
import { Layout } from "app/core/layouts"
import { LoginForm } from "app/core/modules"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-[400] p-4 shadow">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            router.push(next)
          }}
        />
      </div>
    </div>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
