import Router from "next/router";
import { firestore } from "../firebase"
import { doc, setDoc } from "firebase/firestore"

const makePayment = async (amount, phoneNumber, address, products, clearCart) => {

    // predefined triggers
    const Triggers = {
        'storePaymentWithProduct': (razorpay_order_id, razorpay_signature, razorpay_payment_id) => {
            return setDoc(doc(firestore, "payment", razorpay_payment_id), {
                address: address, razorpay_order_id, products: products, razorpay_signature, razorpay_payment_id,
            })
        },
        'paymentSuccessfullyStore': (razorpay_payment_id) => {
            clearCart();
            Router.replace({ pathname: "/promise/payment-sucessfull", query: { razorpay_payment_id } })
        }
    }

    const res = await initializeRazorpay();

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }

    const RequestInfo = {
        method: "POST",
        body: JSON.stringify({ amount })
    }

    const data = await fetch("/api/razorpay", RequestInfo)
        .then((t) => t.json());

    var options = {
        order_id: data.id,
        amount: data.amount,
        name: 'Mp-cart e-commerse',
        currency: data.currency,
        description: phoneNumber,
        key: 'rzp_test_e9n8awEfMheh3f',
        handler: function (response) {

            console.log(response)

            if (response.status_code === 200) {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                Triggers.storePaymentWithProduct(razorpay_order_id, razorpay_signature, razorpay_payment_id)
                    .then(Triggers.paymentSuccessfullyStore(razorpay_payment_id))
            }
        },
        prefill: {
            contact: phoneNumber,
            email: 'deepak@mail.com'
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};

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