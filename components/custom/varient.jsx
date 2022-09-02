// varient previewer ,selector
import router, { useRouter } from 'next/router'
import { urlFor } from "../../utils/lib/client"

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
        <div className="flex flex-wrap">
            {props.varients.map((varient, index) => {
                return <div
                    className={`m-2 rounded-md bg-white`}
                    style={{ border: varient._key == Router.query.varientKey ? '3px blue solid' : '3px white solid' }}
                    onClick={() => { click(varient._key) }}
                    key={index}>
                    <img
                        alt={varient.name}
                        style={{ width: "80px" }}
                        src={urlFor(varient.image[0]).url()}
                    />
                </div>
            })}
        </div>
    )
}


export default Varients

