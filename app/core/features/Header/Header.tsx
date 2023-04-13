import { Suspense } from "react"

import { Container, Logo, Menu, SearchBar } from "./components"

export const Header = () => {
  return (
    <>
      <Container>
        <Logo />
        <SearchBar />
        <Suspense>
          <Menu />
        </Suspense>
      </Container>
    </>
  )
}
