import { useRouter, BlitzPage } from "blitz"
import { Layout } from "app/core/layouts"
import { SignupForm } from "app/core/modules"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="h-full w-full">
      <div className="flex max-w-[400px] flex-col items-center justify-center">
        <SignupForm onSuccess={() => router.push("/")} />
      </div>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
