import { resolver } from "blitz"
import _ from "lodash"
import _io from "socket.io"

export default resolver.pipe(async (_, ctx) => {
  const io = (ctx.session as any)?._req?.skt as _io.Server | undefined

  setTimeout(() => {
    io?.emit("testEvent", { yo: 1 })
  }, 3000)
  return 2
})
