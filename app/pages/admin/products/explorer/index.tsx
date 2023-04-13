import { Suspense } from "react"
import { BlitzPage, Head } from "blitz"

import { DashboardLayout } from "app/core/layouts"
import { Explorer } from "app/core/components/Dashboard/Explorer"

const ExplorerPage: BlitzPage = () => {
  return (
    <Suspense>
      <Explorer />
    </Suspense>
  )
}

ExplorerPage.authenticate = false
ExplorerPage.getLayout = (page) => <DashboardLayout title="Mobile First">{page}</DashboardLayout>

export default ExplorerPage
