"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  return (
    <main className="items-center justify-center p-10">
      <div className="flex ">
        <span className="text-6xl font-bold text-gray-800">MARKET</span>
        <span className="text-6xl font-bold text-red-500">HUB</span>
      </div>
      <p className="mt-4 text-xl text-gray-600 text-left max-w-xl ">
        Create, customize, and launch your own marketplace effortlessly.
        MarketHub empowers you to design a platform tailored to your unique
        business needs.
      </p>
      <p className="mt-4 text-xl text-gray-800 text-left max-w-xl ">
        Connect your wallet to.{" "}
      </p>
      <img
        src="/hero_Markethub.png"
        alt="logo"
        className="mt-8 fixed -right-24 top-48 -z-50 h-[70%] "
      />
      <div className="py-3">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/create")}
        >
          Start Creating
        </button>
      </div>
    </main>
  );
}
