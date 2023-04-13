import { ReactNode } from "react"

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <header className="container sticky top-0 left-0 z-10 mx-auto max-w-screen-xl bg-white px-4 py-[11px] xl:px-0">
      <div className="align-center relative flex w-full flex-row items-center justify-between">
        {children}
      </div>
    </header>
  )
}
