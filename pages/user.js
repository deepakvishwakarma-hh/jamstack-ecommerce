import { useContext } from "react"
import { firestore } from "../firebase"
import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import Orderitem from "../components/custom/orderItem"
import { Context } from "../components/custom/authBoundry"
import { FiRotateCw } from "react-icons/fi";

const Userpage = () => {

    const { user } = useContext(Context)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        let isActive = true;
        async function getUserData(phoneNumber) {
            await onSnapshot(doc(firestore, "users", phoneNumber), (doc) => {
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

                    {userData == null && <div className="flex items-center justify-center w-full p-5  bg-white">
                        <div className="animate-spin ">
                            <FiRotateCw color="initial" size={20} />
                        </div></div>}

                    {userData?.orders?.map((id) => <Orderitem key={id} id={id} />)}
                </div>
            </div>




        </main>
    )
}

export default Userpage

