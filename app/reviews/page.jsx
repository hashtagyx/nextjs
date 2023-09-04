import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import PaginationBar from "@/components/PaginationBar";

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; // revalidate every 30 seconds

export const metadata = {
  title: "Reviews",
  description: "Only the best indie games, reviewed for you.",
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  console.log(
    "[ReviewPage] rendering:", page
  );
  return (
    <>
      <Heading>Reviews</Heading>
      {/* <div className="flex gap-2 pb-3">
        <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
        <span>Page {page} of {pageCount}</span>
        <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
      </div> */}
      {/* <p>Here we&apos;ll list all the reviews.</p> */}
      <PaginationBar page={page} pageCount={pageCount} href="/reviews" />
      <ul className="flex flex-wrap flex-row gap-3">
        {reviews.map((review, index) => {
          return (
            <li
              key={review.slug}
              className="border rounded shadow hover:shadow-xl w-80 bg-white"
            >
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  src={review.image}
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t"
                  priority={index === 0}
                />
                <h2 className="font-semibold font-orbitron text-center py-1">
                  {review.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    if (isFinite(page) && page > 0) {
      return page;
    } 
  }
  return 1;
}