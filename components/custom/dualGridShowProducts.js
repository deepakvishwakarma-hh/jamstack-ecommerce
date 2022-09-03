import React from 'react'
import Image from 'next/dist/client/image'
import Link from 'next/dist/client/link';
import { useNextSanityImage } from 'next-sanity-image';
import DENOMINATION from '../../utils/currencyProvider';
import useElementSize from "../../utils/hooks/useElementSize"
import { configuredSanityClient } from '../../utils/lib/client'
const DualGridShow = ({ item }) => {
    const [squareRef, { width }] = useElementSize()
    const varient = item.varients[0];
    const imageProps = useNextSanityImage(
        configuredSanityClient,
        varient.image[0]
    );
    return (
        <div ref={squareRef}
            style={{ display: "grid", grid: 'auto 100px / auto' }}>
            <Link href={{
                pathname: '/product/[name]',
                query: {
                    name: item.slug.current,
                    varientKey: varient._key
                },
            }}>
                <a aria-label={item.name}>
                    <Image  {...imageProps}
                        layout="intrinsic"
                        alt={item.name}
                        loader={imageProps.loader}
                        height={width ?? '200px'}
                        width={width ?? '200px'} />
                </a>
            </Link>
            <div className='bg-gray-100 p-1'>
                <p className=" text-l font-medium">{item.name}</p>
                <p className=" text-gray-700 mb-4">{`${DENOMINATION}${item.price}`}</p>
            </div>
        </div>
    )
}
export default DualGridShow


