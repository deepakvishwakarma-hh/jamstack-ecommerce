import jwt from 'jsonwebtoken'
import { createContext, useEffect, useState } from "react"
const Context = createContext()

const AuthBoundry = ({ children, set }) => {

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
    }, [])


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