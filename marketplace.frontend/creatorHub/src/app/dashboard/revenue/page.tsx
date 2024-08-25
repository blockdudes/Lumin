"use client";
import { RevenueCard } from "@/components/revenueComponents/revenueCard";
import { RevenueTable } from "@/components/revenueComponents/revenueTable";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const RevenuePage = () => {
  const account = useActiveAccount();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<
    {
      course: string;
      creation: string;
      ownership: string;
      revenue: string;
    }[]
  >([]);

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/resources/${account.address}`)
        .then((res) => res.json())
        .then((data) => {
          const resources = data.data.map((resource: any) => {
            return {
              course: resource.title,
              creation: resource.transactionDate,
              ownership: resource.allowListingAccess ? "Public" : "Private",
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
