import React, { ReactNode } from "react"
import Header from "./header"
import { rhythm } from "../utils/typography"
import "./layout.css"

type LayoutProps = {
  location?: Location
  title: string
  children: ReactNode
}

const Layout = ( { location, title, children }: LayoutProps) => {
  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <Header location={location} siteTitle={title} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
