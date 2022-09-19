import { useState } from "react"
import { authentication } from "../../firebase"
import { RecaptchaVerifier } from "firebase/auth"
import fetchJson from "../../utils/lib/fetchJson";
import { signInWithPhoneNumber } from "firebase/auth"
import { FiChevronsRight } from "react-icons/fi";
const spinner = <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg >

const AuthForm = ({ mutateUser }) => {

    // states
    const [input, setInput] = useState({ phone: '', otp: '' })
    const [acessblity, setAcessblity] = useState({ optInput: false, pending: false, })

    // accessiblity
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

    // recapcha generator
    function generateRecaptcha() { window.recaptchaVerifier = new RecaptchaVerifier('recapcha-container', { 'size': 'invisible', 'callback': () => { } }, authentication); }

    // send opt to the user phone number [conditionally]
    function getOtp(event) {
        event.preventDefault()
        // basic phone number validation
        if (input.phone?.length == 10) {
            // start [ loading effect on btn]
            startPending()
            generateRecaptcha()
            let appVerifier = window.recaptchaVerifier
            signInWithPhoneNumber(authentication, `+91${input.phone}`, appVerifier)
                .then((result) => {
                    window.confirmationResult = result;
                    showOtpInput()
                    // stop [ loading effect on btn]
                    stopPending()
                })
                .catch((err) => { alert(err) })
        } else {
            alert('Please put valid phone number!')
        }
    }

    // verify opt by user
    async function verifyOTP() {
        // basic otp validation
        if (input.otp?.length == 6) {
            // start [ loading effect on btn]
            startPending()
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(input.otp)
                .then(async (result) => {
                    if (result.user) {
                        try {
                            const body = {
                                id: result.user.phoneNumber,
                                uid: result.user.uid,
                            }

                            mutateUser(
                                await fetchJson('/api/user/login', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(body),
                                })
                            )
                        } catch (error) {
                            if (error) {
                                alert(error)
                            } else {
                                console.error('An unexpected error happened:', error)
                            }
                        }
                    }
                }).catch((err) => {
                    alert(err)
                })
        } else {
            alert('OTP must be 6 number long!')
        }
    }

    return (
        <div className='bg-white md:p-20 py-20 px-10 rounded-md w-full md:w-auto bg-opacity-90' >
            <label>
                <h3 className="my-1 font-bold text-sm">Phone Number</h3>
                <input readOnly={acessblity.optInput} pattern="[0-9]" minLength={10} maxLength={10} onChange={onChangeInputs} name="phone" type="number" value={input.phone} className="border border-gray-300 px-2 rounded-md w-full py-1" style={{ borderWidth: '2px' }} placeholder="Phone Number" />
                <p className="text-xs text-gray-500 my-2">Please do not include +91 (country code)</p>
            </label>
            {acessblity.optInput
                && <label>
                    <h3 className="my-1 font-bold text-sm">OTP <sub className="text-gray">(One Time Password)</sub></h3>
                    <input minLength={10} maxLength={6} className="border border-gray-300 px-2 rounded-md mb-2 w-full py-1" onChange={onChangeInputs} name="otp" placeholder="OTP goes here..." style={{ borderWidth: '2px' }} type="text" value={input.otp} />

                </label>
            }

            {acessblity.optInput && <button onClick={verifyOTP} className="flex justify-center w-full p-2 bg-black font-normal rounded-md text-gray-50 text-sm"> {acessblity.pending ? spinner : "Verify OTP"} </button>}

            {!acessblity.optInput && <button onClick={getOtp} className="flex justify-center w-full p-2 bg-black font-normal rounded-md text-gray-50 text-sm"> {acessblity.pending ? spinner : <FiChevronsRight />} </button>}

            <div className="fixed bottom-0 right-0" id={"recapcha-container"}></div>
        </div>
    )
}

export default AuthForm