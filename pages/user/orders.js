import React from "react";
import { firestore } from "../../firebase"
import { FiRotateCw } from "react-icons/fi";
import { doc, onSnapshot } from "firebase/firestore"
import Orderitem from "../../components/custom/orderItem"
import { withSessionSsr } from "../../utils/lib/withSession";

const Orderpage = ({ user }) => {
    const [orders, setOrders] = React.useState(null)
    React.useEffect(() => {
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

    return (
        <div>
            <h1 className="text-xl py-1 font-bold text-center">Orders</h1>
            <div className="mt-5">
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
    )
}

export default Orderpage

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