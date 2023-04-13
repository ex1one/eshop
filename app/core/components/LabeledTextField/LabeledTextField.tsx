import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

import clsx from "clsx"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? (errors[name] as any).join(", ")
      : errors[name]?.message || errors[name]

    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <input
            className={clsx(error && "border-red-600", props.className)}
            disabled={isSubmitting}
            {...register(name)}
            {...props}
          />
        </label>
      </div>
    )
  }
)

export default LabeledTextField
