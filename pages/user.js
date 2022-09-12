import { firestore } from "../firebase"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import useUser from "../utils/lib/userUser";
import { FiRotateCw } from "react-icons/fi";
import fetchJson from "../utils/lib/fetchJson";
import { doc, onSnapshot } from "firebase/firestore"
import Orderitem from "../components/custom/orderItem"
import { withSessionSsr } from "../utils/lib/withSession";

const Userpage = ({ user }) => {

    const router = useRouter()
    const { mutateUser } = useUser()
    // state : user orders
    const [orders, setOrders] = useState(null)

    // fetching : user orders , simentinously
    useEffect(() => {
        let isActive = true;
        async function getUserData(phoneNumber) {
            await onSnapshot(doc(firestore, "users", phoneNumber), (doc) => {
                if (isActive) {
                    if (doc.data().orders?.length) {
                        setOrders(doc.data().orders)
                    } else {
                        setOrders(false)
                    }
                }
            });
        }

        if (user) getUserData(user.phoneNumber)

        return () => { isActive = false };

    }, [user])

    async function logout() {
        mutateUser(await fetchJson('/api/user/logout', { method: 'POST' }), false)
        router.replace('/auth')
    }

    return (
        <main>
            <h1 className="text-5xl py-5 font-light">Profile</h1>
            <div>
                <p><b>Contact</b> : {user?.phoneNumber}</p>
                <button onClick={logout} className="px-5 py-1 my-2 bg-red-300 rounded-md text-red-800 capitalize">logout</button>
            </div>
            <hr className="my-5" />
            <div>
                <h1 className="text-xl py-1 font-bold">Orders</h1>
                <div>
                    {orders == null && <div className="flex items-center justify-center w-full p-5  bg-white">
                        <div className="animate-spin ">
                            <FiRotateCw color="initial" size={20} />
                        </div></div>}

                    {orders == false && <div className="flex items-center justify-center w-full p-5  bg-white">
                        <div>unavailable</div>
                    </div>}

                    {orders && orders.map((id) => <Orderitem phoneNumber={user?.phoneNumber} key={id} id={id} />)}

                </div>
            </div>
        </main>
    )
}

export default Userpage

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        if (user === undefined) {
            res.setHeader("location", "/auth")
            res.statusCode = 301
            res.end()
            return { props: { user: false } };
        }

        return {
            props: {
                user: req.session.user,
            },
        };
    },
);