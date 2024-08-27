"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {

  const router = useRouter();

  return (
    <main className="items-center justify-center p-10">
      <div className="flex ">
        <span className="text-6xl font-bold text-gray-800">USER</span>
        <span className="text-6xl font-bold text-green-500">HUB</span>
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
        src="/hero_UserHub.jpg"
        alt="logo"
        className="mt-8 fixed right-0 top-48 -z-50 h-[70%] "
      />
      <div className="py-3">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={() => router.push('/owned')}>
          Start Learning
        </button>
      </div>
    </main>
  );
}
