import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const Layout = ({ children }: any) => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
