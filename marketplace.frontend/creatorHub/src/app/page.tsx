"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  return (
    <main className="items-center justify-center p-10">
      <div className="flex ">
        <span className="text-6xl font-bold text-gray-800">CREATOR</span>
        <span className="text-6xl font-bold text-blue-500">HUB</span>
      </div>
      <p className="mt-4 text-xl text-gray-600 text-left max-w-xl ">
        Design, create, and launch engaging courses with ease. Creator Hub gives
        you the tools to share your knowledge and grow your audience.
      </p>
      <p className="mt-4 text-xl text-gray-800 text-left max-w-xl ">
        Connect your wallet to.{" "}
      </p>
      <img
        src="/hero_CreatorHub.png"
        alt="logo"
        className="mt-8 fixed right-10 top-48 -z-50 h-[70%] "
      />
      <div className="py-3">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/create")}
        >
          Start Creating
        </button>
      </div>
    </main>
  );
}
