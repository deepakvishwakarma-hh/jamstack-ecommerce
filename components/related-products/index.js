import React, { useEffect } from "react"
import { client } from "../../utils/lib/client"
import { Product } from ".."

const RelatedProdoucts = ({ catalogRef }) => {

    const [relatedProducts, setRelatedProducts] = React.useState(false)

    useEffect(() => {

        async function fetchRelativeProductsData() {

            const catalogQuery = `*[_type == "catalog" && _id == "${catalogRef}"]`;

            await client.fetch(catalogQuery).then(async (category) => {
                await client.fetch(`*[_type == "product" && references("${category[0]._id}")]{
                    name, varients, price , slug
                }`).then((pro) => {
                    setRelatedProducts(pro)
                })
            })
        }

        fetchRelativeProductsData()

    }, [catalogRef])

    if (!relatedProducts) return null // use loading in future

    return (
        <section id="related-products" >
            <div className="grid xl:grid-cols-10 lg:grid-cols-6 md:grid-cols-4 gap-1 grid-cols-3 py-3">
                {relatedProducts.map((item, index) => <Product item={item} key={index} />)}
            </div>
        </section>
    )
}
export default RelatedProdoucts