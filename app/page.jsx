import Link from "next/link";
import Heading from "@/components/Heading";
import { getFeaturedReview } from "@/lib/reviews";

// 'use client';
// import { useEffect } from 'react';
// default: server component (html rendered on server)
// client components: rendered on server + client, can use client-side functionality
export default async function HomePage() {
  console.log("[HomePage] rendering");
  const featuredReview = await getFeaturedReview();
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <div className="border rounded shadow hover:shadow-xl w-80 sm:w-full bg-white">
        <Link href={`/reviews/${featuredReview.slug}`} className="flex flex-col sm:flex-row">
          <img
            src={featuredReview.image}
            alt=""
            width="320"
            height="180"
            className="rounded-t sm:rounded-l sm:rounded-r-none"
          />
          <h2 className="font-semibold font-orbitron text-center py-1 sm:px-2 sm:flex sm:items-center sm:w-full sm:justify-center">
            {featuredReview.title}
          </h2>
        </Link>
      </div>
    </>
  );
}
