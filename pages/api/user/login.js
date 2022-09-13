import { firestore } from "../../../firebase"
import { ironOptions } from "../../../utils/lib/iron";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { withIronSessionApiRoute } from "iron-session/next";

async function loginRoute(req, res) {
    const body = await req.body
    const ref = doc(firestore, 'users', `${body.id}`)

    try {
        await getDoc(ref).then(async (user) => {
            if (user.exists()) {
                req.session.user = {
                    phoneNumber: body.id,
                    loggedIn: true
                };
                await req.session.save();
                res.status(200).json({ message: 'already in db' })
            } else {
                await setDoc(ref, { id: body.id }).then(async () => {
                    req.session.user = {
                        phoneNumber: body.id,
                        loggedIn: true
                    }
                    await req.session.save();
                    res.status(200).json({ message: 'newly in db' })
                })
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default withIronSessionApiRoute(loginRoute, ironOptions);


