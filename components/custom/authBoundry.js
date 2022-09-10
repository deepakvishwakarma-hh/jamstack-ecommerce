import jwt from 'jsonwebtoken'
import { createContext, useEffect, useState } from "react"
import { useRouter } from 'next/router'
const Context = createContext()

const AuthBoundry = ({ children, protectedRoutes }) => {

    const router = useRouter()

    const [isValidUser, setValidUser] = useState(false)

    const [user, setUser] = useState(undefined)

    useEffect(() => {



        const token = localStorage.getItem('token')
        const encrypted = token ? jwt.decode(token?.toString()) : false;
        if (encrypted) {
            setValidUser(true)
            setUser(encrypted)
        } else {
            setValidUser(false)


        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    // if (protectedRoutes.includes(router.pathname)) {
    //     router?.replace('/auth')
    // }

    return (
        <>
            <Context.Provider value={{ isValidUser, setValidUser, user }}>
                {children}
            </Context.Provider>
        </>
    )
}
export default AuthBoundry
export { Context }