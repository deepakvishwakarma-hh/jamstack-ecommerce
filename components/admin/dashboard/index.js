import React from "react"
import { onSnapshot, collection } from "firebase/firestore";
import { firestore } from "../../../firebase"
import Order from "./order";
const Dashboard = () => {

    const [realtimeOrderSnapshot, setRealtimeOrderSnapshot] = React.useState(null)

    React.useEffect(() => {

        async function fetchRealtimeOrders() {
            onSnapshot(collection(firestore, "orders"),
                (querySnapshot) => {
                    const requiredDataArr = []
                    querySnapshot.forEach((doc) => {
                        requiredDataArr.push({ ...doc.data(), id: doc.id })
                    });
                    setRealtimeOrderSnapshot(requiredDataArr)
                });
        }

        fetchRealtimeOrders()

    }, [])





    return (
        <div>


            {realtimeOrderSnapshot !== null && (
                <div id="wrapper" >
                    <div className=" capitalize px-2 grid grid-cols-5 gap-2  bg-black text-white py-2 ">
                        <div>products</div>
                        <div>date</div>
                        <div>status</div>
                        <div>order id</div>
                        <div>delivery place</div>
                    </div>
                    {realtimeOrderSnapshot.map((order, index) => {
                        return (
                            <Order key={index}>{order}</Order>
                        )
                    })}
                </div>
            )
            }




        </div>
    )
}

export default Dashboard