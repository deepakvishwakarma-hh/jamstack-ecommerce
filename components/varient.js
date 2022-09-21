// varient previewer ,selector
import router, { useRouter } from 'next/router'
import { urlFor } from "../utils/lib/client"
import Image from 'next/image'
const Varients = (props) => {
    const Router = useRouter()

    const click = (key) => {
        props.resetSubImageIndex(0)
        Router.replace({
            pathname: '/product/[name]',
            query: { name: router.query.name, varientKey: key },
        }, undefined, { shallow: true })
    }

    return (
        <div className="flex md:flex-wrap overflow-scroll md:overflow-auto">
            {props.varients.map((varient, index) => {
                return <div
                    className={`mr-2 mb-2  rounded  bg-white`}
                    style={{ border: varient._key == Router.query.varientKey ? '3px blue solid' : '3px transparent solid' }}
                    onClick={() => { click(varient._key) }}
                    key={index}>

                    <div className='relative h-16 w-16 bg-red-200 rounded overflow-hidden' >
                        <Image loader={() => urlFor(varient.image[0])} src={urlFor(varient.image[0]).url()} layout="fill" alt={varient.name} />
                    </div>

                </div>
            })}
        </div>
    )
}


export default Varients

