import Head from 'next/head'
import { client } from "../../utils/lib/client"
import Product from '../../components/custom/product'
import RouteUnAvailalble from '../../components/custom/route-unavailable'

const Category = (props) => {
  if (props.catalog.length == 0) return <RouteUnAvailalble />
  return (
    <>
      <Head>
        <title>Jamstack ECommerce </title>
        <meta name="description" content={`Jamstack ECommerce `} />
        <meta property="og:title" content={`Jamstack ECommerce `} key="title" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="py-10 md:py-5 ">
            <h1 className="text-center text-xl font-bold capitalize md:text-left tracking-wider text-gray-700">{props.catalog[0].name}</h1>
            <p className='text-center md:text-left text-xs capitalize text-gray-500'>product category</p>
          </div>
          <div>
            <div className="grid xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-4 gap-1 grid-cols-2 py-3">
              {props.products.map((item, index) => <Product item={item} key={index} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const { name } = context.query
  const queryCatalog = `*[_type == "catalog" && slug.current == "${name}"]`;
  const catalog = await client.fetch(queryCatalog);
  const queryProducts = `*[_type == "product" && references("${catalog[0]?._id}")]{
      name, varients, price , slug
  }`;
  const products = await client.fetch(queryProducts);
  return {
    props: { products, catalog }
  }
}

export default Category


