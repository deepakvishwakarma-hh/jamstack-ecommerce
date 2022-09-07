import Head from 'next/head'
import { client } from "../utils/lib/client"
import { DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import DualGridShow from '../components/custom/dualGridShowCategories'

function Categories({ catalog = [] }) {
  return (
    <>
      <div className="w-full">
        <Head>
          <title>Jamstack ECommerce - All Categories</title>
          <meta name="description" content={`Jamstack ECommerce - All categories`} />
          <meta property="og:title" content="Jamstack ECommerce - All Categories" key="title" />
        </Head>
        <div className="
          pt-4 sm:pt-10 pb-8
        ">
          <h1 className="text-5xl font-light">All categories</h1>
        </div>
        <div className="flex flex-col items-center">

          <div className=" gap-4
          lg:grid-cols-3 md:grid-cols-2 grid-cols-1 hidden sm:grid">
            {
              catalog.map((category, index) => (
                <DisplayMedium
                  key={index}
                  imageSrc={category.imageUrl}
                  subtitle={`${category.name} items`}
                  title={titleIfy(category.name)}
                  link={`/category/${slugify(category.name)}`}
                />
              ))
            }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 sm:hidden py-5">
          {catalog.map((category, i) => <DualGridShow key={i} category={category} />)}
        </div>

      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const query = '*[_type == "catalog"]{name, slug, "imageUrl": image.asset->url, image }';
  const catalog = await client.fetch(query);
  return {
    props: { catalog }
  };
};


export default Categories