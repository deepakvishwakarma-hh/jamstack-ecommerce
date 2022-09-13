import Link from "next/link"

const LoginAlert = () => {
    return (
        <div className="fixed w-screen h-screen bg-gray-100 top-0 left-0 flex items-center justify-center">
            <Link href={'/auth'}>
                <div className=" rounded bg-white p-8 md:p-10 max-w-20 md:max-w-140">
                    <h1 className="text-2xl font-medium">Login </h1>
                    <p className="text-sm text-gray-400 py-1">Discover interesting projects and people to populate your personal news feed.</p>
                    <button className="bg-blue-500  my-1 py-2 px-5 rounded text-white text-sm">Continue</button>
                </div>
            </Link>
        </div>

    )
}

export default LoginAlert