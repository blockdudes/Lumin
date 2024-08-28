"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { primary } from "../../constants/colors";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const marketplaceId = useAppSelector(
    (state) => state.marketplace.marketplace
  )?.id;
  const router = useRouter();

  return (
    <main className="items-center justify-center p-10">
      <div className="flex ">
        <span className="text-6xl font-bold text-gray-800">MARKET</span>
        <span className={`text-6xl font-bold text-${primary}-500`}>PLACE</span>
      </div>
      <p className="mt-4 text-xl text-gray-600 text-left max-w-xl ">
        Effortlessly manage and access all your purchased courses from various
        marketplaces in one convenient platform, designed to simplify your
        learning experience{" "}
      </p>
      <p className="mt-4 text-xl text-gray-800 text-left max-w-xl ">
        Connect your wallet to.{" "}
      </p>
      <img
        src="/hero_Marketplace.png"
        alt="logo"
        className="mt-8 fixed right-0 top-48 -z-50 h-[70%] "
      />
      <div className="py-3">
        <button
          className={`bg-${primary}-500 text-white px-4 py-2 rounded-md`}
          onClick={() => router.push(`/${marketplaceId}/course`)}
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
