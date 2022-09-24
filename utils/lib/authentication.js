import fetchJson from "./fetchJson";
import { RecaptchaVerifier } from "firebase/auth"
import { signInWithPhoneNumber } from "firebase/auth"
import { authentication as firebase_authentication } from "../../firebase"

// recapcha generator
function generateRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier('recapcha-container', { 'size': 'invisible', 'callback': () => { } }, firebase_authentication);
}

// send OTP to the user.
export function sendOtp(phoneNumber, pendingHandler) {
    // safe exit for invalid mobile number
    if (phoneNumber.length !== 10) return alert('Please put valid phone number!')

    // start pending...
    pendingHandler.start()
    // recaptcha generator [ with prevent re-generation ]
    if (window.recaptchaVerifier == undefined) generateRecaptcha()
    // start sign in
    signInWithPhoneNumber(firebase_authentication, `+91${phoneNumber}`, window.recaptchaVerifier)
        .then((confirmationResult) => {
            //store to global veriable
            window.confirmationResult = confirmationResult;
            //show OTP box
            pendingHandler.showOtpBox()
            //stop pending..
            pendingHandler.stop()
        }).catch((err) => {
            alert(err)
            // [this is for beta]
            window.location.reload()
        })
}

export async function verifyUser(otp, pendingHandler, mutateUser) {
    if (otp.length !== 6) return alert('OTP must be 6 number long!')
    // start pending...
    pendingHandler.start()
    // confirming user/otp
    window.confirmationResult.confirm(otp)
        .then(async (result) => {
            // validating user in result
            if (!result.user) return;

            // prepare, for login
            const { uid, phoneNumber } = result.user;
            const apiPayload = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid, id: phoneNumber })
            }
            // fetch API request
            mutateUser(await fetchJson('/api/user/login', apiPayload))
        }).catch((err) => {
            alert(err)
            // [this is for beta]
            window.location.reload()
        })
}