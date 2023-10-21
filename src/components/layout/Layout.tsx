import { ReactNode } from 'react'
import Nav from './navbar/Nav'
import Header from './header/Header'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <main>
        <Nav />
        <Header />
        {children}
    </main>
  )
}

export default Layout