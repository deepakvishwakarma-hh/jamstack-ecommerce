import { firestore } from "../../firebase"
import { doc, updateDoc, arrayRemove, } from "firebase/firestore"
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, user } = JSON.parse(req.body)

        await updateDoc(doc(firestore, "orders", `${id}`), { status: "cancelled" }).then(async () => {
            await updateDoc(doc(firestore, "users", `${user}`), { orders: arrayRemove(id) }).then(() => {
                res.status(200).json(true);
            }).catch((err) => { res.status(400).json(false); })
        }).catch((err) => { res.status(400).json(false); })
    }
}

