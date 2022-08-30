// for sanity client

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'lop0w17p',
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const configuredSanityClient = sanityClient({
    projectId: 'lop0w17p',
    dataset: 'production',
    useCdn: true
});

