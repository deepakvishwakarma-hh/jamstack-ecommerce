import Link from 'next/link'
import Head from 'next/head'
import Image from '../components/Image'
import { useState, useEffect, useContext } from 'react'
import CartLink from '../components/CartLink'
import DENOMINATION from '../utils/currencyProvider'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { SiteContext, ContextProviderComponent } from '../context/mainContext'
import makePayment from '../utils/payment'
import { Context } from '../components/custom/authBoundry'
import InvalidUserAleart from '../components/custom/invalidUserAleart'
import Address from '../components/formComponents/Address'
import { Jwt } from 'jsonwebtoken'

import crypto from "crypto"


const Cart = ({ context }) => {

    const [previewInvalidUserAleart, setPreviewInvalidUserAleart] = useState(false)



    const initialState = {
        name: 'rahuk', mobile: '1111111111', pincode: '111111', minAddress: 'sfsfsdfsdfsf dfdsf df df', maxAdress: 'sdfsfsfsds sdfg sdfd', landmark: 'fdsfdsf sdf dsfsd ', place: 'dfsdfsd ',
        state: 'madhya pradesh'
    }

    const [address, setAddress] = useState(initialState);


    const { isValidUser, user } = useContext(Context)


    const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
    useEffect(() => {
        setRenderClientSideComponent(true)
    }, [])
    const {
        numberOfItemsInCart, cart, total, clearCart
    } = context
    const cartEmpty = numberOfItemsInCart === Number(0)



    function processPayment() {

        const products = cart.map(({ size, id, productId }) => {
            return {
                size,
                productVarientKey: id,
                productId
            }
        })

        let emptyInputs = Object.keys(address).filter((n) => address[n] === '')

        if (isValidUser) {
            if (emptyInputs.length !== 0) {
                return alert('please fill all inputs')
            } else {
                makePayment(total, user.phoneNumber, address, products, clearCart)
            }
        } else {
            setPreviewInvalidUserAleart(true)
        }
    }

    if (!renderClientSideComponent) return null

    return (
        <>
            {previewInvalidUserAleart && <InvalidUserAleart close={() => { setPreviewInvalidUserAleart(false) }} />}
            <CartLink />
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
                        <h1 className="text-5xl font-light">Your Order</h1>
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
                                                <div className="border-b py-2" key={item.id}>
                                                    <div className=" items-center flex">
                                                        <Image className="w-10" src={item.image} alt={item.name} />
                                                        <p className="m-0 pl-10 text-gray-600 ">
                                                            {item.name}
                                                        </p>
                                                        <div className="flex flex-1 justify-end">
                                                            <p className="m-0 pl-10 text-gray-900 tracking-wider">
                                                                {DENOMINATION + item.price} * {item.quantity}
                                                            </p>
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

                    <Address {...{ address, setAddress }} />


                    <div className="flex flex-1 justify-end py-8">
                        <p className="text-sm pr-10">Total</p>
                        <p className="font-semibold tracking-wide">{DENOMINATION + total}</p>
                    </div>
                    {!cartEmpty && (
                        <div onClick={processPayment} className="cursor-pointer flex items-center">
                            <p className="text-gray-600 text-sm mr-2">Proceed to Payment</p>
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