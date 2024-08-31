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
      market: string;
      creation: string;
      revenue: string;
    }[]
  >([]);

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/createdMarketplace/${account.address}`, {
        cache: "no-cache",
        next: {
          revalidate: 0
        }
      })
        .then((res) => res.json())
        .then((data) => {
          const resources = data.data.map((resource: any) => {
            console.log("resource",resource);
            return {
              market: resource.marketplaceName,
              creation: resource.createdAt,
              revenue: resource.purchases.reduce(
                (total: number, purchase: any) =>
                  total + Number(purchase.feePaid),
                0
              ),
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
      <RevenueCard data={data} />
      <RevenueTable data={data} />
    </div>
  );
};

export default RevenuePage;
