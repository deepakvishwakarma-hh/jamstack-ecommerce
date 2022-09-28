import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNextSanityImage } from "next-sanity-image";
import { configuredSanityClient } from "../utils/lib/client";

import Image from "next/image";


const Orderitem = ({ id, phoneNumber }) => {

    const [isOpen, setOpen] = React.useState(false)
    const [order, setOrder] = React.useState(null)

    function onClick() { setOpen(!isOpen) }

    React.useEffect(() => {
        async function get() {
            const RequestInfo = {
                method: "POST",
                body: JSON.stringify({ id })
            }
            const data = await fetch("/api/delivery-details", RequestInfo).then((t) => t.json());
            setOrder(data)
        }

        get()
    }, [id])


    async function onCancelOrder() {
        const confirm_permission = confirm('Do you really want to cancel order')
        if (confirm_permission) {
            const RequestInfo = {
                method: "POST",
                body: JSON.stringify({ id, user: phoneNumber })
            }
            const data = await fetch("/api/cancel-order", RequestInfo).then((t) => t.json());
            if (data) {
                alert('successfully cancelled')
            } else {
                alert('product cancelation is unsucessfull')
            }
        }
    }

    function onWhatsappQueryHandler() {
        window.open(`https://wa.me/918461833731?text=${"Track My Order: " + id}`)
    }


    return (
        <div className="rounded-md overflow-hidden my-2  bg-white    ">

            <div onClick={onClick} className={`flex py-3 px-5 justify-between items-center rounded ${isOpen ? `bg-gray-200` : null} `}>
                <h3 className="text-sm"><b className="tracking-wide">Identification no  </b>: {id}</h3>
                <i>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</i>
            </div>
            {isOpen &&
                <div className="px-5">
                    <h3 className=" my-2 text-sm"> <b>Ordered by user</b> : {new Date(id).toLocaleDateString()}</h3>
                    <h3 className=" my-2 text-sm"> <b>Payment</b> : Pre-paid</h3>

                    <hr className="mb-5" />


                    {order !== null && order?.map((product, index) => <Product product={product} key={index} />)}

                    <div className="flex md:flex-row flex-col">
                        <button onClick={onCancelOrder} className=" mx-2 block bg-red-500 w-full p-1 rounded-md text-sm md:w-40 text-white mb-4">Cancel Order</button>

                        <button onClick={onWhatsappQueryHandler} className=" mx-2  bg-green-500 w-full p-1 rounded-md font-medium md:w-40 text-white text-sm mb-4 flex items-center justify-center">
                            <Image width="27px" height="27px" src="/WhatsApp.svg" alt="WhatsApp logo" loader={() => "/WhatsApp.svg"} />
                            <span className="pl-2">Track Order</span>
                        </button>
                    </div>

                </div>
            }
        </div>
    )
}
export default Orderitem

const Product = ({ product }) => {
    const imageProps = useNextSanityImage(
        configuredSanityClient,
        product.image[0]
    );

    return (
        <div className="flex mb-5">
            <Image {...imageProps} alt={product.name} layout="intrinsic" loader={imageProps.loader} width="100px" height={'100px'} />
            <div className="pl-5 ">
                <h2 className="capitalize font-bold">{product.name}</h2>
                <span className="block"> <i>Quantity</i> : {product.quantity}</span>
                <span className="block"> <i>Size</i> : {product.size}</span>
            </div>
        </div>
    )
}


