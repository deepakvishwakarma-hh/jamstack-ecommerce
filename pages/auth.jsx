import React from 'react'
import Head from "next/head"
import AuthFrom from "../components/custom/authForm"
import AuthBoundry, { Context } from '../components/custom/authBoundry'
import User from '../components/custom/user'
function Auth() {
    const { isValidUser, setValidUser } = React.useContext(Context)
    return (
        <div>

            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>


            {isValidUser ? <User /> :
                <main className='flex items-center justify-center w-screen h-screen bg-gray-50'>
                    <AuthFrom />
                </main>}

        </div>
    )
}

export default Auth


