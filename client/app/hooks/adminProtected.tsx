"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { data: userData } = useLoadUserQuery(undefined, {});

  if (userData.data) {
    const isAdmin = userData.data?.role === "admin";
    return isAdmin ? children : redirect("/");
  }
}
