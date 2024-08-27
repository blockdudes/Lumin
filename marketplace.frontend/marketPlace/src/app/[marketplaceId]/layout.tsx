import AppLoader from "@/components/rootComponents/appLoader";
import DynamicBreadcrumb from "@/components/rootComponents/breadcrumbs";
import ConnectWalletButton from "@/components/rootComponents/connectWalletButton";
import { Sidebar } from "@/components/rootComponents/sidebar";
import React from "react";
import { Toaster } from "react-hot-toast";

function Layout({ children }: { children: React.ReactNode }) {
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
