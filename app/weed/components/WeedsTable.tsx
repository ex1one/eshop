import { wd_Offer } from "@prisma/client"
import { useMemo } from "react"
import { ProColDef, ProTable } from "../unsorted/ProTable/ProTable"

export const WeedsTable = ({ data }: { data: wd_Offer[] }) => {
  return <ProTable data={data} columns={useColumns()} />
}

type TExtraProps = {
  isManyUsers?: boolean
}
function useColumns({ isManyUsers }: TExtraProps = {}) {
  let cols = useMemo(() => {
    // prettier-ignore
    let cols: ProColDef<wd_Offer>[] = [
      {title:"asd", dataAt: e => e.name},
      {
        title: "#",
        dataAt: (b) => b.cbd,
        width: "60px",
        classes: { cell: "", bodyCell: "text-right" },
      },
      {
        title: "Symbol",
        width: "110px",
        dataAt: (b) => b.cbd,
      },
      {
        title: "Name",
        width: "110px",
        dataAt: (b) => b.name,
      },
      // {
      //   title: "Type",
      //   width: "60px",
      //   dataAt: (b) => <span className={b.type != "short" ? "text-green-700" : "text-red-700"}>{b.type}</span>,
      // }], []}
    ]
    return cols
  }, [])

  return cols
}
