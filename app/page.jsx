import Link from "next/link";
import Heading from "@/components/Heading";

// 'use client';
// import { useEffect } from 'react';
// default: server component (html rendered on server)
// client components: rendered on server + client, can use client-side functionality
export default function HomePage() {
  //   useEffect(() => {
  //     window.alert("Welcome to my site!");
  //   }, []);
  console.log("[HomePage] rendering");
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <div className="border rounded shadow hover:shadow-xl w-80 sm:w-full bg-white">
        <Link href="/reviews/stardew-valley" className="flex flex-col sm:flex-row">
          <img
            src="/images/stardew-valley.jpg"
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-semibold font-orbitron text-center py-1 sm:px-2 sm:flex sm:items-center sm:w-full sm:justify-center">
            Stardew Valley
          </h2>
        </Link>
      </div>
    </>
  );
}
