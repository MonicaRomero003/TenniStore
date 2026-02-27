import { Outlet } from 'react-router-dom'
import MenuSuperior from './MenuSuperior.jsx'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <MenuSuperior />
      <main className="layout-body">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
