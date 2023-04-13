export interface SideBarMenuItem {
  title: string
  link: string
  logo: string
  childs: Omit<SideBarMenuItem, "logo" | "childs">[]
}
