import Head from "next/head"
import { useRouter } from 'next/router'
import useUser from '../utils/lib/userUser'
import Authentication from "../components/formComponents/authentication"

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
                <meta name="theme-color" content="white" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className=' fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center py-5 mediabg'>
                <Authentication mutateUser={mutateUser} />
            </main>
        </div>
    )
}


export default Auth


