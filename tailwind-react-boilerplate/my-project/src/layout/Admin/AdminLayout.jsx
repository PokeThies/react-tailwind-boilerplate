import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import AdminFooter from "./AdminFooter"

const AdminLayout = () => {
  return (
    <>
      <AdminHeader/>

      <main>
        <Outlet/>
      </main>

      <AdminFooter/>
    </>
  )
}

export default AdminLayout