"use client";
import React from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>Dashboard</h1>
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => router.push("/dashboard/revenue")}
        >
          Revenue
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => router.push("/dashboard/analytics")}
        >
          Analytics
        </button>
      </div>
    </>
  );
};

export default DashboardPage;
