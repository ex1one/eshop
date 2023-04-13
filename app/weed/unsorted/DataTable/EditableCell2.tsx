import { Listbox, Transition } from "@headlessui/react"
import moment from "moment"
import { useEffect, useMemo, useRef, useState } from "react"
import { ProColDef } from "../ProTable/ProTable"
import { TDataTableColumn, TUpdateMyData } from "./DataTableInteractive"
import { isValidDate } from "./dataTableUtils"

// Create an editable cell renderer
type TECProps<T> = {
  initialValue?: string
  row: any
  column: ProColDef<T>
  onChange: (val: string, row: T) => void
}
export function EditableCell2<T>({
  initialValue,
  row,
  column,
  onChange, // This is a custom function that we supplied to our table instance
}: TECProps<T>) {
  const [orig, setOrig] = useState(initialValue)

  const [value, setValue] = useState(orig)

  const onChangeLocal = (e) => {
    setValue(e.target.value)
  }

  const onBlur = () => {
    if (value != orig) {
      setOrig(value)
      onChange(value || "", row)
    }
  }

  useEffect(() => {
    setValue(initialValue)
    setOrig(initialValue)
  }, [initialValue])

  return (
    <input
      value={value}
      onChange={onChangeLocal}
      onBlur={onBlur}
      style={{ backgroundColor: "transparent" }}
    />
  )
}

export interface TItem {
  id: number
  name: string
}

const Select = ({
  initialValue,
  row,
  column,
  updateMyData, // This is a custom function that we supplied to our table instance
  defaultText,
  defaultValue,
}) => {
  const { id } = column
  const dtCol: TDataTableColumn<any> | undefined = column.dtColumn || undefined

  let [data, setData] = useState([] as TItem[])

  let [text, setText] = useState(defaultText)
  let [value, setValue] = useState(defaultValue)

  let loaded = useRef(false)
  const loadItemsOnFirstClick = () => {
    if (!loaded.current) {
      loaded.current = true
      const selectF = dtCol?.select
      isFunction(selectF) && selectF!().then((r) => setData(r))
    }
  }

  const onChange = (newValue: number) => {
    let el = data.find((e) => e.id == newValue)
    setText(el?.name || "-")
    setValue(el?.id || null)

    let updateData = updateMyData as TUpdateMyData
    updateData && updateData(row.index, column.id, newValue)
  }

  return (
    <Listbox as="div" className="space-y-1 min-w-cell-2" value={value} onChange={onChange}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
            Assigned to
          </Listbox.Label> */}
          <div className="relative">
            <span className="inline-block w-full rounded-md shadow-sm">
              <Listbox.Button
                className="cursor-pointer relative w-full rounded-md1 border1 border-gray-300 bg-white pl-31 pr-10 py-21 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={loadItemsOnFirstClick}
              >
                <span className="block truncate">{text || "-"} </span>
                {/* <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  {SelectSVG}
                </span> */}
              </Listbox.Button>
            </span>

            {/* OPTIONS */}
            {/* prettier-ignore */}
            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" className="z-10 absolute mt-1 w-full rounded-md bg-white shadow-lg">
              <Listbox.Options static className="border max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5 ">
                {data.map((item) =>
                  // prettier-ignore
                  <Listbox.Option key={item.id} value={item.id}>
                        {({ selected, active }) => (
                          <div className={`${active ? "text-white bg-blue-600" : "text-gray-900"} cursor-default select-none relative py-2 pl-8 pr-4`} >
                            <span className={`${selected ? "font-semibold" : "font-normal"} block truncate`}>
                              {item.name + ` (${item.id})` }
                            </span>
                            {selected && (
                              <span className={`${ active ? "text-white" : "text-blue-600" } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                                {ActiveSVG}
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

const ActiveSVG = (
  <svg
    className="h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
)

const SelectSVG = (
  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
    <path
      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
}

const EditableCellInput = ({
  value: initialValue,
  row,
  column,
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // console.log("iddd", row, column)
  // debugger
  const { index } = row
  const { id } = column
  const dtCol: TDataTableColumn<any> | undefined = column.dtColumn || undefined

  if (dtCol?.select) {
    throw "Not expected"
  }
  // if (dtCol?.path == "balanceChange") debugger

  const formatted = useMemo(() => {
    if (initialValue instanceof Date) return moment(initialValue).format("YYYY-MM-DD HH:mm")
    return initialValue
  }, [initialValue])
  const [value, setValue] = useState(formatted)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    let val = value
    if (dtCol?.type == "datetime") {
      let date = new Date(value)
      if (isValidDate(date)) {
        val = date
      } else return
    }
    console.log("updating", index, id, value)
    updateMyData(index, id, val)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(formatted)
  }, [initialValue])

  return (
    <input value={value} onChange={onChange} onBlur={onBlur} readOnly={dtCol?.editable === false} />
  )
}
