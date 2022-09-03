import jwt from 'jsonwebtoken'
import { createContext, useEffect, useState } from "react"
const Context = createContext()

const AuthBoundry = ({ children, set }) => {

    const [isValidUser, setValidUser] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const encrypted = token ? jwt.decode(token?.toString()) : false;
        if (encrypted) {
            setValidUser(true)
        } else {
            setValidUser(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <Context.Provider value={{ isValidUser, setValidUser }}>
                {children}
            </Context.Provider>
        </>
    )
}
export default AuthBoundry
export { Context }