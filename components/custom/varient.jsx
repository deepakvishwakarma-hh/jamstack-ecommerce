// varient previewer ,selector
import router, { useRouter } from 'next/router'
import { urlFor } from "../../utils/lib/client"

const Varients = (props) => {
    const Router = useRouter()

    const click = (index) => {
        Router.replace({
            pathname: '/product/[name]',
            query: { name: router.query.name, index },
        }, undefined, { shallow: true })
    }


    return (
        <div className="flex flex-wrap">
            {props.varients.map((varient, index) => {
                return <div
                    className={`m-2 rounded-md bg-white`}
                    style={{ border: index == Router.query.index ? '3px blue solid' : '3px white solid' }}
                    onClick={() => { click(index) }}
                    key={index}>
                    <img
                        alt={varient.name}
                        style={{ width: "100px" }}
                        src={urlFor(varient.image[0]).url()}
                    />
                </div>
            })}
        </div>
    )
}


export default Varients

