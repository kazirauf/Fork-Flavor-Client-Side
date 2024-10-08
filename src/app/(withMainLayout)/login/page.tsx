import React from "react";
import { Metadata } from "next";

import MainContentsOfLogin from "./MainContents";

export const metadata: Metadata = {
  title: "CookNest || Login",
  description: "Login to manage recipes!",
};

const LoginPage = () => {
  return (
    <div>
      <MainContentsOfLogin />
    </div>
  );
};

export default LoginPage;
