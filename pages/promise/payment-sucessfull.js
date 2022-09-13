// ready for production
import { useRouter } from "next/router"
const PaymentSuccessfull = () => {
    const router = useRouter()
    const { razorpay_payment_id } = router.query;
    function onContinueShopping() {
        router.replace('/user')
    }
    return (
        <div className=" z-50 bg-green-500 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className=" bg-white p-10 rounded-sm">
                <h1 className="font-bold text-lg text-center">Order Placed, Payment Successfull 👍 </h1>
                <p className="text-gray-400 text-sm text-center" >You can see delivery now user section</p>
                <p className="text-sm text-gray-500 text-center">   <b>Payment id :</b> {razorpay_payment_id ?? 'not found!'}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal w-full py-1 px-4 rounded my-2 text-sm" onClick={onContinueShopping}>continue </button>
            </div>
        </div>
    )
}

export default PaymentSuccessfull
