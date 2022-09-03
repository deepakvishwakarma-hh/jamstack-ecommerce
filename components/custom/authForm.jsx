import { firestore, authentication } from "../../firebase"
import { getDoc, doc, setDoc } from "firebase/firestore"
import jwt from "jsonwebtoken"
import { useState } from "react"
import Router from "next/router";
import { RecaptchaVerifier } from "firebase/auth"
import { signInWithPhoneNumber } from "firebase/auth"


const spinner = <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>


const AuthForm = () => {

    const [input, setInput] = useState({
        phone: '',
        otp: ''
    })

    const [acessblity, setAcessblity] = useState({
        optInput: false,
        pending: false,
    })

    function startPending() {
        setAcessblity(prev => { return { ...prev, pending: true } })
    }
    function stopPending() {
        setAcessblity(prev => { return { ...prev, pending: false } })
    }

    function showOtpInput() {
        setAcessblity(prev => { return { ...prev, optInput: true } })
    }

    function onChangeInputs(event) {
        const { name, value } = event.target;
        setInput(prev => {
            return { ...prev, [name]: value }
        })
    }


    function generateRecaptcha() {
        window.recaptchaVerifier = new RecaptchaVerifier('recapcha-container', {
            'size': 'invisible',
            'callback': () => { }
        }, authentication);
    }

    function getOtp(event) {
        event.preventDefault()
        if (input.phone?.length == 10) {
            startPending()
            generateRecaptcha()
            let appVerifier = window.recaptchaVerifier
            signInWithPhoneNumber(authentication, `+91${input.phone}`, appVerifier)
                .then((result) => {
                    window.confirmationResult = result;
                    showOtpInput()
                    stopPending()
                })
                .catch((err) => { alert(err) })
        } else {
            alert('Please put valid phone number!')
        }
    }


    function verifyOTP() {
        if (input.otp?.length == 6) {
            startPending()
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(input.otp)
                .then((result) => {
                    console.log(result)
                    const user = result.user;
                    if (user) {
                        setDoc(doc(firestore, "users", `${user.phoneNumber}`), {
                            uid: user.uid
                        })
                            .then(() => {
                                alert('logged in sucessfully')
                                stopPending()
                                Router.reload()
                            })
                            .catch((err) => alert(err))

                        const credentials = jwt.sign({ phoneNumber: user.phoneNumber, uid: user.uid }, 'loremipsumalehmad');
                        localStorage.setItem('token', credentials)

                        console.log(user)
                    }
                }).catch((err) => {
                    alert(err)
                })
        } else {
            alert('OTP must be 6 number long!')
        }
    }

    return (
        <div className='bg-white p-10 shadow-md rounded-md'>

            <label>
                <h3 className="my-1 font-bold">Phone Number</h3>
                <input onChange={onChangeInputs} name="phone" type="text" value={input.phone} className="border border-gray-300 px-2 rounded-md  w-full py-1"
                    style={{ borderWidth: '2px' }} placeholder="Phone number goes here..."
                />
                <p className="text-xs text-gray-500 my-1">Please do not include +91 (country code)</p>
            </label>
            {acessblity.optInput
                && <label>
                    <h3 className="font-bold">OTP</h3>
                    <input
                        className="border border-gray-300 px-2 rounded-md mb-2 w-full py-1" onChange={onChangeInputs} name="otp" placeholder="OTP goes here..."
                        style={{ borderWidth: '2px' }} type="text" value={input.otp} />
                </label>
            }

            {acessblity.optInput && <button onClick={verifyOTP} className="flex justify-center w-full p-2 bg-gray-200 font-semibold rounded-md text-gray-500 transition ease-in-out duration-150"> {acessblity.pending ? spinner : "Verify otp"} </button>}

            {!acessblity.optInput && <button onClick={getOtp} className="flex justify-center w-full p-2 bg-gray-200 font-semibold rounded-md text-gray-500 transition ease-in-out duration-150"> {acessblity.pending ? spinner : "Send otp"} </button>}

            <div className="fixed bottom-0 right-0" id={"recapcha-container"}></div>
        </div>
    )
}

export default AuthForm