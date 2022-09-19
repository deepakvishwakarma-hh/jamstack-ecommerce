
import { ironOptions } from "../../../utils/lib/iron";
import { withIronSessionApiRoute } from "iron-session/next";

async function userRoute(req, res) {
    if (req.session.user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            ...req.session.user,
            isLoggedIn: true,
        })
    } else {
        res.json({
            isLoggedIn: false,
        })
    }
}

export default withIronSessionApiRoute(userRoute, ironOptions);
