import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getSlugs, getReview } from "@/lib/reviews";

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
  const review = await getReview(slug);
  return {
    title: review.title,
    description: "Only the best indie games, reviewed for you.",
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  console.log("[ReviewPage] rendering:", slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareLinkButton />
      </div>
      <img
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="prose prose-slate max-w-screen-sm text-justify"
      />
    </>
  );
}
