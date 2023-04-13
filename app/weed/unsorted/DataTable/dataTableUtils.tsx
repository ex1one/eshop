import { useTable } from "react-table"
import { EditableCell } from "./EditableCell"

// // Set our editable cell renderer as the default Cell renderer
// const defaultColumn = {
//   Cell: EditableCell,
// } as { Cell: any }

export function isValidDate(d) {
  return d instanceof Date && !isNaN(d as any)
}

export function TableEditable({ columns, data, updateMyData }) {
  const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        Cell: EditableCell,
      },
      updateMyData,
    } as any
    // usePagination
  )

  // Render the UI for your table
  // TODO: FIX KEYS
  // console.log("Fix new taables keys")
  return (
    <>
      <table className="table-edt" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            let { key, ...otherProps } = headerGroup.getHeaderGroupProps()
            return (
              <tr key={key} {...otherProps}>
                {headerGroup.headers.map((column) => {
                  let { key, ...otherProps } = column.getHeaderProps()
                  return (
                    <th key={key} {...otherProps}>
                      {column.render("Header")}
                    </th>
                  )
                })}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            let { key, ...otherProps } = row.getRowProps()
            return (
              <tr key={key} {...otherProps}>
                {row.cells.map((cell) => {
                  let { key, ...otherProps } = cell.getCellProps()
                  return (
                    <td className="pl-3" key={key} {...otherProps}>
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
