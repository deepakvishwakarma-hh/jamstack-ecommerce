import React from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'
import useUser from '../utils/lib/userUser'
import AuthFrom from "../components/custom/authForm"
function Auth() {

    const { query } = useRouter()

    const { mutateUser } = useUser({
        redirectTo: query.redirect ?? '/user',
        redirectIfFound: true,
    })

    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className='flex items-center justify-center w-full py-5 bg-gray-50'>
                <AuthFrom mutateUser={mutateUser} />
            </main>
        </div>
    )
}


export default Auth


