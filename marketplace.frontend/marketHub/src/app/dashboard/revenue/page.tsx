"use client";
import { RevenueCard } from "@/components/revenueComponents/revenueCard";
import { RevenueTable } from "@/components/revenueComponents/revenueTable";
import React from "react";

const RevenuePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <RevenueCard />
        <RevenueTable />
    </div>
  );
};

export default RevenuePage;
