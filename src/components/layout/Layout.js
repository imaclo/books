import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="container mx-auto mt-5">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
