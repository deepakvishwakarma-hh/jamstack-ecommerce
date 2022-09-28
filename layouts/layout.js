import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import useUser from "../utils/lib/userUser"
import { navItemLength } from '../ecommerce.config'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiLayers, FiTruck } from "react-icons/fi";
export default function Layout({ children, categories = [], prohibitRoutes }) {

  const { user } = useUser()
  const router = useRouter()
  const [isMenuVisible, setMenuVisiblity] = useState(false)

  function onMenuClick() {
    setMenuVisiblity(prev => !prev)
  }

  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  // do not try : not tested yet
  if (prohibitRoutes.includes(router.pathname)) {
    return <main className="w-full">{children}</main>
  }

  function activeClass(route) {
    return route == router.pathname ? { color: "blue" } : {}
  }

  function setMenuDiseble() {
    setMenuVisiblity(false)
  }

  return (
    <div>

      <div style={{ display: isMenuVisible ? 'block' : "none" }} className='bg-white top-0 left-0 fixed z-40 w-screen h-screen pt-20 transition-all overscroll-contain'>
        <div className=' flex-1 items-center flex flex-col h-full'>

          <Link passHref href={`/`}>
            <p onClick={setMenuDiseble} style={activeClass('/')} className="text-center text-md py-3  w-full font-bold">Home</p>
          </Link>

          <Link passHref href={user?.isLoggedIn ? '/user' : '/auth?redirect=/user'}>
            <p onClick={() => { setMenuDiseble() }} style={activeClass('/user')} className="text-center text-md py-3  w-full font-bold"> Account</p>
          </Link>

          <Link passHref href={`/categories`}>
            <p onClick={setMenuDiseble} style={activeClass('/categories')} className="text-center text-md py-3  w-full font-bold">Categories</p>
          </Link>

          <p className="text-center text-xs py-3  w-full text-gray-400"> Copyright © 2021 Deepak Ecommerce. All rights reserved</p>

        </div>
      </div>

      <nav className='fixed w-screen  bg-white z-50 shadow-sm'>

        <div className="flex justify-center">
          <div className=" mobile:px-12 flex-row  desktop:px-0 px-4 flex w-fw lg:h-20 h-14">

            <div className="flex items-center justify-center">
              <Link href="/">
                <Image src="/layout-logo.svg" loader={() => "/layout-logo.svg"} alt="logo" width="160px" height="50px" />
              </Link>
            </div>
            <div className=' flex-1 items-center px-5 hidden lg:flex  ml-10'>

              <Link href={`/`}>
                <a aria-label={'home'}>
                  <p style={activeClass('/')} className="sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4 font-bold flex text-gray-700"><FiHome size={20} className="mr-2" />Home</p>
                </a>
              </Link>

              <Link href={`/categories`}>
                <a aria-label={'home'}>
                  <p style={activeClass('/categories')} className="sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4 font-bold flex text-gray-700"><FiLayers size={20} className="mr-2" /> Categories</p>
                </a>
              </Link>

              <Link href={user?.isLoggedIn ? '/user/orders' : '/auth?redirect=/user/orders'}>
                <a aria-label={'home'}>
                  <p style={activeClass('/user/orders')} className="sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4 font-bold flex text-gray-700"><FiTruck size={20} className="mr-2" />My Orders</p>
                </a>
              </Link>

            </div>

            <div className=' flex-1 items-center justify-end h-full flex '>

              <Link href="/cart">
                <div className=" flex items-center justify-center justify-self-end  h-full p-3 text-gray-600  cursor-pointer">
                  <a aria-label="Home">
                    <FiShoppingCart size={22} />
                  </a>
                </div>
              </Link>

              <Link href={user?.isLoggedIn ? '/user' : '/auth?redirect=/user'}>
                <div className=" items-center justify-center justify-self-end  h-full p-3 text-gray-600  cursor-pointer hidden lg:flex">
                  <a aria-label="Home">
                    <FiUser size={22} />
                  </a>
                </div>
              </Link>

              {!isMenuVisible &&
                <div onClick={onMenuClick} className=" items-center justify-center justify-self-end  h-full p-3 text-gray-600  cursor-pointer flex lg:hidden">
                  <a aria-label="Home">
                    <FiMenu size={22} />
                  </a>
                </div>}

              {isMenuVisible &&
                <div onClick={onMenuClick} className=" items-center justify-center justify-self-end  h-full p-3 text-gray-600  cursor-pointer flex lg:hidden">
                  <a aria-label="Home">
                    <FiX size={22} />
                  </a>
                </div>}
            </div>
          </div>
        </div>
      </nav>

      <div className="mobile:px-10 px-4 pb-10 flex justify-center">
        <main className="lg:w-fw mt-16 md:mt-24 w-full " >
          {children}
        </main>
      </div>
      <footer className="flex justify-center">

        <div className=" sm:flex-row sm:items-center flex-col flex w-fw px-12 py-8 desktop:px-0 border-solid border-t border-gray-300">
          <span className="block text-gray-700 text-xs">Copyright © 2021 Deepak Ecommerce. All rights reserved.</span>
          {/* <div className="
            sm:justify-end sm:m-0
            flex flex-1 mt-4
          ">
            <Link href="/admin">
              <a aria-label="Admin panel">
                <p className="text-sm font-semibold">Admins</p>
              </a>
            </Link>
          </div> */}
        </div>
      </footer>
    </div >
  )
}