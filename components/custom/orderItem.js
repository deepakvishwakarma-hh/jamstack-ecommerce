import React from "react";
import { Context } from "./authBoundry";
import { urlFor } from "../../utils/lib/client"
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Orderitem = ({ id }) => {

    const context = React.useContext(Context)
    const [isOpen, setOpen] = React.useState(false)
    const [orders, setOrders] = React.useState(null)

    function onClick() { setOpen(!isOpen) }

    React.useEffect(() => {
        async function get() {
            const RequestInfo = {
                method: "POST",
                body: JSON.stringify({ id })
            }
            const data = await fetch("/api/delivery-details", RequestInfo).then((t) => t.json());
            setOrders(data)
        }

        get()
    }, [id])

    const Icon = isOpen ? <FiChevronUp /> : <FiChevronDown />

    const orderedPlacedDate = new Date(id).toLocaleDateString();

    async function onCancelOrder() {
        const RequestInfo = {
            method: "POST",
            body: JSON.stringify({ id, user: context?.user?.phoneNumber })
        }
        const data = await fetch("/api/cancel-order", RequestInfo).then((t) => t.json());

        if (data) {
            alert('successfully cancelled')
        } else {
            alert('product cancelation is unsucessfull')
        }

    }

    return (
        <div className="rounded-md overflow-hidden mb-2 py-2" key={id}>
            <div onClick={onClick} className="flex bg-gray-100 py-3 px-5 justify-between items-center">
                <h5>{id}</h5>
                <i>{Icon}</i>
            </div>
            {isOpen && <div className="px-5">

                <h3 className="capitalize my-5"> <b>order placed at</b> : {orderedPlacedDate}</h3>

                {orders !== null && orders?.map((order, index) => {
                    return <div className="flex mb-5" key={index}>

                        <img src={urlFor(order.image[0])} width={"100px"} height={"100px"} alt={order.name} />

                        <div className="pl-5 ">
                            <h2 className="capitalize font-bold">{order.name}</h2>
                            <span className="block"> <i>Quantity</i> : {order.quantity}</span>
                            <span className="block"> <i>Size</i> : {order.size}</span>
                        </div>
                    </div>
                })}



                <button onClick={onCancelOrder} className="block bg-red-200 w-full p-2 rounded-md font-medium md:w-40 text-red-900">Cancel Order</button>

            </div>
            }
        </div>
    )
}
export default Orderitem


