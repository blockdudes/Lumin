import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { client } from "@/lib/client";
import { Toaster } from "react-hot-toast";
import { Sidebar } from "@/components/rootComponents/sidebar";
import DynamicBreadcrumb from "@/components/rootComponents/breadcrumbs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <StoreProvider>
            <div className="w-full flex ">
              <div className="fixed top-0 left-0 h-screen w-64">
                <Sidebar />
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex justify-center mb-20">
                  <ConnectButton
                    client={client}
                    theme={"light"}
                    appMetadata={{
                      name: "Example App",
                      url: "https://example.com",
                    }}
                  />
                </div>
              </div>
              <div className=" h-full ml-64 pl-4 bg-red-600">
                <div className="flex flex-col gap-4">
                  <div>
                    <DynamicBreadcrumb />
                  </div>
                  <div>{children}</div>
                </div>
              </div>
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </StoreProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
