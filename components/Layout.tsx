import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";

const Layout = ({ children }: any) => {

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
