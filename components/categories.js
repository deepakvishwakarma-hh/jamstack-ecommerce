//rtp
import React from 'react'
import Image from 'next/dist/client/image'
import Link from 'next/dist/client/link';
import { useNextSanityImage } from 'next-sanity-image';
import useElementSize from "../utils/hooks/useElementSize"
import { configuredSanityClient } from '../utils/lib/client'

const Categories = ({ category }) => {
    const [squareRef, { width }] = useElementSize()
    const imageProps = useNextSanityImage(
        configuredSanityClient,
        category.image
    );
    return (
        <Link href={`/category/${category.slug.current}`}>
            <div ref={squareRef} className="rounded overflow-hidden"
                style={{ display: "grid", grid: 'auto auto / auto' }}>
                <Image  {...imageProps} alt={category.name} layout="intrinsic" loader={imageProps?.loader} height={width ?? '200px'} width={width ?? '200px'} />
                <div className='p-1'>
                    <p className="text-center text-md capitalize text-l font-medium text-gray-700  ">{category.name}</p>
                </div>
            </div>
        </Link>

    )
}

export default Categories
