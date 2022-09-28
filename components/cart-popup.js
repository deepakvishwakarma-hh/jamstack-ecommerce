import { useRouter } from "next/router"

const CartPopop = ({ close }) => {

    const router = useRouter()

    function view() { router.push('/cart') }

    return (
        <div className="bg-black w-full h-full fixed top-0 left-0 z-50 bg-opacity-30 flex items-end md:items-center  justify-center">

            <div className="bg-white shadow-md p-10 rounded w-104">
                <h1 className="capiatalize  text-xl font-bold my-5 tracking-wide">Sucessfully 👍 <br /> Product added to cart 🛒.</h1>
                <div className="flex ">
                    <button onClick={view} className="bg-black px-5 py-2 rounded text-white flex-1 m-1 tracking-wide text-sm ">View in Cart</button>
                    <button onClick={close} className="border-black border-2 px-5 py-1 rounded   flex-1 m-1 tracking-wide text-sm ">Close</button>
                </div>
            </div>
        </div>
    )
}



export default CartPopop