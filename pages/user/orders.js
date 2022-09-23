import React from "react";
import { firestore } from "../../firebase"
import { FiRotateCw } from "react-icons/fi";
import { Orderitem } from "../../components";
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { withSessionSsr } from "../../utils/lib/withSession"

const Orderpage = ({ SSR }) => {

    const [orders, setOrders] = React.useState(SSR.doc.orders)

    React.useEffect(() => {
        let isActive = true;
        function getUserData(phoneNumber) {
            try {
                onSnapshot(doc(firestore, "users", phoneNumber), (doc) => {
                    if (isActive) {
                        if (doc.data().orders?.length) {
                            setOrders(doc.data().orders)
                        } else {
                            setOrders(false)
                        }
                    }
                });
            } catch (err) {
                console.log(err)
            }
        }

        if (SSR) getUserData(SSR.user.phoneNumber)
        return () => { isActive = false };
    }, [SSR])

    return (
        <div>
            <h1 className="text-5xl font-light pt-10 pb-8">My Orders</h1>
            {SSR && (
                <div className="mt-5">
                    {orders == null && <div className="flex items-center justify-center w-full p-5  bg-white">
                        <div className="animate-spin ">
                            <FiRotateCw color="initial" size={20} />
                        </div></div>}

                    {orders == false && <div className="flex items-center justify-center w-full p-5  bg-white">
                        <div>unavailable</div>
                    </div>}

                    {orders && orders.map((id) => <Orderitem phoneNumber={SSR.user.phoneNumber} key={id} id={id} />)}

                </div>
            )}
        </div>
    )
}

export default Orderpage



export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
    const user = req.session.user;


    if (user === undefined) {
        res.setHeader("location", "/auth");
        res.statusCode = 302;
        res.end();
        return {
            props: {
                SSR: { user: false },
            },
        };
    }

    let userData

    await getDoc(doc(firestore, 'users', req.session.user.phoneNumber)).then((userDoc) => {
        userData = userDoc.data()
    })

    return {
        props: { SSR: { ...req.session, doc: userData } },
    };
})