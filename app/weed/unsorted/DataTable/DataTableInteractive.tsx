import { useEffect, useMemo, useState } from "react"
import { Column } from "react-table"

import { TableEditable } from "./dataTableUtils"

export type TUpdateMyData = (rowIndex: number, columnId: string, value: any) => void

export type TDataTableColumn<TObject extends object> = {
  // id: string // let path be id despite duplicates possible
  path: keyof TObject
  editable: boolean
  type?: "text" | "datetime"
  select?: () => Promise<{ id: any; name: string }[]>
  defaultText?: (e: TObject) => string
  defaultValue?: (e: TObject) => number | null
  format?: (e: TObject) => any
  onCellClick?: (e: TObject) => void
}
type TDataTableInteractiveProps<T extends object> = {
  data: readonly T[]
  columns: TDataTableColumn<T>[]
  onDataUpdate?: (el: T, columnId: string, value: any) => void
  onAddNew?: () => Promise<void>
}
export const DataTableInteractive = <T extends object>(props: TDataTableInteractiveProps<T>) => {
  const { columns, data: inputData, onDataUpdate, onAddNew } = props

  let [data, setData] = useState(inputData)

  let cols = useCols<T>(columns)

  const updateMyData = (rowIndex, columnId, value) => {
    let el = data[rowIndex]!
    onDataUpdate && onDataUpdate(el, columnId, value)
  }

  useEffect(() => {
    setData(inputData)
  }, [inputData])

  return (
    <div>
      {!!onAddNew && (
        <div>
          <button className="btn" onClick={onAddNew}>
            Add
          </button>
        </div>
      )}

      <TableEditable columns={cols} data={data} updateMyData={updateMyData} />
    </div>
  )
}

function useCols<T extends object>(columns: TDataTableColumn<T>[]) {
  const accessor = (e: T, col: TDataTableColumn<T>) => {
    if (col.path == "updatedAt") debugger
    let text = e[col.path as any]
    if (col.format) text = col.format(text)
    if (!col.onCellClick) return text
    return (e) => (
      <button className="btn" onClick={() => col.onCellClick!(e)}>
        Texts
      </button>
    )
  }
  return useMemo(
    () =>
      columns.map(
        (col) =>
          ({
            // id: col.path,
            Header: col.path,
            accessor: col.format ? (e) => col.format!(e[col.path as any]) : col.path,
            // accessor: (e) => <button className="btn">asd</button>,
            dtColumn: col,
          } as Column<T>)
      ),
    [columns]
  )
}
