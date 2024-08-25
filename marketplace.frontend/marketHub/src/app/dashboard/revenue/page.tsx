"use client";
import { RevenueCard } from "@/components/revenueComponents/revenueCard";
import { RevenueTable } from "@/components/revenueComponents/revenueTable";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useActiveAccount } from "thirdweb/react";

const RevenuePage = () => {
  // TODO: Add a query to fetch the user's marketplaces and their addresses to fetch the revenue
  const account = useActiveAccount();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<
    {
      market: string;
      creation: string;
      revenue: string;
    }[]
  >([]);

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/createdMarketPlace/${account.address}`)
        .then((res) => res.json())
        .then((data) => {
          const resources = data.data.map((resource: any) => {
            return {
              market: resource.title,
              creation: resource.transactionDate,
              revenue: resource.resource_earning,
            };
          });
          setData(resources);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  return (
    <div className="flex flex-col gap-4">
      <RevenueCard
        publicAssets={data
          .filter((resource: any) => resource.ownership === "Public")
          .reduce((total, resource) => total + Number(resource.revenue), 0)}
        privateAssets={data
          .filter((resource: any) => resource.ownership === "Private")
          .reduce((total, resource) => total + Number(resource.revenue), 0)}
      />
      <RevenueTable data={data} />
    </div>
  );
};

export default RevenuePage;
