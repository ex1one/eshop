import { fromJSON, toJSON } from "flatted"

export const useFormattingData = <T extends object>(object: T) => {
  let newObject = {} as T

  for (let field in object) {
    if (object.hasOwnProperty(field)) {
      let value = toJSON(object[field])
      value = fromJSON(value)

      newObject[field] = fromJSON(value)
    }
  }

  return newObject
}
