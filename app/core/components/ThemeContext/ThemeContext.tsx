import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

interface Theme {
  theme: string | null
  setTheme: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<Theme>({} as Theme)
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const rawSetTheme = (rawTheme) => {
    const root = typeof window !== "undefined" ? window.document.documentElement : null
    const isDark = rawTheme === "dark"

    if (!root) return

    root.classList.remove(isDark ? "light" : "dark")
    root.classList.add(rawTheme)

    localStorage.setItem("color-theme", rawTheme)
  }

  useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

function getInitialTheme() {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage.getItem("color-theme")

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }
  }

  return "light"
}
