import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

// default is 'auto' --> might be static
// export const dynamic = 'force-dynamic';
// export const revalidate = 30; // revalidate every 30 seconds

// 'use client';
// import { useEffect } from 'react';
// default: server component (html rendered on server)
// client components: rendered on server + client, can use client-side functionality
export default async function HomePage() {
  const reviews = await getReviews(3);
  console.log("[HomePage] rendering", reviews.map((rev) => rev.slug).join(', '));
  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="pb-3">Only the best indie games, reviewed for you.</p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => {
          return (
            <li
              key={review.slug}
              className="border rounded shadow hover:shadow-xl w-80 sm:w-full bg-white"
            >
              <Link
                href={`/reviews/${review.slug}`}
                className="flex flex-col sm:flex-row"
              >
                <Image
                  src={review.image}
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t sm:rounded-l sm:rounded-r-none"
                  priority={index === 0}
                />
                <div className="px-2 py-1 text-center sm:justify-center sm:flex-col sm:items-center sm:w-full">
                  {/* <h2 className="font-semibold font-orbitron sm:h-1/2 flex items-center justify-center"> */}
                  <h2 className="font-semibold font-orbitron">
                    {review.title}
                  </h2>
                  <p className="hidden sm:block pt-2">{review.subtitle}</p>
                </div>
              </Link>
            </li>
          );
        })}
        ;
      </ul>
    </>
  );
}
