'use client'

import toast from "react-hot-toast";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
