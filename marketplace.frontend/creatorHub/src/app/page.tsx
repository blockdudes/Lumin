'use client'

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
      <main className="w-full h-full">
        <div>
          <h1>Welcome to the Creator Hub</h1>
        </div>
        <div className="flex flex-col items-center justify-center text-blue-500">
        <div onClick={() => router.push("/create")}>
            <h2>Create your first product</h2>
        </div>
        <div onClick={() => router.push("/dashboard")}>
             <h2>Go to dashboard</h2>
        </div>  
        </div>

      <button onClick={ async () => toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        }),
        {
          loading: 'Saving...',
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        }
        )}>click</button>
    </main>
  );
}
