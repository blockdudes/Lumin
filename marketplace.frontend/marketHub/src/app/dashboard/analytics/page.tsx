"use client";
import SalesChart from "@/components/analyticsComponents/salesChart";
import React from "react";

const AnalyticsPage = () => {
  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-4 text-3xl font-bold ">Analytics</div>
      <div className="w-500">
        <SalesChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;
