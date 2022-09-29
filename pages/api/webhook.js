import crypto from "crypto"
import { firestore } from "../../firebase"
import { doc, setDoc, updateDoc } from "firebase/firestore"

export default async function handler(req, res) {
    if (req.method === "POST") {
        // razorpay secreat
        const secret = '12345678'
        const shasum = crypto.createHmac('sha256', secret)
        shasum.update(JSON.stringify(req.body))
        const digest = shasum.digest('hex')
        // comparing digest 
        if (digest === req.headers['x-razorpay-signature']) {
            // document referances
            const newPaymentRef = doc(firestore, "payments", req.body.payload.payment.entity.id)
            const deliveryRef = doc(firestore, 'orders', req.body.payload.payment.entity.description)

            // varify paid deliveries
            async function makeStatusPaid() {
                await updateDoc(deliveryRef, { status: "paid", paymentId: req.body.payload.payment.entity.id })
            }
            // updating to furebase doc
            setDoc(newPaymentRef, req.body)
                .then(makeStatusPaid())
                .catch((err) => console(err))

        } else {
            // pass it
        }
        res.json({ status: 'ok' })
    }
}

