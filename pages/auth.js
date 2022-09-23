import Head from "next/head"
import { useRouter } from 'next/router'
import useUser from '../utils/lib/userUser'
import { AuthenticationForm } from "../components"

function Auth() {
    const { query } = useRouter()
    const { mutateUser } = useUser({
        redirectTo: query.redirect ?? '/user',
        redirectIfFound: true,
    })

    return (
        <div >
            <Head>
                <title>Authentication</title>
                <meta name="theme-color" content="blue" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className=' fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center py-5 bg-no-repeat bg-white'
            // style={{ backgroundImage: 'linear-gradient(45deg,purple,blue)' }}
            >
                <AuthenticationForm mutateUser={mutateUser} />
            </main>
        </div>
    )
}


export default Auth


