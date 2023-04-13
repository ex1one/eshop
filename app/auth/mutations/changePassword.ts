import { NotFoundError, SecurePassword, resolver, AuthenticationError } from "blitz"
import db from "db"
import { authenticateUser } from "./login"
import { ChangePassword } from "../validations"

function a() {
  return 1
}
function b(ids: number) {
  return ids * ids
}
function c(ids: number) {
  return ids * ids
}
async function goTest() {
  try {
    let ids = a()
    let res = b(ids)
    let res2 = c(res)
  } catch {}
}
export default resolver.pipe(
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    try {
      await authenticateUser(user.email, currentPassword)
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new Error("Invalid Password")
      }
      throw error
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    return true
  }
)
