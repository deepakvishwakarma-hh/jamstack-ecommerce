import { doc, setDoc } from "firebase/firestore"

import { firestore } from "../firebase"

const makePayment = async (amount, phoneNumber, address, products, clearCart) => {
    const res = await initializeRazorpay();

    if (!res) {
        alert("Razorpay SDK Failed to load");
        return;
    }

    const data = await fetch("/api/razorpay", { method: "POST", body: JSON.stringify({ amount }) }).then((t) =>
        t.json()
    );


    var options = {
        key: 'rzp_test_e9n8awEfMheh3f',
        name: "MPkart e-commerse",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: phoneNumber,
        handler: function (response) {

            if (response.status_code === 200) {
                alert('payment successfull')

                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                const payload = {
                    address: address,
                    razorpay_order_id,
                    products: products,
                    razorpay_signature,
                    razorpay_payment_id,
                }
                setDoc(doc(firestore, "payment", razorpay_order_id), {
                    payload
                }).then(() => { clearCart() }).catch((err) => alert(err))
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

const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};


export default makePayment