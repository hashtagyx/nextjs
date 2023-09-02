import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; // revalidate every 30 seconds

export const metadata = {
  title: 'Reviews',
  description: 'Only the best indie games, reviewed for you.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews(6);
  console.log('[ReviewPage] reviews:', reviews.map((rev) => rev.slug).join(', '));
  return (
    <>
      <Heading>Reviews</Heading>
      <p>Here we&apos;ll list all the reviews.</p>
      <ul className="flex flex-wrap flex-row gap-3">
        {reviews.map((review, index) => {
          return (
            <li key={review.slug} className="border rounded shadow hover:shadow-xl w-80 bg-white">
              <Link href={`/reviews/${review.slug}`}>
                <Image
                  src={review.image}
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t"
                  priority={index===0}
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
