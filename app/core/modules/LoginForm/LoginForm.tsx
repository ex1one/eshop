import { useAtom } from "jotai"
import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType } from "blitz"

import { LabeledTextField, FORM_ERROR, Form } from "app/core/components"
import { Login } from "app/auth/validations"
import { authModalAtom } from "app/core/atoms/authModal"

import login from "app/auth/mutations/login"
import { Icon } from "app/core/UI"

interface LoginFormProps {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
  changeForm?: () => void
}

export const LoginForm = ({ changeForm, onSuccess }: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [, setOpenAuthPopup] = useAtom(authModalAtom)

  return (
    <>
      <div className="mb-8 flex justify-center">
        <p className="text-3xl">ⓔⓢⓗⓞⓟ</p>
      </div>
      <Form
        submitText="Login"
        schema={Login}
        className="text-sm"
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            onSuccess?.(user)
            setOpenAuthPopup(false)
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField
          outerProps={{ className: "relative w-full mb-5" }}
          labelProps={{ className: "flex flex-col items-start gap-3" }}
          className="h-10 w-full rounded-[4px] border p-3 hover:border-black/40 hover:outline-none focus:border-black/40 focus:outline-none focus:invalid:border-yellow-500"
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
        />
        <LabeledTextField
          outerProps={{ className: "relative w-full" }}
          labelProps={{ className: "flex flex-col items-start gap-3" }}
          className="mb-5 h-10 w-full rounded-[4px] border p-3 hover:border-black/40 hover:outline-none focus:border-black/40 focus:outline-none"
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>
      <div className="mt-5 flex justify-between text-sm text-gray-600">
        <Link href={Routes.ForgotPasswordPage()}>
          <a>Forgot password?</a>
        </Link>
        <div className="cursor-pointer" onClick={changeForm}>
          Sign up
        </div>
      </div>
      <div className="mt-5 flex justify-center text-sm">
        <p className="text-gray-400">or you can sign with</p>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        <Icon
          name="google"
          className="h-7 w-7 scale-105 cursor-pointer grayscale duration-300 hover:grayscale-0"
        />
        <Icon
          name="github"
          className="h-7 w-7 scale-105 cursor-pointer grayscale duration-300 hover:grayscale-0"
        />
        <Icon
          name="facebook"
          className="h-7 w-7 scale-105 cursor-pointer grayscale duration-300 hover:grayscale-0"
        />
      </div>
    </>
  )
}

export default LoginForm
