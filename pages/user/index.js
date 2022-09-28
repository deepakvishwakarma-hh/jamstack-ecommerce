import Link from "next/link";
import { MdCall } from "react-icons/md";
import { useRouter } from "next/router";
import useUser from "../../utils/lib/userUser";
import fetchJson from "../../utils/lib/fetchJson";
import { withSessionSsr } from "../../utils/lib/withSession"
import { BiChevronRight, BiLogOutCircle } from "react-icons/bi";


import React from "react";
import { firestore } from "../../firebase"
import { FiRotateCw } from "react-icons/fi";
import { Orderitem } from "../../components";
import { doc, getDoc, onSnapshot } from "firebase/firestore"
const Userpage = ({ SSR }) => {

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


    const router = useRouter()

    const { mutateUser } = useUser({ redirectTo: '/auth?redirect=/user', })

    async function logoutHandler() {
        const confirm_permission = confirm('Do you really want to logout')
        if (confirm_permission) {
            mutateUser(await fetchJson('/api/user/logout', { method: 'POST' }), false)
            router.replace('/auth')
        }
    }

    return (
        <main>
            {SSR && (<div className="flex items-center justify-center flex-col">
                <div className="mt-10 w-40 h-40 bg-red-800 rounded-full bg-center bg-cover bg-no-repeat border " style={{
                    backgroundImage: `url("/default-profile.webp")`
                }}></div>
                <h1 className="my-1 font-bold capitalize text-lg">Squareshop user </h1>
                <h5 className=" font-bold capitalize text-xs text-gray-500 flex items-center"> <MdCall size={13} className="mr-2 text-blue-500" /> {SSR.user.phoneNumber}</h5>
            </div>)}


            <div className="mt-10 flex flex-col mx-auto" style={{ maxWidth: '600px' }}>

                <section id="orders" className=" border-2 rounded  bg-purple-50 border-purple-100 overflow-hidden">

                    <h1 className="p-2 text-lg">Orders</h1>

                    {SSR && (
                        <div className="p-1" >
                            {orders == null && <div className="flex items-center justify-center w-full p-5 ">
                                <h5>Loading...</h5>
                            </div>}

                            {orders == false && <div className="flex items-center justify-center flex-col w-full p-5  rounded">
                                <h2 className="capitalize  text-center py-2">😾 Have you ordered anything yet?</h2>
                            </div>}

                            {orders && orders.map((id) => <Orderitem phoneNumber={SSR.user.phoneNumber} key={id} id={id} />)}

                        </div>
                    )}


                </section>






                <div onClick={logoutHandler} className="bg-black text-white py-2 rounded  flex justify-between items-center px-4 my-1">
                    <h1 className="text-md font-medium text-white">Logout  </h1>
                    <BiLogOutCircle size={20} />
                </div>
            </div>

        </main>
    )
}



export default Userpage

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