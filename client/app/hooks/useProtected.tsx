import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader";
import { redirect } from "next/navigation";
import useUserAuth from "./userAuth";

interface ProtectedProps {
  children: React.ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const isAuthenticated = useUserAuth();

  useEffect(() => {
    if (isAuthenticated === false) {
      toast.error("User logged out!");
      redirect("/");
    }
  }, [isAuthenticated]);

 
  if (isAuthenticated === null) {
    return <Loader />;
  }

  return <>{isAuthenticated && children}</>;
};

export default Protected;
