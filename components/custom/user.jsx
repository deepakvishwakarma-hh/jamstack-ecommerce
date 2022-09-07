
import Router from "next/router"
import { Context } from "./authBoundry"
import { firestore } from "../../firebase"
import { useState, useEffect, useContext } from "react"
import { doc, onSnapshot } from "firebase/firestore"

const User = () => {
    const { user } = useContext(Context)
    const [userData, setUserData] = useState(undefined)

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


    function onLogOutHandler() {
        localStorage.removeItem('token')
        Router.reload()
    }

    return (
        <div>
            <h1 className="text-lg font-bold p-5">Logged in as {user?.phoneNumber}</h1>
            <button className="m-5 px-5 py-2 bg-gray-200 font-semibold rounded-md" onClick={onLogOutHandler}>Logout</button>
            {userData?.orders && <div>
                <h1 className="font-bold capitalize text-md py-2">your orders id</h1>
                <ul className="list-decimal pl-3">
                    {userData.orders.map((id) => {
                        return <li key={id}>{id}</li>
                    })}
                </ul>
            </div>}

        </div>
    )
}
export default User