import Image from "next/image";
import { useState } from "react"
import Spinner from "../spinner";
import { sendOtp, verifyUser } from "../../utils/lib/authentication";

const AuthForm = ({ mutateUser }) => {
    // states
    const [input, setInput] = useState({ phone: '', otp: '' })
    const [acessblity, setAcessblity] = useState({ optInput: false, pending: false, })

    // accessiblities
    function startPending() { setAcessblity(prev => { return { ...prev, pending: true } }) }
    function stopPending() { setAcessblity(prev => { return { ...prev, pending: false } }) }
    function showOtpInput() { setAcessblity(prev => { return { ...prev, optInput: true } }) }

    // [whole] on change handler
    function onChangeInputs(event) {
        const { name, value } = event.target;
        setInput(prev => {
            return { ...prev, [name]: value }
        })
    }

    function verifyOtp() { verifyUser(input.otp, { start: startPending }, mutateUser) }

    function getOtp() { sendOtp(input.phone, { start: startPending, stop: stopPending, showOtpBox: showOtpInput }) }

    return (
        <div className='md:flex bg-white md:p-20 py-10 pt-20 px-10 md:rounded-md  md:w-auto  w-full  bg-opacity-90 '>

            <div className="md:flex-1 md:flex flex-col justify-center">
                <h2 className="text-2xl font-bold">Hey, <br /> Login Now.</h2>
                <p className="text-xs text-gray-500 py-1">Secured with  Google Firebase Authentication</p>
                <h5 className="text-xs flex items-center text-black font-bold  tracking-wide"><Image loader={() => "/google-logo.png"} src="/google-logo.png" alt="n" width={20} height={20} />Google Secured</h5>
            </div>

            <div className="md:flex-1">

                {!acessblity.optInput &&
                    (<label>
                        <input readOnly={acessblity.optInput} pattern="[0-9]" maxLength="10" onChange={onChangeInputs} name="phone" type="number" value={input.phone} className="border border-gray-300 px-2 rounded-md w-full py-3 text-xs mt-5" style={{ borderWidth: '2px' }} placeholder="Phone Number" />
                        <p className="text-xs text-gray-500 my-2">Please do not include +91 ( country code )</p>
                    </label>)
                }

                {acessblity.optInput &&
                    (<label>
                        <input pattern="[0-9]" maxLength="6" onChange={onChangeInputs} name="otp" type="password" value={input.otp} className="border border-gray-300 px-2 rounded-md w-full py-3 text-xs mt-5" style={{ borderWidth: '2px' }} placeholder="OTP" />
                        <p className="text-xs text-gray-500 my-2">Enter the otp sent to the +91 {input.phone}</p>
                    </label>)
                }

                {!acessblity.optInput && (<button onClick={getOtp} style={{ height: '35px', transition: 'all .5' }} className={` text-md text-white flex items-center justify-center w-full  rounded  ${input.phone.length !== 10 ? `bg-blue-100` : `bg-blue-500`}`}>{acessblity.pending ? <Spinner /> : 'Send OTP'}</button>)}

                {acessblity.optInput && (<button onClick={verifyOtp} style={{ height: '35px', transition: 'all .5' }} className={` text-md text-white flex items-center justify-center w-full  rounded  ${input.otp.length !== 6 ? `bg-blue-100` : `bg-blue-500`}`}>{acessblity.pending ? <Spinner /> : 'Verify OTP'}</button>)}
            </div>

            <div className="fixed bottom-0 right-0" id={"recapcha-container"}></div>

        </div>
    )
}

export default AuthForm