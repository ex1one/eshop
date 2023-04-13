import { Category } from "@prisma/client"
import { SearchTreeItem } from "./components"

interface SearchTreeProps {
  searchTree: { category: Category; successors: Category[] }[]
}

export const SearchTree = ({ searchTree }: SearchTreeProps) => {
  return (
    <ul className="text-lg">
      {searchTree.map((item) => (
        <SearchTreeItem key={item.category.id} item={item} />
      ))}
    </ul>
  )
}
