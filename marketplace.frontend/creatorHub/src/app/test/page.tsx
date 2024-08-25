"use client";
import { useState } from "react";

export default function Home() {
  const [video, setVideo] = useState<File | null>(null);
  console.log(video);

  return (
    <main>
      <form action="">
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            const files = e.target.files;
            if (files) setVideo(files[0]);
          }}
        />
      </form>
    </main>
  );
}
