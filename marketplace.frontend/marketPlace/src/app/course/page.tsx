"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Course = () => {
  const router = useRouter();
  return (
    <div>
      shop for courses
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => router.push("/course/1")}
      >
        course no. 1
      </button>
    </div>
  );
};

export default Course;
