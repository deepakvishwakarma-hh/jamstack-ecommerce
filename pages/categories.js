import Head from 'next/head'
import { client } from "../utils/lib/client"
import { Categories as Category } from '../components'
function Categories({ catalog = [] }) {
  return (
    <>
      <div className="w-full">
        <Head>
          <title>Jamstack ECommerce - All Categories</title>
          <meta name="description" content={`Jamstack ECommerce - All categories`} />
          <meta property="og:title" content="Jamstack ECommerce - All Categories" key="title" />
        </Head>
        <div className=" py-10 md:py-5 ">
          <h1 className="text-center text-xl font-bold capitalize md:text-left tracking-wider text-gray-700">categories</h1>
          <p className='text-center md:text-left text-xs capitalize text-gray-500'>product categories</p>
        </div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 gap-1 grid-cols-2 py-3">
          {catalog.map((category, i) => <Category key={i} category={category} />)}
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