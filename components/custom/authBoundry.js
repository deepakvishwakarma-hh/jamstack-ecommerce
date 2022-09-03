import jwt from 'jsonwebtoken'
import { useEffect, useState } from "react"
import { getDoc, doc } from "firebase/firestore"
import { firestore } from "../../firebase/index"


const AuthBoundry = ({ children, set }) => {

    const [isValidUser, setValidUser] = useState('validating')

    const setResponse = (param) => {
        setValidUser(param)
        set(param)
    }

    useEffect(() => {

        const token = localStorage.getItem('token')
        const decode = token ? jwt.decode(token.toString()) : false
        if (decode) {
            console.log(decode)
            getDoc(doc(firestore, "users", decode?.phoneNumber)).then(() => {
                setResponse(true)

            }).catch(() => {
                setResponse(false)
            })
        } else {
            setResponse(false)
        }

    }, [])


    return (
        <>
            {children}
        </>
    )
}
export default AuthBoundry