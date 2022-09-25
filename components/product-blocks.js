import React from 'react'
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image'
import { useNextSanityImage } from 'next-sanity-image';
import DENOMINATION from '../utils/currencyProvider';
import useElementSize from "../utils/hooks/useElementSize"
import { configuredSanityClient } from '../utils/lib/client'
const Products = ({ item }) => {
    const varient = item?.varients[0];
    const [squareRef, { width }] = useElementSize()
    const isMultipleColorTagActive = item.varients.length !== 0
    const imageProps = useNextSanityImage(
        configuredSanityClient,
        varient.image[0]
    );

    return (
        <Link href={{
            pathname: '/product/[name]',
            query: {
                name: item.slug.current,
                varientKey: varient._key
            },
        }}>

            <div ref={squareRef}
                style={{ display: "grid", grid: 'auto auto / auto' }}
                className="rounded overflow-hidden focus:bg-gray-200">

                <Image {...imageProps}
                    alt={item.name}
                    layout="intrinsic"
                    width={width ?? '200px'}
                    height={width ?? '200px'}
                    loader={imageProps?.loader}
                    className="max-h-24 bg-blue-50" />

                <div className='p-1'>

                    {isMultipleColorTagActive && (
                        <div className='bg-white md:shadow py-1 md:px-2 rounded md:inline md:absolute md:-mt-9 '>
                            <h1 className="font-bold tracking-wider multiple-colors inline-block md:block">Multiple colors</h1>
                        </div>
                    )}

                    <p className=" font-bold capitalize text-sm">{item.name}</p>
                    <p className=" font-sans-bold mb-4">{`${DENOMINATION}${item.price}`}</p>
                </div>
            </div>
        </Link>

    )
}
export default Products


