import { ParsedUrlQuery } from "querystring"
import { omit } from "./omit"

interface RemoveQueryParamProps {
  query: ParsedUrlQuery
  params: string[] | string
}

export const removeQueryParams = ({ params, query }: RemoveQueryParamProps) => {
  let updatedQuery = query

  updatedQuery = omit({ obj: query, props: params })

  return updatedQuery
}
