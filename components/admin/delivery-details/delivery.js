/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { firestore } from "../../../firebase"
import { getDoc, doc } from 'firebase/firestore'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from 'next/link';
import { client, urlFor } from ".././../../utils/lib/client"


import ObjectPreviewer from "../object-previewer"


export default function Delivery({ id }) {
    const [document, setDoc] = React.useState(null)
    const [isOpen, setOpen] = React.useState(false)
    function onClickHandler() { setOpen(!isOpen) }
    React.useEffect(() => {
        const ref = doc(firestore, "delivery", id)
        getDoc(ref).then((doc) => {
            setDoc(doc.data())
        })
    }, [id])

    console.log(document)

    const signBorderStyles = { borderWidth: '2px', borderStyle: 'solid', borderLeftColor: document == undefined ? 'red' : document == null ? 'blue' : 'green' }

    return (
        <div id={id} style={signBorderStyles} className=' bg-gray-100 my-1 rounded'>

            <div onClick={onClickHandler} className='flex justify-between items-center p-2'>
                <h1>{id}</h1>
                <i>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</i>

            </div>

            {
                isOpen &&
                <div className=''>



                    <div className='  mb-2 rounded'>
                        <h2 className='font-medium bg-black text-white px-2 py-2'>Address</h2>
                        <ObjectPreviewer object={document.address} />
                    </div>

                    <div className='  mb-2 rounded'>
                        <h2 className='font-medium bg-black text-white px-2 py-2'>User</h2>
                        <ObjectPreviewer object={document.user} />
                    </div>

                    <div className=" rounded">
                        <h2 className='font-medium bg-black text-white px-2 py-2'>Products </h2>
                        {document.products.map((product, index) => {
                            return (
                                <ProductDataPreviewer product={product} id={id} key={index} />
                            )
                        })}
                    </div>

                </div>
            }


        </div>
    )
}







const ProductDataPreviewer = ({ product, id }) => {

    const [state, setState] = useState({
        product: false,
        varient: false
    })

    useEffect(() => {

        async function fetchIt() {

            const query = `*[_type == "product" && _id == "${product.productId}" ]`

            await client.fetch(query)
                .then((res) => {
                    const productData = res[0];
                    // store 
                    setState(prev => { return { ...prev, product: productData } })
                    productData?.varients?.forEach((varient) => {
                        if (varient._key === product.productVarientKey) setState(prev => { return { ...prev, varient } })
                    })
                })
        }

        fetchIt()

    }, [product.productId, product.productVarientKey])


    console.log(product.varient)

    return (

        <div>

            <div className='flex pb-5'>

                <div className=''>
                    {state.varient?.image && <img src={urlFor(state.varient?.image[0])} alt="none" className="max-w-48" />}
                </div>

                <div className='flex-1'>
                    {state.product && <ObjectPreviewer object={
                        {
                            "varient-size": product.size,
                            "quantity": product.quantity,
                            "product-id": product.productId,
                            "product-name": state.product.name,
                            "varient-key": product.productVarientKey,
                            "product-varient-name": state.varient.name,
                        }
                    } />}
                </div>

            </div>

            <div className='py-2'>

                <Link href={`/admin/${id}`} passHref >
                    <a target="_blank" className='text-blue-500 bg-white p-1 rounded text-sm mx-2' rel="noopener noreferrer">
                        Preview in Delivery 🚚
                    </a>
                </Link>

                <Link href={`https://commerse.sanity.studio/desk/product;${product.productId}`} passHref >
                    <a target="_blank" className='text-blue-500 bg-white p-1 rounded text-sm mx-2' rel="noopener noreferrer">
                        Preview in  Sanity Dashboard 🔗
                    </a>
                </Link>
            </div>


        </div >
    )
}