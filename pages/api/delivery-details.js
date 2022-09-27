import { firestore } from "../../firebase"
import { doc, getDoc } from "firebase/firestore"
import { client } from "../../utils/lib/client"
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id } = JSON.parse(req.body)

        const docRef = doc(firestore, "orders", `${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const { products } = docSnap.data();
            const sanity_response = await client.fetch(`*[_type == "product" ]`);

            function filteration() {
                const P = []
                products.map((delivery_product) => {
                    sanity_response.forEach(sanity_product => {
                        if (sanity_product._id == delivery_product.productId) {
                            sanity_product.varients.forEach((varient) => {
                                if (delivery_product.productVarientKey == varient._key) {
                                    P.push({ ...varient, size: delivery_product.size, quantity: delivery_product.quantity })
                                }
                            })
                        }
                    });
                })
                return P
            }

            const result = filteration()
            res.status(200).json(result);

        } else {
            res.status(400).json(false);
        }
    }
}

