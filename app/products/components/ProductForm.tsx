import { Form, FormProps } from "app/core/components/Form/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
    </Form>
  )
}
