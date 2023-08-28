import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";

export const metadata = {
  title: 'Reviews',
  description: 'Only the best indie games, reviewed for you.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();
  console.log('[ReviewPage] reviews:', reviews);
  return (
    <>
      <Heading>Reviews</Heading>
      <p>Here we'll list all the reviews.</p>
      <ul className="flex flex-wrap flex-row gap-3">
        {reviews.map(({ slug, title, image }) => {
          return (
            <li key={slug} className="border rounded shadow hover:shadow-xl w-80 bg-white">
              <Link href={`/reviews/${slug}`}>
                <img
                  src={image}
                  alt=""
                  width="320"
                  height="180"
                  className="rounded-t"
                />
                <h2 className="font-semibold font-orbitron text-center py-1">
                  {title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
