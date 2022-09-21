import React from 'react'
import Link from 'next/dist/client/link'
const Catagory = ({ link, name, imageUrl, }) => {
    return (
        <div className="lg:w-flex-fourth bg-light px-6 pt-10 pb-2 lg:p-6 lg:pb-0 hover:bg-light-200 lg:mb-0 mb-4 overflow-hidden mx-1">
            <Link href={link}>
                <a aria-label={name}>
                    <div className="flex flex-column justify-center items-center h-32">
                        <img alt={name} src={imageUrl} className="w-full h-full" />
                    </div>
                    <div className="">
                        <p className="text-xl font-semibold mb-1 capitalize">{name}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default Catagory