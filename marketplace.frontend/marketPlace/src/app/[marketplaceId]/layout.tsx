"use client";
import AppLoader from "@/components/rootComponents/appLoader";
import DynamicBreadcrumb from "@/components/rootComponents/breadcrumbs";
import ConnectWalletButton from "@/components/rootComponents/connectWalletButton";
import { Sidebar } from "@/components/rootComponents/sidebar";
import { setMarketplace } from "@/lib/features/marketplace/marketplaceSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function Layout({ children }: { children: React.ReactNode }) {
  const subdomain = (typeof window !== "undefined" && window.location.href.match(/^https?:\/\/([^.]+)\./)?.[1]) || null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (subdomain) {
      axios.get(`api/getMarketPlaceId/${subdomain}`).then((res) => {
        console.log(res.data.id);
        fetch(`api/marketplace/${res.data.id}`)
          .then((res) => res.json())
          .then((data) => {
            dispatch(setMarketplace(data.data));
          });
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [subdomain]);

  return (
    <div className="w-full flex ">
      <div className="mr-72">
        <Sidebar />
      </div>
      <div className="absolute top-3 right-3">
        <div className="flex justify-center mb-20">
          <ConnectWalletButton />
        </div>
      </div>
      <div className="h-full p-2">
        <div className="flex flex-col gap-4">
          <div>
            <DynamicBreadcrumb />
          </div>
          <div>{children}</div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          zIndex: 99999,
        }}
      />
      <AppLoader />
    </div>
  );
}

export default Layout;
