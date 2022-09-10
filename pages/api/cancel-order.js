import { firestore } from "../../firebase"
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore"
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, user } = JSON.parse(req.body)
        const userDocRef = doc(firestore, "users", `${user}`);
        const deleteDocRef = doc(firestore, "delivery", `${id}`);
        await deleteDoc(deleteDocRef)
            .then(async () => {
                await updateDoc(userDocRef, {
                    orders: arrayRemove(`${user}`)
                }).then(() => {
                    res.status(200).json(true);
                }).catch(() => {
                    res.status(400).json(false);
                })
            }).catch(() => {
                res.status(400).json(false);
            })
    }
}

