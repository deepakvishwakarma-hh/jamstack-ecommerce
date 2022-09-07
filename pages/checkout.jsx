import Head from 'next/head'
import { useRouter } from 'next/router'
import makePayment from '../utils/payment'
import CartLink from '../components/CartLink'
import DENOMINATION from '../utils/currencyProvider'
import { useState, useEffect, useContext } from 'react'
import { addressInitialState } from "../ecommerce.config"
import { Context } from '../components/custom/authBoundry'
import Address from '../components/formComponents/Address'
import Product from '../components/custom/cheakout-products'
import InvalidUserAleart from '../components/custom/invalid-user-aleart'
import { SiteContext, ContextProviderComponent } from '../context/mainContext'

const Cheakout = ({ context }) => {

    // state [statefull component]
    const { isValidUser, user } = useContext(Context)
    const [address, setAddress] = useState(addressInitialState);
    const [previewInvalidUserAleart, setPreviewInvalidUserAleart] = useState(false)
    const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)

    // setting up router
    const router = useRouter()

    // destructuring....
    const { numberOfItemsInCart, cart, total, clearCart } = context
    const cartEmpty = numberOfItemsInCart === Number(0)
    // to render non-serverside
    useEffect(() => {
        if (cartEmpty) router.replace('/cart')
        setRenderClientSideComponent(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // process payment [validation , so on]
    function processPayment() {
        // product [like-schema]
        const products = cart.map(({ size, id, productId }) => {
            return { size, productVarientKey: id, productId }
        })

        // getting empty inputs of address form [as arrey]
        let emptyInputs = Object.keys(address).filter((n) => address[n] === '')

        // validating user 
        if (isValidUser) {
            // validating [non-empty input]
            if (emptyInputs.length !== 0) {
                return alert('please fill all inputs')
            } else {
                // perform make payment
                makePayment(total, user.phoneNumber, address, products, clearCart)
            }
        } else {
            // show login section [as aleart]
            setPreviewInvalidUserAleart(true)
        }
    }

    // forcefully render client side 
    if (!renderClientSideComponent) return null

    return (
        <>
            {previewInvalidUserAleart && <InvalidUserAleart close={() => { setPreviewInvalidUserAleart(false) }} />}
            <CartLink />
            <div className="flex flex-col items-center pb-10">
                <Head>
                    <title>Jamstack ECommerce - Address & Payment</title>
                    <meta name="description" content={`Jamstack ECommerce - Shopping cart`} />
                    <meta property="og:title" content="Jamstack ECommerce - Cart" key="title" />
                </Head>
                <main className=" flex flex-col w-full c_large:w-c_large">
                    <div className='block md:flex'>
                        <Address {...{ address, setAddress }} />
                        <div className="flex flex-col flex-1 md:pl-3">
                            <h3 className="text-3xl py-5 pb-10">Products</h3>
                            {cart.map((item) => <Product item={item} key={item.id} />)}
                        </div>
                    </div>

                    <div className="flex flex-1 justify-end py-2">
                        <p className="text-sm pr-10">Total</p>
                        <p className="font-semibold tracking-wide">{DENOMINATION + total}</p>
                    </div>
                    {!cartEmpty && (
                        <div className="bg-blue-500 hover:bg-blue-700 text-white font-normal w-full py-3 px-4 rounded mt-5 text-sm flex items-center cursor-pointer" onClick={processPayment}>
                            <img src="/razorpay-icon.svg" alt="icon" />
                            <div className="flex flex-col">
                                <p className="text-md mx-2 text-white">Proceed to Payment</p>
                                <p className="text-xs mx-2 leading-3 text-yellow-200 tracking-wide">Razorpay</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}


// context setup;
function CartWithContext(props) {
    return (
        <ContextProviderComponent>
            <SiteContext.Consumer>
                {context => <Cheakout {...props} context={context} />}
            </SiteContext.Consumer>
        </ContextProviderComponent>
    )
}


export default CartWithContext