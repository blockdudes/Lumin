"use client";
import { useAppSelector } from "@/lib/hooks";
import { Spinner } from "@material-tailwind/react";
import React from "react";

const AppLoader = () => {
  const isAppLoading = useAppSelector((state) => state.appLoader.isAppLoading);

  if (!isAppLoading) return null;

  return (
    <div
      className="fixed flex justify-center items-center h-screen w-screen backdrop-blur-md bg-gray-900/20"
      style={{ zIndex: 99999 }}
    >
      <Spinner
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
    </div>
  );
};

export default AppLoader;
