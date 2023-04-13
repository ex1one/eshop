import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const getTag = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(getTag), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tag = await db.tag.findFirst({
    where: { id },
  })

  if (!tag) throw new NotFoundError()

  return tag
})
