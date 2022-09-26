import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useUser from "../utils/lib/userUser"
import { useState, useEffect } from 'react'
import { QuantityPicker } from '../components'
import DENOMINATION from '../utils/currencyProvider'
import { FaTimes, FaLongArrowAltRight } from 'react-icons/fa'
import { SiteContext, ContextProviderComponent } from '../context/mainContext'

const Cart = ({ context }) => {
  const { user } = useUser()
  const router = useRouter()

  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])
  const {
    numberOfItemsInCart, cart, removeFromCart, total, setItemQuantity
  } = context
  const cartEmpty = numberOfItemsInCart === Number(0)

  function increment(item) {
    item.quantity = item.quantity + 1
    setItemQuantity(item)
  }

  function decrement(item) {
    if (item.quantity === 1) return
    item.quantity = item.quantity - 1
    setItemQuantity(item)
  }

  function cheakoutBtnHandler() {
    return router.push(user.isLoggedIn ? 'checkout' : '/auth?redirect=/checkout')
  }

  if (!renderClientSideComponent) return null

  return (
    <>
      <div className="flex flex-col items-center pb-10">
        <Head>
          <title>Jamstack ECommerce - Cart</title>
          <meta name="description" content={`Jamstack ECommerce - Shopping cart`} />
          <meta property="og:title" content="Jamstack ECommerce - Cart" key="title" />
        </Head>
        <div className="
          flex flex-col w-full
          c_large:w-c_large
        ">
          <div className="pt-10 pb-8">
            <h1 className="text-5xl font-light">Your Cart</h1>
          </div>

          {
            cartEmpty ? (
              <h3>No items in cart.</h3>
            ) : (
              <div className="flex flex-col">
                <div>
                  {
                    cart.map((item) => {
                      return (
                        <div className="border-b py-10" key={item.id}>
                          <div className=" items-center hidden md:flex">
                            <Link href={`${item.url}`}>
                              <a aria-label={item.name}>
                                <img className="w-32 m-0" src={item.image} alt={item.name} />
                              </a>
                            </Link>
                            <Link href={`${item.url}`}>
                              <a aria-label={item.name}>
                                <p className="
                                m-0 pl-10 text-gray-600 w-60
                                ">
                                  {item.name}
                                </p>
                                <p className="
                                  m-0 pl-10 text-gray-600 w-60
                                  ">
                                  <b>size</b> : {item.size}
                                </p>
                              </a>
                            </Link>
                            <div className="ml-4">
                              <QuantityPicker
                                numberOfitems={item.quantity}
                                increment={() => increment(item)}
                                decrement={() => decrement(item)}
                              />
                            </div>
                            <div className="flex flex-1 justify-end">
                              <p className="m-0 pl-10 text-gray-900 tracking-wider">
                                {DENOMINATION + item.price}
                              </p>
                            </div>
                            <div role="button" onClick={() => removeFromCart(item)} className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer
                            ">
                              <FaTimes />
                            </div>
                          </div>

                          <div className="flex items-center  md:hidden">
                            <Link href={`${item.url}`}>
                              <a>
                                <img className="w-32 m-0" src={item.image} alt={item.name} />
                              </a>
                            </Link>
                            <div>
                              <Link href={`${item.url}`}>
                                <a aria-label={item.name}>
                                  <p className="
                                  m-0 pl-6 text-gray-600 text-base
                                  ">
                                    {item.name}
                                  </p>
                                  <p className="
                                  m-0 pl-6 text-gray-600 text-base
                                  ">
                                    <b>size</b> : {item.size}
                                  </p>
                                </a>
                              </Link>
                              <div className="ml-6 mt-4 mb-2">
                                <QuantityPicker
                                  hideQuantityLabel
                                  numberOfitems={item.quantity}
                                  increment={() => increment(item)}
                                  decrement={() => decrement(item)}
                                />
                              </div>
                              <div className="flex flex-1">
                                <p className="text-lg m-0 pl-6 pt-4 text-gray-900 tracking-wider">
                                  {DENOMINATION + item.price}
                                </p>
                              </div>
                            </div>
                            <div role="button" onClick={() => removeFromCart(item)} className="
                            m-0 ml-10 text-gray-900 text-s cursor-pointer mr-2
                            ">
                              <FaTimes />
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
          <div className="flex flex-1 justify-end py-8">
            <p className="text-sm pr-10">Total</p>
            <p className="font-semibold tracking-wide">{DENOMINATION + total}</p>
          </div>
          {!cartEmpty && (
            <div onClick={cheakoutBtnHandler} className="cursor-pointer flex items-center bg-gray-200 py-3 px-3 rounded">
              <p className="text-gray-600 text-sm mr-2">Proceed to check out</p>
              <FaLongArrowAltRight className="text-gray-600" />
            </div>
          )}


        </div>
      </div>
    </>
  )
}

function CartWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <Cart {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}


export default CartWithContext