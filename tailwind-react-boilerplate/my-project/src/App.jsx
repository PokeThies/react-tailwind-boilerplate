import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./layout/Layout";
import AdminLayout from "./layout/Admin/AdminLayout";
import AdminHome from "./pages/Admin/AdminHome";
import "./App.css";


function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <PageNotFound />,
      children: [
        /* ------- Public ------- */
        { path: "/", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
      ],
    },
     {
      element: <AdminLayout />,
      errorElement: <PageNotFound />,
      children: [
        /* ------- Admin ------- */
        { path: "/", element: <AdminHome /> },
      ],
    },
  ]);

  return (
    <>
      <section>
        <RouterProvider router={router} />
      </section>
    </>
  );
}

export default App;
