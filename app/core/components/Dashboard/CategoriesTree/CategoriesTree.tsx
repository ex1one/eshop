import { useQuery } from "blitz"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import { Icon } from "app/core/UI"
import { createTree } from "app/core/utils"
import { TTreeItem } from "app/core/components"

import getCategories from "app/categories/queries/getCategories"

import { selectedCategoriesAtom, treeAtom } from "app/core/atoms"
import { NO_REFETCH } from "app/core/mocks"

import clsx from "clsx"

const TreeItem = ({ treeItem, isChild }) => {
  const [isOpenChilds, setIsOpenChilds] = useState(!treeItem.item.parentId)
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom)

  const handleOpenChildsClick = () => setIsOpenChilds((prev) => !prev)
  const handleSelectCategory = () =>
    setSelectedCategories((prev) => {
      const existingCategory = prev.find((c) => c.item.id === treeItem.item.id)

      if (existingCategory) return prev.filter((item) => item.item.id !== treeItem.item.id)

      return [...prev, treeItem]
    })

  return (
    <div className={clsx(isChild && "ml-6", "w-full")}>
      <div className="relative flex cursor-pointer items-center gap-1 hover:text-black/60">
        <input
          type="checkbox"
          onChange={handleSelectCategory}
          checked={!!selectedCategories.find((c) => c.item.id == treeItem.item.id)}
        />
        {!!treeItem.childs.length && (
          <Icon
            onClick={handleOpenChildsClick}
            name={isOpenChilds ? "arrow-down-fill" : "arrow-right-fill"}
            className="h-3 w-3"
          />
        )}
        <span onClick={handleSelectCategory} className={clsx("break-keep flex-1")}>
          {treeItem.item.name}
        </span>
      </div>

      {isOpenChilds &&
        treeItem.childs.map((child) => (
          <TreeItem isChild={true} treeItem={child} key={child.item.id} />
        ))}
    </div>
  )
}

export const CategoriesTree = () => {
  const [{ categories }] = useQuery(getCategories, {}, NO_REFETCH)
  const [selectedCategories] = useAtom(selectedCategoriesAtom)
  const [tree, setTree] = useAtom(treeAtom)

  useEffect(() => {
    setTree(createTree({ categories }))
  }, [categories])

  return (
    <div className="w-full rounded-2xl bg-white px-5 py-4">
      {tree
        .filter((item) => !item.item.parentId)
        .map((item) => (
          <TreeItem isChild={false} key={item.item.id} treeItem={item} />
        ))}
    </div>
  )
}
