import Head from 'next/head'
import ListItem from '../../components/ListItem'
import CartLink from '../../components/CartLink'
import { client, urlFor } from "../../utils/lib/client"

const Category = (props) => {

  return (
    <>
      <CartLink />
      <Head>
        <title>Jamstack ECommerce </title>
        <meta name="description" content={`Jamstack ECommerce `} />
        <meta property="og:title" content={`Jamstack ECommerce `} key="title" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="max-w-fw flex flex-col w-full">
          <div className="pt-4 sm:pt-10 pb-8">
            <h1 className="text-5xl font-light capitalize">{props.catalog[0].name}</h1>
          </div>

          <div>
            <div className="flex flex-1 flex-wrap flex-row">
              {
                props.products.map((item, index) => {
                  const varient = item.varients[0];
                  return (
                    <ListItem
                      key={index}
                      href={{
                        pathname: '/product/[name]',
                        query: {
                          name: item.slug.current,
                          varientKey: varient._key
                        },
                      }}
                      title={item.name}
                      price={item.price}
                      imageSrc={urlFor(varient.image[0]).url()}
                    />
                  )
                })
              }
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