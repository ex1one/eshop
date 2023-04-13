import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const getPropCore = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(getPropCore), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const prop = await db.propCore.findFirst({
    where: { id },
  })

  if (!prop) throw new NotFoundError()

  return prop
})
