import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { UserState } from "@/commons/types.interface";
import { Box } from "@mui/material";

const Layout = ({ children }: any) => {

  return (
    <>
      <Navbar />
      {children}
      <Box
        sx={{
          alignSelf: "flex-end",
        }}>
      <Footer />
      </Box>
    </>
  );
};

export default Layout;
