interface OmitProps {
  key: string
  props: string[] | string
  obj: object
}

export const inProps = ({ key, props }: Omit<OmitProps, "obj">) => {
  return typeof props === "string" ? key === props : props.some((omitKey) => omitKey === key)
}

export const omit = ({ obj, props }: Omit<OmitProps, "key">) => {
  let newObj = {}

  Object.keys(obj).forEach((key) => {
    if (!inProps({ key, props })) {
      newObj[key] = obj[key]
    }
  })

  return newObj
}
