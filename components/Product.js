import React from 'react'
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image'
import { useNextSanityImage } from 'next-sanity-image';
import DENOMINATION from '../utils/currencyProvider';
import useElementSize from "../utils/hooks/useElementSize"
import { configuredSanityClient } from '../utils/lib/client'
const DualGridShow = ({ item }) => {


    const varient = item.varients[0];
    const [squareRef, { width }] = useElementSize()
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
            <div ref={squareRef} className="rounded overflow-hidden " style={{ display: "grid", grid: 'auto auto / auto' }}>
                <Image  {...imageProps}
                    layout="intrinsic"
                    alt={item.name}
                    loader={imageProps?.loader}
                    height={width ?? '200px'}
                    width={width ?? '200px'}
                    className="max-h-24 bg-blue-50" />
                <div className='p-1'>
                    <p className=" font-bold capitalize text-sm">{item.name}</p>
                    <p className=" text-green-500 mb-4">{`${DENOMINATION}${item.price}`}</p>
                </div>
            </div>
        </Link>

    )
}
export default DualGridShow


