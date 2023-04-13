import styled from "@emotion/styled"
import { useRouter, useRouterQuery } from "blitz"
import clsx from "clsx"
import _ from "lodash"
import { MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { EditableCell2 } from "../DataTable/EditableCell2"

export type ProColDef<T> = {
  title: string
  dataAt: (e: T) => ReactNode
  sortAt?: (e: T) => number | string | any
  width?: string
  editable?: boolean
  onChange?: (e: string, row: T) => void
  classes?: {
    cell?: string
    headerCell?: string
    bodyCell?: string
  }
}

type TProTableProps<T> = {
  data: T[]
  columns: ProColDef<T>[]
  classes?: {
    headerCell?: string
    headerRow?: string
    bodyCell?: string
    bodyRow?: string
  }
  headers?: "no" | "only"
  onRowClick?: (e: T) => void
  onColumnClick?: (e: ProColDef<T>) => void
}

// prettier-ignore
export const ProTable = <T extends unknown>({ data, columns: colsOrig, classes, headers, onRowClick, onColumnClick }: TProTableProps<T>) => {

  let [columns, filterCols] = useAdjustColumns(colsOrig)
  let colsCss = columns.map(c => c.width).map(e => e || '1fr').join(' ')

  let curSelection = 0


  let [sortedData, setSortCol, sortCol] = useSort(columns, data)
  let selectCols = useSelectColumns(columns)

  function sign(col: ProColDef<T>) {
    let sortSign = ''
    if (sortCol) {
      if (col.title.includes(sortCol))
        sortSign = '↓'
        else if (sortCol.includes(col.title))
        sortSign = '↑'
    }
    return sortSign
  }

  let router = useRouter()
  const onToggleCol = (col: ProColDef<any>) => {
    let q = router.query
    q.cols = (q.cols as string)!.toLowerCase().replace(col.title.toLowerCase(), '', )
    router.push({
      query: q
    })
  }


  return (
    <>

      <div className="pro-table">
        {/* HEADERS */}
        {headers != "no" && (
          <>
            {!!filterCols.length &&
              <div className="flex space-x-2 m-3">
                {filterCols.map(col => <div key={col.title} onClick={() => onToggleCol(col)} className="border border-gray-600 px-2 py-0 text-sm bg-gray-200">{col.title}</div>)}
              </div> }
            <Grid templateCols={colsCss} className={clsx(classes?.headerRow)}>
              {columns.map((col, i) => (
                <div key={col.title+i} className={clsx(col.classes?.cell, col.classes?.headerCell, classes?.headerCell, "border-t border-r border-black border-b overflow-hidden shrink")}
                onClick={(e) => { onColumnClick?.(col); setSortCol(col, e); selectCols.onColClick(col, e)}}
                >
                  {col.title}{sign(col)}
                </div>
              ))}
            </Grid>
          </>
        )}
        {/* BODY */}
        {headers != "only" && (
          <div>
            {sortedData.map((row, i) => {
              return (
                <Grid
                  key={i} templateCols={colsCss}
                  className={clsx("items-stretch",
                    classes?.bodyRow)}
                  >
                  { columns.map((col, j) =>
                      <Cell key={col.title+j} {...{col, classes, onRowClick, row}}/>)
                  }
                </Grid>
            )})}
          </div>)}
      </div>
    </>
  )
}

export function useAdjustColumns(cols: ProColDef<any>[]) {
  let router = useRouterQuery()

  let colsQuery = (router.cols as string) || ""

  let [adjustedCols, filters] = useMemo((): [ProColDef<any>[], ProColDef<any>[]] => {
    if (!colsQuery) return [cols, []]
    let mode: "selected" | "except" = "selected"

    if (colsQuery[0] == "!") {
      mode = "except"
      colsQuery = colsQuery.substring(1)
    }

    let colTitles = colsQuery.split("-").filter((e) => e.length)
    let found = colTitles
      .map((title) => getColumnSmart(cols, title))
      .filter((e) => e)
      .map((e) => e!)

    if (mode == "selected") return [found, found]
    return [cols.filter((col) => !found.find((fCol) => fCol == col)), found]
  }, [cols, colsQuery])

  return [adjustedCols, filters] as const
}

export function eqi(text: string, other: string) {
  return text.localeCompare(other, undefined, { sensitivity: "base" }) === 0
}

function getColumnSmart(cols: ProColDef<any>[], title: string) {
  let colExact = cols.find((c) => eqi(c.title, title))
  if (!colExact) colExact = cols.find((c) => eqi(c.title.slice(0, title.length), title))

  return colExact
}

type TClassesData = {
  headerCell?: string | undefined
  headerRow?: string | undefined
  bodyCell?: string | undefined
  bodyRow?: string | undefined
}
type TCellProps<T> = {
  col: ProColDef<T>
  classes?: TClassesData
  onRowClick: ((e: T) => void) | undefined
  row: T
}
const Cell = <T extends unknown>({ classes, onRowClick, col, row }: TCellProps<T>) => {
  let cls = clsx(
    col.classes?.cell,
    col.classes?.bodyCell,
    classes?.bodyCell,
    "border-gray-500 border-r border-b overflow-hidden text-ellipsis shrink"
  )
  const onCellClick = (col: ProColDef<T>, row) => {
    if (!col.editable) {
      onRowClick?.(row)
      // refsId && $curBotSS.valueChanged(+refsId(row))
    }
  }

  return (
    <div className={cls} onClick={() => onCellClick(col, row)}>
      {col.editable ? (
        <EditableCell2
          initialValue={(col.dataAt(row) as string) || ""}
          column={col}
          row={row}
          onChange={(val) => col.onChange!(val, row)}
        />
      ) : (
        col.dataAt(row)
      )}
    </div>
  )
}

function useSelectColumns<T extends unknown>(columns: ProColDef<T>[]) {
  let router = useRouterQuery()
  let r = useRouter()

  let [sortCol, setSortCol2] = useState("")

  const onColClick = useCallback(
    (col: ProColDef<T>, ev: MouseEvent<HTMLDivElement, any>) => {
      let q = r.query
      if (ev.altKey) {
        if (!q.cols) q.cols = `!${col.title}`
        else q.cols += `-${col.title}`
        // r.push({
        //   query: "cols=sym",
        // })
        console.log(q)
        r.push({
          query: q,
        })
      }
    },
    [setSortCol2]
  )

  return { onColClick }
}

function useSort<T extends unknown>(columns: ProColDef<T>[], data: T[]) {
  let [sortCol, setSortCol2] = useState("")

  const setSortCol = useCallback(
    (newCol: ProColDef<T>, ev: MouseEvent<HTMLDivElement, any>) => {
      if (!ev.altKey)
        setSortCol2((prevSort) => {
          let negation = false
          if (prevSort[0] == "!") {
            prevSort = prevSort.slice(1)
            negation = true
          }
          if (newCol.title == prevSort) {
            return negation ? "" : `!${prevSort}`
          } else {
            return newCol.title
          }
        })
    },
    [setSortCol2]
  )

  let sortedData = useMemo(() => {
    // if (data.length) debugger
    let findName = sortCol[0] == "!" ? sortCol.slice(1) : sortCol
    let reverse = sortCol[0] == "!" ? true : false
    let col = columns.find((c) => eqi(c.title, findName))
    if (!col || (!col.dataAt && !col.sortAt)) return data
    let r = _.sortBy(data, (e) => {
      let sortV = col?.sortAt ? col.sortAt(e) : col!.dataAt(e)
      return reverse ? -sortV : sortV
    })
    return r
  }, [data, sortCol, columns])

  return [sortedData, setSortCol, sortCol] as const
}

type GridColsProps = {
  templateCols: string
}
export const Grid = styled.div(({ templateCols }: GridColsProps) => ({
  gridTemplateColumns: templateCols,
  display: "grid",
  // gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
}))
