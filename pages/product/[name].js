/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from '../../components/Image'
import Button from '../../components/Button'
import Varients from '../../components/custom/varient'
import { client, urlFor } from "../../utils/lib/client"
import BlockContent from "@sanity/block-content-to-react"
import getVarientByKey from '../../utils/getVarientByKey'
import QuantityPicker from '../../components/QuantityPicker'
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ItemView = (props) => {

  const router = useRouter()
  const { product } = props
  const { product: { price, name, briefDetail, hugeDetails, varients, sizes, _id },
    context: { addToCart } } = props;

  const [size, setSize] = useState(sizes[0].name)
  const [subImageIndex, setSubImageIndex] = useState(0)
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const [ui, setUi] = useState({ showDiscription: false })
  const currentVarient = getVarientByKey(router.query.varientKey, varients)
  const image = urlFor(currentVarient.image[subImageIndex]).url();

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

  function onSizeChange(event) {
    setSize(event.target.value)
  }

  // data also related to delivery
  const payload_for_addtocart = {
    name: product.name, // for cart
    price: product.price, // for cart
    image: image, // for cart
    url: router.asPath, // for cart
    size, // for both
    id: currentVarient._key, // for cart product id , for delivery varient key
    productId: _id, // for delivery as product I
  }


  return (
    <>
      <Head>
        <title>Jamstack ECommerce - {name}</title>
        <meta name="description" content={briefDetail} />
        <meta property="og:description" content={briefDetail} />
        <meta property="og:title" content={`FriendShop - ${name}`} key="title" />
        <meta property="og:image" content={`${image}`} />
        <meta property="og:type" content="website" />
      </Head>

      <main className="sm:py-12 md:flex-row py-4 w-full flex flex-1 flex-col my-0 mx-auto">

        <div className='flex-1 flex-col hidden md:block'>
          <div className='sticky top-0'>
            <div className="p10 flex flex-1 justify-center items-center ">
              <Image src={image} alt="Inventory item" className="md:max-w-104 max-h-104 " />
            </div>

            <div className="flex flex-2 justify-center flex-wrap items-center bg-gray-100 py-5">
              {currentVarient?.image.map((item, i) => (
                <div key={i}
                  onMouseEnter={() => { setSubImageIndex(i) }}
                  className='mx-1 cursor-pointer hover:border-black border border-3'>
                  <img
                    src={urlFor(item).url()}
                    alt="Inventory item"
                    className='max-h-20' />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex-1 flex-col block md:hidden'>
          <div className='sticky top-0'>
            <div className="p10 flex flex-1 items-center overflow-scroll target">
              {currentVarient?.image.map((item, i) => (
                <img
                  key={i}
                  src={urlFor(item).url()}
                  alt="Inventory item"
                  className='md:max-w-104 max-h-104 ' />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2 ">

          <h1 className="sm:mt-0 mt-2 md:text-5xl text-xl font-bold md:font-light leading-large">{name}</h1>

          <div>
            <button onClick={() => { setUi(prev => { return { ...prev, showDiscription: !prev.showDiscription } }) }} className=' font-medium w-full py-2 text-left flex items-center focus:border-none focus:outline-none'>Discription {!ui.showDiscription ? <FiChevronDown className='ml-2' /> : <FiChevronUp className='ml-2' />}</button>
            {ui.showDiscription && <div>
              <BlockContent blocks={hugeDetails}></BlockContent>
            </div>}
          </div>

          <div>
            <h3 className='py-2 font-medium'>Varients</h3>
            <Varients varients={varients} resetSubImageIndex={setSubImageIndex} />
          </div>

          <div>
            <h3 className='py-2 font-medium'>Sizes</h3>
            <div className=' p-2  w-full md:w-40 bg-gray-100 rounded'>
              <select onChange={onSizeChange} className='block py-1 w-full border-none outline-none bg-transparent'  >
                {sizes.map(({ name }, i) => <option key={i} value={name}>{name}</option>)}
              </select>
            </div>
          </div>

          <h2 className="text-2xl tracking-wide mt-2 ">₹{price}</h2>

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
            onClick={() => addItemToCart(payload_for_addtocart)}
          />
        </div>
      </main>
    </>
  )
}


export const getServerSideProps = async (context) => {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { name } = context.query;

  const response = await client.fetch(`*[_type == "product" && slug.current == "${name}"]{
      briefDetail,hugeDetails,name,price,slug,_id,_updatedAt,sizes[]->{name},varients
  }`);

  const product = response[0] ?? null

  return {
    props: { product }
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