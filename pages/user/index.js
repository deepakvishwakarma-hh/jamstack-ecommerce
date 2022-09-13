import Link from "next/link";
import { useRouter } from "next/router";
import { MdCall } from "react-icons/md";
import useUser from "../../utils/lib/userUser";
import fetchJson from "../../utils/lib/fetchJson";
import { withSessionSsr } from "../../utils/lib/withSession";
import LoginAlert from "../../components/custom/login-alert"
import { BiChevronRight, BiLogOutCircle } from "react-icons/bi";

const Userpage = ({ user }) => {

    const router = useRouter(), { mutateUser } = useUser()

    async function logoutHandler() {
        const confirm_permission = confirm('Do you really want to logout')
        if (confirm_permission) {
            mutateUser(await fetchJson('/api/user/logout', { method: 'POST' }), false)
            router.replace('/auth')
        }
    }

    if (!user?.loggedIn) {
        return <LoginAlert />
    }

    return (
        <main>
            <div className="flex items-center justify-center flex-col">
                <div className="mt-10 w-40 h-40 bg-red-800 rounded-full bg-center bg-cover bg-no-repeat border " style={{
                    backgroundImage: `url("/default-profile.webp")`
                }}></div>
                <h1 className="my-1 font-bold capitalize text-lg">Squareshop user </h1>
                <h5 className=" font-bold capitalize text-xs text-gray-500 flex items-center"> <MdCall size={13} className="mr-2 text-blue-500" />  {user?.phoneNumber}</h5>
            </div>
            <div className="mt-10 flex flex-col">
                <Link href="/user/orders" passHref>
                    <div className="bg-gray-100 py-2 rounded  flex justify-between items-center px-4 my-1">
                        <h1 className="text-md font-bold" >Orders</h1>
                        <BiChevronRight size={20} />
                    </div>
                </Link>
                <div onClick={logoutHandler} className="bg-black text-white py-2 rounded  flex justify-between items-center px-4 my-1">
                    <h1 className="text-md font-medium text-white">Logout  </h1>
                    <BiLogOutCircle size={20} />
                </div>

            </div>
        </main>
    )
}

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req, res }) {
        const user = req.session.user;
        if (user === undefined) {
            res.setHeader("location", "/auth")
            res.statusCode = 301
            res.end()
            return { props: { user: { loggedIn: false } } };
        }
        return {
            props: {
                user: req.session.user,
            },
        };
    },
);

export default Userpage
