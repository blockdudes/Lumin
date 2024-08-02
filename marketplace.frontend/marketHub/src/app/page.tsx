'use client'

import toast from "react-hot-toast";

export default function Home() {
  return (
      <main>
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
