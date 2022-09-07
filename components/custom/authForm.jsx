import jwt from "jsonwebtoken"
import { useState } from "react"
import Router from "next/router";
import { RecaptchaVerifier } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { signInWithPhoneNumber } from "firebase/auth"
import { firestore, authentication } from "../../firebase"
import { Context } from "./authBoundry"
const spinner = <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg >

const AuthForm = () => {

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
    function verifyOTP() {
        // basic otp validation
        if (input.otp?.length == 6) {
            // start [ loading effect on btn]
            startPending()
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(input.otp)
                .then((result) => {
                    const user = result.user;
                    if (user) {
                        setDoc(doc(firestore, "users", `${user.phoneNumber}`), { uid: user.uid })
                            .then(() => {
                                alert('logged in sucessfully')
                                // stop [ loading effect on btn]
                                stopPending()
                                // we need to  change in [future]
                                Router.reload()
                            }).catch((err) => alert(err))
                        const credentials = jwt.sign({ phoneNumber: user.phoneNumber, uid: user.uid }, 'loremipsumalehmad');
                        localStorage.setItem('token', credentials)
                    }
                }).catch((err) => {
                    alert(err)
                })
        } else {
            alert('OTP must be 6 number long!')
        }
    }

    return (
        <div className='bg-white p-5 rounded-md w-full md:w-auto'>
            <label>
                <h3 className="my-1 font-bold text-sm">Phone Number</h3>
                <input onChange={onChangeInputs} name="phone" type="number" value={input.phone} className="border border-gray-300 px-2 rounded-md w-full py-1" style={{ borderWidth: '2px' }} placeholder="Phone number goes here..." />
                <p className="text-xs text-gray-500 my-2">Please do not include +91 (country code)</p>
            </label>
            {acessblity.optInput
                && <label>
                    <h3 className="font-bold">OTP</h3>
                    <input className="border border-gray-300 px-2 rounded-md mb-2 w-full py-1" onChange={onChangeInputs} name="otp" placeholder="OTP goes here..." style={{ borderWidth: '2px' }} type="text" value={input.otp} />
                </label>
            }

            {acessblity.optInput && <button onClick={verifyOTP} className="flex justify-center w-full p-2 bg-black font-semibold rounded-md text-gray-50 transition ease-in-out duration-150"> {acessblity.pending ? spinner : "Verify otp"} </button>}

            {!acessblity.optInput && <button onClick={getOtp} className="flex justify-center w-full p-2 bg-black font-semibold rounded-md text-gray-50 transition ease-in-out duration-150"> {acessblity.pending ? spinner : "Send OTP"} </button>}

            <div className="fixed bottom-0 right-0" id={"recapcha-container"}></div>
        </div>
    )
}

export default AuthForm