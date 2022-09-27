// const crypto = require('crypto')
import crypto from "crypto"
import { firestore } from "../../firebase"
import { doc, setDoc, updateDoc } from "firebase/firestore"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const secret = '12345678'
        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')
        if (digest === req.headers['x-razorpay-signature']) {
            const newPaymentRef = doc(firestore, "razor-payments", req.body.payload.payment.entity.id)
            const deliveryRef = doc(firestore, 'delivery', req.body.payload.payment.entity.discription)
            setDoc(newPaymentRef, req.body).then(async () => { updateDoc(deliveryRef, { status: 'paid' }) }).catch((err) => console(err))
        } else {
            // pass it
        }
        res.json({ status: 'ok' })
    }
}

