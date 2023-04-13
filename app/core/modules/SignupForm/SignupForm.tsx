import { useAtom } from "jotai"
import { Link, Routes, useMutation } from "blitz"

import { LabeledTextField } from "app/core/components/LabeledTextField/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form/Form"
import { Signup } from "app/auth/validations"
import { authModalAtom } from "app/core/atoms/authModal"

import signup from "app/auth/mutations/signup"

interface SignupFormProps {
  onSuccess?: () => void
  changeForm?: () => void
}

export const SignupForm = ({ changeForm, onSuccess }: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [, setOpenAuthPopup] = useAtom(authModalAtom)

  return (
    <>
      <div className="mb-8 flex justify-center">
        <p className="text-3xl">ⓔⓢⓗⓞⓟ</p>
      </div>
      <Form
        submitText="Sign Up"
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            onSuccess?.()
            setOpenAuthPopup(false)
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField
          outerProps={{ className: "relative w-full mb-5" }}
          labelProps={{ className: "flex flex-col items-start gap-3" }}
          className="h-10 w-full rounded-[4px] border p-3 hover:border-black/40 hover:outline-none focus:border-black/40 focus:outline-none"
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
          Login up
        </div>
      </div>
    </>
  )
}
