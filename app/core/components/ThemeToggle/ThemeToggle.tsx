import { useContext } from "react"
import { ThemeContext } from "app/core/components"
import { Icon } from "app/core/UI"

export const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const onClick = () => setTheme(theme === "dark" ? "light" : "dark")

  return (
    <div className="rounded-full transition duration-500 ease-in-out">
      {theme === "dark" ? (
        <Icon
          onClick={onClick}
          className="h-[25px] w-[25px] cursor-pointer transition duration-300 hover:text-black/60"
          name="sun-fill"
        />
      ) : (
        <Icon
          onClick={onClick}
          className="h-[25px] w-[25px] cursor-pointer transition duration-300 hover:text-black/60"
          name="sun"
        />
      )}
    </div>
  )
}
