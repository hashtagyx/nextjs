import { writeFileSync } from 'node:fs';
import qs from 'qs';
// const url = 'http://localhost:1337/api/reviews' + '?populate=*';

const url = 'http://localhost:1337/api/reviews' + '?' + qs.stringify({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: { image: { fields: ["url"] } },
    //  pagination: { pageSize: pageSize }, // functionally identical to:
    pagination: { pageSize: 6, page: 1 },
    sort: ["publishedAt:desc"],
}, { encodeValuesOnly: true});

// console.log('url:', url);
const response = await fetch(url);
const body = await response.json();

// 2nd argument: replacer, 3rd argument: number of spaces to add for indentation
const formatted = JSON.stringify(body, null, 2);
const file = 'scripts/strapi-response.json';
writeFileSync(file, formatted, 'utf8');