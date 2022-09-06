// ready for production
import { useRouter } from "next/router"
const PaymentSuccessfull = () => {
    const router = useRouter()
    const { razorpay_payment_id } = router.query;
    function onContinueShopping() {
        router.replace('/')
    }
    return (
        <div className="bg-green-500 w-screen h-screen fixed top-0 left-0 flex items-center justify-center">
            <div className=" bg-white p-10 rounded-sm">
                <h1 className="font-bold text-lg"> Payment Successfull 👍 </h1>
                <p className="text-sm text-gray-500">   <b>Payment id :</b> {razorpay_payment_id ?? 'not found!'}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal w-full py-1 px-4 rounded mt-5 text-sm" onClick={onContinueShopping}>Continue Shopping </button>
            </div>
        </div>
    )
}

export default PaymentSuccessfull
