// import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";
export const CACHE_TAG_REVIEWS = 'reviews';

export async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"],
    populate: { image: { fields: ["url"] } },
    pagination: { pageSize: 1, withCount: false },
  });
  if (data.length === 0) {
    return null;
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize, page) {
  // look at /scripts/strapi-response.json for example response
  // deconstructing object, feed in params into fetchReviews
  // data is an array of objects returned by api call
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    //  pagination: { pageSize: pageSize }, // functionally identical to:
    pagination: { pageSize, page },
    sort: ["publishedAt:desc"],
  });
  // array of objects returned by api call is mapped using toReview function
  // each object is ingested into toReview and returned as a new object with the required fields
  // this is an array of review objects
  return { 
    reviews: data.map(toReview),
    pageCount: meta.pagination.pageCount,
  };
}

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    pagination: { pageSize: 100 },
    sort: ["publishedAt:desc"],
  });
  return data.map((item) => item.attributes.slug);
}

async function fetchReviews(parameters) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, { encodeValuesOnly: true });

  // console.log("[fetchReviews]:", url);
  const response = await fetch(url, {
    next: {
      // revalidate: 30, // 30 seconds
      tags: [CACHE_TAG_REVIEWS], // used in webhooks/cms-event/route.js to identify when we need to revalidate
    }
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item) {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
}
