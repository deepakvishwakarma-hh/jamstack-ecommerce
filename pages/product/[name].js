import { useState } from 'react'
import Head from 'next/head'
import Button from '../../components/Button'
import Image from '../../components/Image'
import QuantityPicker from '../../components/QuantityPicker'

import { client, urlFor } from "../../utils/lib/client"

import CartLink from '../../components/CartLink'
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'
import Varients from '../../components/custom/varient'

import BlockContent from "@sanity/block-content-to-react"
import { useRouter } from 'next/router'
import generateMainImageUrl from "../../utils/generateProductImageUrl"

const ItemView = (props) => {
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { product } = props
  const { price, name, briefDetail, hugeDetails, varients } = product
  const { context: { addToCart } } = props

  const router = useRouter()

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

  const image = generateMainImageUrl(props, router.query.index)


  console.log(router.query.index)

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
        <div className="w-full md:w-1/2 h-120 flex flex-1 bg-light hover:bg-light-200">

          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Image src={image} alt="Inventory item" className="max-h-full" />
          </div>

          <div className="py-16  flex flex-2 flex-col justify-center items-center">
            {varients[0].image.map((item, i) => {
              return (
                <Image key={i} src={urlFor(item).url()} alt="Inventory item" style={{ maxWidth: '100px' }} />
              )
            })}
          </div>

        </div>

        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{name}</h1>

          <div className='my-5'>

            <h3>Varients</h3>
            <Varients varients={varients} />
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