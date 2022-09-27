//Asyncronnouse
import Router from "next/router";
import { firestore } from "../firebase"
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"

const makePayment = async (amount, phoneNumber, address, products, clearCart) => {

    const res = await initializeRazorpay()

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }

    const RequestInfo = {
        method: "POST",
        body: JSON.stringify({ amount })
    }

    const data = await fetch("/api/razorpay", RequestInfo).then((t) => t.json());

    // payment sucessfull
    async function sucessfull(response, DocId) {
        const { razorpay_payment_id } = response
        // update delivery to user account;
        await updateDoc(doc(firestore, "users", phoneNumber), {
            orders: arrayUnion(DocId)
        }).then(() => {
            // clear cart
            clearCart();
            // relace history stact to successfull order placed;
            Router.replace({ pathname: "/promise/payment-sucessfull", query: { razorpay_payment_id } })
        })
    }

    // payment unsucessfull 
    function unsucessfull() {
        alert('payment unsuccessfull')
    }

    // Document Id generation;
    const DocId = + new Date()

    // store delivery-prodct
    await setDoc(doc(firestore, "orders", `${DocId}`), {
        address: address,
        products: products,
        status: "failed",
        user: { phoneNumber: phoneNumber }// we need to change to cokkies
    }).then(() => {
        const paymentObject = new window.Razorpay({
            order_id: data.id,
            // assigning into as discription to razorpay
            description: DocId,
            amount: data.amount,
            currency: data.currency,
            name: 'Mp-cart e-commerse',
            key: 'rzp_test_e9n8awEfMheh3f',
            handler: function (res) {
                // calling successfull [conditinally]
                if (res) return sucessfull(res, DocId)
            },
            prefill: {
                contact: phoneNumber,
                email: 'deepak@mail.com'
            }
        });
        paymentObject.open();
        // calling unsucessfull [conditionally]
        paymentObject.on('payment.failed', unsucessfull)
    }).catch((err) => {
        console.log(err)
    })

}

// initilising RazorPay;
const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => { resolve(true) };
        script.onerror = () => { resolve(false) };
        document.body.appendChild(script);
    });
};

export default makePayment