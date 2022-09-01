import { urlFor } from "./lib/client"

const generateMainImageUrl = (props, index1, index2) => {
    if (props.index <= (props.product.varients.length - 1)) {
        return urlFor(props.product.varients[index1].image[index2]).url()
    }
    return urlFor(props.product.varients[0].image[index2]).url()
}

export default generateMainImageUrl