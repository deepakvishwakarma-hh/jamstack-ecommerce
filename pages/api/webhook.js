// const crypto = require('crypto')
import { doc, setDoc } from "firebase/firestore"

import { firestore } from "../../firebase"


import crypto from "crypto"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const secret = '12345678'

        console.log(req.body)

        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(req.body))

        const digest = shasum.digest('hex')

        console.log(digest, req.headers['x-razorpay-signature'])

        if (digest === req.headers['x-razorpay-signature']) {
            console.log('request is legit')

            setDoc(doc(firestore, "razor-payments", req.body.payload.payment.entity.id), req.body).catch((err) => console(err))

        } else {
            // pass it
        }
        res.json({ status: 'ok' })
    }
}

