import { urlFor } from "./lib/client"

const generateMainImageUrl = (props, index) => {
    if (props.index <= (props.product.varients.length - 1)) {
        return urlFor(props.product.varients[index].image[0]).url()
    }
    return urlFor(props.product.varients[0].image[0]).url()
}

export default generateMainImageUrl