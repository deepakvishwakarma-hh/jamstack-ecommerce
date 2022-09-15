import Head from "next/head"
import { useRouter } from 'next/router'
import useUser from '../utils/lib/userUser'
import Authentication from "../components/formComponents/auth-form"

function Auth() {
    const { query } = useRouter()
    const { mutateUser } = useUser({
        redirectTo: query.redirect ?? '/user',
        redirectIfFound: true,
    })

    return (
        <div>
            <Head>
                <title>Authentication</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className='flex items-center justify-center w-full py-5 bg-contain bg-no-repeat bg-center ' style={{ backgroundImage: 'url("/undraw_login_re_4vu2.svg")' }}>
                <Authentication mutateUser={mutateUser} />
            </main>
        </div>
    )
}


export default Auth


