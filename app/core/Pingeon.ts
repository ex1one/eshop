import axios from "axios"
import db from "db"

class Pingeon {
  constructor(private token: string) {}

  async send(message: string) {
    return new Promise<{ ok: boolean; error?: string }>(async (res, rej) => {
      try {
        // await axios.post("http://asd.ru/api/ping/", {
        await axios.post("http://pingeon.zerouptime.ru/api/coo", {
          token: this.token,
          message,
        })
        res({ ok: true })
      } catch (e) {
        // SENTRY ALLERT
        console.log("🔴🔴🔴 fck this. add sentry", e?.toString())
        res({ ok: false, error: `${e}` })
      }
    })
  }

  static async me(msg: string) {
    let token = "6786b20b-5324-4602-9b58-ca95c68c0b29"
    let png = new Pingeon(token)
    png.send(msg)
  }
}

export default Pingeon
