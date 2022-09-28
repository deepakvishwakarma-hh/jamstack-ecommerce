import { firestore } from "../../firebase"
import { client, urlFor } from "../../utils/lib/client"
import { getDoc, doc } from "firebase/firestore"
import ObjectPreviewer from "../../components/admin/object-previewer"

const Delivery = ({ address, products, status }) => {

    if ((address || products) == undefined) return <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-white"> order not found  </div >

    return (
        <div className="absolute w-screen h-screen top-0 left-0 z-50 bg-white">
            <h1 className="p-2 text-center">status : {status}</h1>
            <div className="p-2">
                <h2 className='font-medium bg-black text-white px-2 py-2'>Address</h2>
                <ObjectPreviewer object={address} />
            </div>

            <div className="p-2">
                <h2 className='font-medium bg-black text-white px-2 py-2'>Products</h2>
                {products.map((product, i) => {
                    return <ObjectPreviewer key={i} object={product} />
                })}
            </div>

        </div>
    )
}

export default Delivery


export async function getServerSideProps(ctx) {

    let productsArr = []

    const id = ctx.params.deliveryId

    try {
        const ref = doc(firestore, 'orders', id)
        const document = await getDoc(ref)
        const filteredDocument = document.data()

        const query = `*[_type == "product"]`
        const sanity = await client.fetch(query)

        sanity?.forEach((product) => {
            filteredDocument?.products?.forEach(({ productId, productVarientKey, quantity, size }) => {
                if (product._id == productId) {
                    const varient = product?.varients?.filter(({ _key }) => _key === productVarientKey)[0]
                    productsArr.push({
                        'size': size,
                        'quantity': quantity,
                        'product-id': product._id,
                        'product-name': product.name,
                        'varient-name/color ': varient.name,
                        'varient-image-url': urlFor(varient.image[0]).url(),
                        'CMS-url': `https://commerse.sanity.studio/desk/product;${product._id}`,
                    })
                }
            })
        })



        return {
            props: {
                address: filteredDocument.address,
                products: productsArr,
                status: filteredDocument.status
            }
        }
    } catch {
        return {
            props: {
                notFound: true
            }
        }
    }

}