import { BsX } from 'react-icons/bs'
import Auth from "./formComponents/auth-form"
const InvalidUserAleart = ({ close }) => {
    return (
        <div className="transition-all fixed w-screen h-screen bg-black bg-opacity-50 flex justify-center items-end md:items-center top-0 left-0">
            <div className="bg-white w-full h-auto md:rounded-md rounded-b-none rounded-t-lg md:w-104 pb-5 md:pb-0">
                <div className="flex py-5 px-5">
                    <h1 className="text-lg font-bold">Verify Yourself</h1>
                    <button className="ml-auto bg-gray-100 p-2 rounded-full" onClick={close}><BsX /></button>
                </div>
                <Auth />
            </div>

        </div>
    )
}
export default InvalidUserAleart