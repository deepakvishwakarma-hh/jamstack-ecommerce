import React from 'react'
import Head from "next/head"
import User from '../components/custom/user'
import AuthFrom from "../components/custom/authForm"
import { Context } from '../components/custom/authBoundry'
function Auth() {
    const { isValidUser } = React.useContext(Context)
    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            {isValidUser ?
                <User /> :
                <main className='flex items-center justify-center w-full py-5 bg-gray-50'><AuthFrom /></main>}

        </div>
    )
}

export default Auth


