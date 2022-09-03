import React from 'react'
import Image from 'next/dist/client/image'
import Link from 'next/dist/client/link';
import { useNextSanityImage } from 'next-sanity-image';
import useElementSize from "../../utils/hooks/useElementSize"
import { configuredSanityClient } from '../../utils/lib/client'
const dualGridShow = ({ category }) => {
    const [squareRef, { width }] = useElementSize()
    const imageProps = useNextSanityImage(
        configuredSanityClient,
        category.image
    );
    return (
        <div ref={squareRef}
            style={{ display: "grid", grid: 'auto 50px / auto' }}>
            <Link href={`/category/${category.name}`}>
                <a aria-label={category.name}>
                    <Image  {...imageProps}
                        alt={category.name}
                        layout="intrinsic"
                        loader={imageProps.loader}
                        height={width ?? '200px'}
                        width={width ?? '200px'} />
                </a>
            </Link>
            <div className='bg-gray-100 p-1'>
                <p className=" text-md capitalize text-l font-medium">{category.name}</p>
            </div>
        </div>
    )
}

export default dualGridShow
