import { useState } from "react"
import { SideBarMenuItem } from "./components"

import { mockMenu } from "./mocks"

interface SideBarMenuProps {
  isMiniSideBar: boolean
}

export const SideBarMenu = ({ isMiniSideBar }: SideBarMenuProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | undefined>(undefined)

  const onSelectedMenuItem = (title: string) => {
    setSelectedMenuItem((prev) => (prev === title ? undefined : title))
  }

  return (
    <ul className="h-full w-full">
      {mockMenu.map((item) => (
        <SideBarMenuItem
          onSelectedMenuItem={onSelectedMenuItem}
          selectedMenuItem={selectedMenuItem}
          isMiniSideBar={isMiniSideBar}
          key={item.title}
          {...item}
        />
      ))}
    </ul>
  )
}
