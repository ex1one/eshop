import { useAtom } from "jotai"
import { Link } from "blitz"
import { searchAtom, selectedCategoryAtom } from "app/core/atoms"

export const Logo = () => {
  const [, setSelectedCategory] = useAtom(selectedCategoryAtom)
  const [, setSearch] = useAtom(searchAtom)

  const handleClick = () => {
    setSelectedCategory(undefined)
    setSearch(undefined)
  }

  return (
    <Link passHref href="/">
      <a className="cursor-pointer text-[18px] font-medium md:text-[22px]" onClick={handleClick}>
        eShop
      </a>
    </Link>
  )
}
