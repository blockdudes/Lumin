"use client";
import { PurchasedCard } from "@/components/dashboardComponents/purchasedCard";
import { PurchasedTable } from "@/components/dashboardComponents/purchasedTable";
import React from "react";

const CreatorDashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <PurchasedCard />
        <PurchasedTable />
      </div>
    </>
  );
};

export default CreatorDashboard;
