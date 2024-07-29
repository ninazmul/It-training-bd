import { redirect } from "next/navigation";
import React from "react";
import UserAuth from "./userAuth";

interface ProtectedProps {
  children: React.ReactNode;
}
const Protected = ({ children }: ProtectedProps) => {
  const isAuthenticated = UserAuth();
  return isAuthenticated ? children : redirect("/");
};

export default Protected;
