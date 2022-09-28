import { ironOptions } from "../../../utils/lib/iron";
import { withIronSessionApiRoute } from "iron-session/next";

function logoutRoute(req, res) {
    req.session.destroy();
    res.send({ ok: true });
}

export default withIronSessionApiRoute(logoutRoute, ironOptions);
