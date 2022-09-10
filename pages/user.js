import { Context } from "../components/custom/authBoundry"
import { useContext } from "react"
import { doc, setDoc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore"
import { firestore } from "../firebase"
import { useEffect, useState } from "react"
import Orderitem from "../components/custom/orderItem"

const Userpage = () => {

    const { user } = useContext(Context)
    const [userData, setUserData] = useState("fetching...")

    useEffect(() => {
        let isActive = true;

        async function getUserData(phoneNumber) {
            const sub = await onSnapshot(doc(firestore, "users", phoneNumber), (doc) => {
                if (isActive) setUserData(doc.data())
            });
        }

        if (user) getUserData(user?.phoneNumber)

        return () => { isActive = false };

    }, [user])

    return (
        <main>

            <h1 className="text-5xl py-5 font-light">Profile</h1>

            <div>
                <p><b>Contact</b> : {user?.phoneNumber}</p>
            </div>

            <hr className="my-5" />

            <div>
                <h1 className="text-xl py-1 font-bold">Orders</h1>
                <div>
                    {userData?.orders?.map((id) => <Orderitem key={id} id={id} />
                    )}
                </div>
            </div>




        </main>
    )
}

export default Userpage

