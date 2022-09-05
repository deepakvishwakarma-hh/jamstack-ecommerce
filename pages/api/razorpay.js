const Razorpay = require("razorpay");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { amount } = JSON.parse(req.body)
        const razorpay = new Razorpay({
            key_id: 'rzp_test_e9n8awEfMheh3f',
            key_secret: 'QYyGCOT7KcZ6ECZO8eDhrzcB',
        });
        const options = {
            amount: (amount * 100).toString(),
            currency: "INR",
            receipt: 'gore lal to lal tum kahe pile ho ray',
            payment_capture: 1,
        };
        try {
            const response = await razorpay.orders.create(options);
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
}