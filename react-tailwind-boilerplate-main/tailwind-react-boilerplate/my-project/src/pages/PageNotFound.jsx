import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-blue-200 text-center">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="text-xl mt-4 text-black">
        Oops! Looks like you took a wrong turn. 🚧
      </p>
      <p className="text-lg mt-2 text-black">
        Don't worry, it happens to the best of us.
      </p>
      <NavLink
        to={"/"}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Take Me Home
      </NavLink>
    </section>
  );
};

export default PageNotFound;
