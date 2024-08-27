"use client";
import { PurchasedCard } from "@/components/dashboardComponents/purchasedCard";
import { PurchasedTable } from "@/components/dashboardComponents/purchasedTable";
import { setIsAppLoading } from "@/lib/features/appLoader/appLoaderSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Course } from "@/types/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

const CreatorDashboard = () => {
  const account = useActiveAccount();
  const dispatch = useAppDispatch();
  const { marketplaceId } = useParams<{ marketplaceId: string }>();
  const [data, setData] = useState<Course[]>([]);

  useEffect(() => {
    dispatch(setIsAppLoading(true));
    if (account) {
      fetch(`/api/marketplacePurchase/${marketplaceId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const resources: Course[] = data.data.map(
            (resource: Course) => resource
          );
          setData(resources);
        })
        .finally(() => {
          dispatch(setIsAppLoading(false));
        });
    }
  }, [account]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <PurchasedCard purchasedCourses={data} />
        <PurchasedTable data={data} />
      </div>
    </>
  );
};

export default CreatorDashboard;
