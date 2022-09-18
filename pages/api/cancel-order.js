import { firestore } from "../../firebase"
import { doc, deleteDoc, updateDoc, arrayRemove, getDoc, setDoc } from "firebase/firestore"
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { id, user } = JSON.parse(req.body)
        const userDocRef = doc(firestore, "users", `${user}`);

        const calcelDeliveryRef = doc(firestore, "delivery", `${id}`);


        // await deleteDoc(deleteDocRef)
        //     .then(async () => {
        //         await updateDoc(userDocRef, {
        //             orders: arrayRemove(id)
        //         }).then(() => {
        //             res.status(200).json(true);
        //         }).catch(() => {
        //             res.status(400).json(false);
        //         })
        //     }).catch(() => {
        //         res.status(400).json(false);
        //     })



        // store D-doc [delivery to cancel-delivaries]
        // remove [delivery] id from user


        try {
            await getDoc(doc(firestore, "delivery", `${id}`)).then(async (response) => {
                await setDoc(doc(firestore, "cancelled-delivery", `${id}`), response.data()).then(async () => {
                    await updateDoc(doc(firestore, "users", `${user}`), { orders: arrayRemove(id) }).then(() => {
                        res.status(200).json(true);
                    })
                })
            })
        } catch (err) {
            res.status(400).json(false);
            console.log(err)
        }

    }
}

