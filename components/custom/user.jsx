
import jwt from "jsonwebtoken"
import Router from "next/router"
import { useState, useEffect } from "react"

const User = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const decode = token ? jwt.decode(token.toString()) : false
        if (decode) { setUser(decode) }
    }, [])

    function onLogOutHandler() {
        localStorage.removeItem('token')
        Router.reload()
    }

    return (
        <div>
            <h1 className="text-lg font-bold p-5">Logged in as {user?.phoneNumber}</h1>
            <button className="m-5 px-5 py-2 bg-gray-200 font-semibold rounded-md" onClick={onLogOutHandler}>Logout</button>
        </div>
    )
}
export default User