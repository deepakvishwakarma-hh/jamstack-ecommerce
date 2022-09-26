import { BsX } from 'react-icons/bs'
import Auth from "./formComponents/authentication"
const InvalidUserAleart = ({ close }) => {
    return (
        <div className=" z-50 transition-all fixed w-screen h-screen bg-black bg-opacity-50 flex justify-center items-end md:items-center top-0 left-0">
            <div className="bg-white w-full h-auto md:rounded-md rounded-b-none rounded-t-lg md:w-140 pb-5 md:pb-0">
                <div className="flex py-5 px-5   rounded" style={{ backgroundImage: "linear-gradient(-45deg, purple ,blue)" }}>
                    <h1 className=" tracking-wide text-lg text-white font-medium ">Connect with us.</h1>
                    <button className="ml-auto bg-gray-100 p-2 rounded-full" onClick={close}><BsX /></button>
                </div>
                <Auth />
            </div>

        </div>
    )
}
export default InvalidUserAleart