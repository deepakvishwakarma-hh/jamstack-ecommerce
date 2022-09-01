import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from '../../components/Image'
import Button from '../../components/Button'
import CartLink from '../../components/CartLink'
import Varients from '../../components/custom/varient'
import { client, urlFor } from "../../utils/lib/client"
import BlockContent from "@sanity/block-content-to-react"
import QuantityPicker from '../../components/QuantityPicker'
import generateMainImageUrl from "../../utils/generateProductImageUrl"
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'

const ItemView = (props) => {

  const router = useRouter()
  const { product } = props
  const { context: { addToCart } } = props
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const [subImageIndex, setSubImageIndex] = useState(0)
  const { price, name, briefDetail, hugeDetails, varients } = product
  const image = generateMainImageUrl(props, router.query.index, subImageIndex)

  function addItemToCart(product) {
    product["quantity"] = numberOfitems
    addToCart(product)
  }

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <>
      <CartLink />
      <Head>
        <title>Jamstack ECommerce - {name}</title>
        <meta name="description" content={briefDetail} />
        <meta property="og:description" content={briefDetail} />
        <meta property="og:title" content={`FriendShop - ${name}`} key="title" />
        <meta property="og:image" content={`${image}`} />
        <meta property="og:type" content="website" />
      </Head>
      <div className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <div className='flex-1  flex-col'>
          <div className='sticky top-0'>
            <div className="p10 flex flex-1 justify-center items-center ">
              <Image src={image} alt="Inventory item" className="md:max-w-104 max-h-104 " />
            </div>

            <div className="flex flex-2 justify-center flex-wrap items-center bg-gray-100 py-5">
              {varients[router.query.index]?.image.map((item, i) => {
                return (
                  <div className=' mx-1 cursor-pointer hover:border-black border border-3' key={i} onMouseEnter={() => { setSubImageIndex(i) }}>
                    <img src={urlFor(item).url()} alt="Inventory item" className='max-h-20' />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{name}</h1>

          <div className='my-5'>

            <h3>Varients</h3>
            <Varients varients={varients} resetSubImageIndex={setSubImageIndex} />
          </div>

          <h2 className="text-2xl tracking-wide sm:py-8 py-6">${price}</h2>

          <p className="text-gray-600 leading-7 mb-5">{briefDetail}</p>

          <BlockContent blocks={hugeDetails}></BlockContent>

          <div className="my-6">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems}
            />
          </div>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart(product)}
          />
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
  const { name, index } = context.query;

  const response = await client.fetch(`*[_type == "product" && slug.current == "${name}"]{
      briefDetail,hugeDetails,name,price,slug,_id,_updatedAt,sizes[]->{name},varients
  }`);

  const product = response[0] ?? null

  return {
    props: { product, index }
  }
}


function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <ItemView {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext