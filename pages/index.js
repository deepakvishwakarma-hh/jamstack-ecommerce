import Head from 'next/head'
import { client } from '../utils/lib/client'

const Home = ({ catalog = [] }) => {
  return (
    <>
      <div className="w-full">
        <Head>
          <title>Squareshop</title>
          <meta name="description" content="Squareshop ,The best local ecommerse website" />
          <meta property="og:title" content="Squareshop" key="title" />
          <meta property="og:description" content="Squareshop ,The best local ecommerse website" />
          <meta property="og:image" content="/layout-logo.svg" />
          <meta property="og:type" content="website" />
        </Head>

        IN BUILDING

      </div>

    </>
  )
}


export const getStaticProps = async () => {
  const query = '*[_type == "catalog"]{name, slug, "imageUrl": image.asset->url }';
  // const query = '*[_type == "catalog"]{name, slug, image}';
  const catalog = await client.fetch(query);
  return {
    props: { catalog }
  };
};

export default Home