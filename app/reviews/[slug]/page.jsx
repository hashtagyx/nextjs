import Image from "next/image";
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getSlugs, getReview } from "@/lib/reviews";

// quick and dirty way to get pages to re-render each time a page is requested
// export const dynamic = 'force-dynamic';

// export const revalidate = 30; // revalidate every 30 seconds

export async function generateStaticParams() {
  const slugs = await getSlugs();
  // console.log('[ReviewPage] generateStaticParams:', slugs);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
    description: "Only the best indie games, reviewed for you.",
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  console.log("[ReviewPage] rendering:", slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">
        {review.subtitle}
      </p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
        priority // this sets priority to true
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm text-justify"
      />
    </>
  );
}
