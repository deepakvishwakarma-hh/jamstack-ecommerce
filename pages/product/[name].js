/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { client, urlFor } from "../../utils/lib/client"
import BlockContent from "@sanity/block-content-to-react"
import getVarientByKey from '../../utils/getVarientByKey'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Varients, QuantityPicker, RouteUnavailable } from '../../components'
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'



const CartPopop = dynamic(() => import("../../components/cart-popup"))
const DynamicComponentWithNoSSR = dynamic(() => import('../../components/related-products'), { ssr: false })


const ItemView = (props) => {

  console.log(props)

  const router = useRouter()
  const { product } = props
  const { product: { price, name, briefDetail, hugeDetails, varients, sizes, _id, brand },
    context: { addToCart } } = props;


  const [isCartPopupEnabled, EnableCartPopup] = useState(false)

  const [size, setSize] = useState(sizes[0].name)
  const [subImageIndex, setSubImageIndex] = useState(0)
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const [ui, setUi] = useState({ showDiscription: true })
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

  function onWhatsappQueryHandler() {
    window.open(`https://wa.me/918461833731?text=${"https://squareshop.vercel.app" + router.asPath}`)
  }

  const title = `${name.trim()} - ${currentVarient.name.trim()} | Squareshop`;

  const onAddToCartHandler = () => {
    addItemToCart(payload_for_addtocart)
    EnableCartPopup(true)
  }



  return (
    <>

      {isCartPopupEnabled && <CartPopop close={() => EnableCartPopup(false)} />}
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta name="description" content={briefDetail} />
        <meta property="og:image" content={`${image}`} />
        <meta property="og:description" content={briefDetail} />
        <meta property="og:title" content={`FriendShop - ${name}`} key="title" />
      </Head>

      <main className="sm:py-12 md:flex-row py-4 w-full flex flex-1 flex-col my-0 mx-auto">

        <div className='flex-1 flex-col hidden md:block'>
          <div className='sticky top-0'>
            <div id="image" className="p10 flex flex-1 justify-center items-center ">
              <img src={image} alt="Inventory item" className="md:max-w-104 max-h-104 " />
            </div>
            <div className="flex flex-2 justify-center flex-wrap items-center bg-gray-100 py-5">
              {currentVarient?.image.map((item, i) => (
                <div key={i} onMouseEnter={() => { setSubImageIndex(i) }} className='mx-1 cursor-pointer hover:border-black border border-3'>
                  <img src={urlFor(item).url()} alt="Inventory item" className='max-h-20' />
                </div>))}
            </div>
          </div>
        </div>

        <section id='mobile-product-image' className="p10 flex items-center overflow-scroll target md:hidden">
          {currentVarient?.image.map((item, i) => <img key={i} src={urlFor(item).url()} alt={item._key} className='md:max-w-104 max-h-104' />)}
        </section>

        <section className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">

          <section className='mb-1'>
            <h1 className=' pt-2 text-2xl font-bold  md:text-5xl md:font-light md:pb-3' >{name}</h1>
            <h5 className=' text-sm font-bold text-gray-500'> {brand}</h5>
            <p className=' pt-1 text-xs  text-gray-500'>{briefDetail}</p>
          </section>

          <section className='py-2'>
            <h3 className='py-2 font-bold'> ※ Varients</h3>
            <Varients varients={varients} resetSubImageIndex={setSubImageIndex} />
          </section>

          <section className='py-2'>
            <button onClick={() => { setUi(prev => { return { ...prev, showDiscription: !prev.showDiscription } }) }}
              className=' w-full py-3  text-left flex items-center  focus:border-none focus:outline-none font-medium'>
              <h3 className='font-bold'> ※ Discription</h3>

              {!ui.showDiscription
                ? <FiChevronDown className='ml-2' />
                : <FiChevronUp className='ml-2' />}
            </button>

            {ui.showDiscription && <div className='pb-2 pl-2' style={{ borderLeft: '2px black solid' }}>
              <BlockContent className="text-xs md:text-sm" blocks={hugeDetails}></BlockContent>
            </div>}
          </section>

          <section className='py-2'>
            <h3 className='py-2 font-bold'> ※ Sizes</h3>
            <sub className='text-gray-500 font-medium'>Select your size.</sub>
            <div className=' p-2  w-full md:w-40 bg-gray-100 rounded'>
              <select onChange={onSizeChange} className='block py-1 w-full border-none outline-none bg-transparent'  >
                {sizes.map(({ name }, i) => <option key={i} value={name}>{name}</option>)}
              </select>
            </div>
          </section>

          <section className='py-5'>
            <h2 className="text-2xl tracking-wide">₹{price} </h2>
            <sub className='text-gray-500 font-medium'>Includes all services and taxes.</sub>
          </section>

          <section className="py-2">
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems} />
          </section>

          <button className='text-sm font-bold tracking-wider bg-transparent hover:bg-black text-black font-semibold hover:text-white py-4 px-12 border-2 border-black hover:border-transparent my-1 w-full ' onClick={onAddToCartHandler}>
            <div>
              Add to Cart
            </div>
          </button>

          <button onClick={onWhatsappQueryHandler} className='text-sm w-full bg-transparent font-bold  py-2 px-12  my-1 flex  items-center bg-green-500 rounded md:w-auto justify-center'>
            <img className="mx-2" width="27px" height="27px" src="/WhatsApp.svg" alt="WhatsApp logo" /> <div className='text-left'>
              <h3 className='text-white tracking-wider font-bold'>WhatsApp Us</h3>
              <p className='text-white text-xs font-thin tracking-wide'>Send product link, ask query.</p>
            </div>
          </button>
        </section>
      </main>
      <DynamicComponentWithNoSSR catalogRef={product.catalog._ref} />
    </>
  )
}

const Productpage = (props) => {
  return props.product == null
    ? <RouteUnavailable />
    : <ItemView {...props} />
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => <Productpage {...props} context={context} />}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext

export const getServerSideProps = async (context) => {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { name } = context.query;

  const response = await client.fetch(`*[_type == "product" && slug.current == "${name}"]{
      briefDetail,hugeDetails,name,price,slug,_id,_updatedAt,sizes[]->{name},varients,brand,catalog
  }`);

  const product = response[0] ?? null





  return {
    props: { product }
  }
}