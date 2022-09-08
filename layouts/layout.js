import Link from 'next/link'
import { slugify } from '../utils/helpers'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { navItemLength } from '../ecommerce.config'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { FiShoppingCart, FiUser, FiSearch, FiGrid, FiMenu, FiX } from "react-icons/fi";
import { useState } from 'react'


export default function Layout({ children, categories, prohibitRoutes }) {

  const [isMenuVisible, setMenuVisiblity] = useState(false)

  function onMenuClick() {
    setMenuVisiblity(prev => !prev)
  }


  const router = useRouter()

  if (categories.length > navItemLength) {
    categories = categories.slice(0, navItemLength)
  }

  if (prohibitRoutes.includes(router.asPath)) {
    return <main className="w-fw">{children}</main>
  }

  return (
    <div>

      <div style={{ display: isMenuVisible ? 'block' : "none" }} className='bg-white top-0 left-0 fixed z-40 w-screen h-screen pt-20 transition-all overscroll-contain'>
        <div className=' flex-1 items-center flex flex-col h-full'>

          <Link passHref href={`/categories`}>
            <p className="text-center text-md py-3  w-full font-bold">My Account</p>
          </Link>

          <Link passHref href={`/categories`}>
            <p className="text-center text-md py-3  w-full font-bold">Categories</p>
          </Link>

          <Link passHref href={`/categories`}>
            <p className="text-center text-md py-3  w-full font-bold"> Contact Us</p>
          </Link>

          <Link passHref href={`/categories`}>
            <p className="text-center text-md py-3  w-full font-extrabold"> Refund Policies</p>
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
            <div className=' flex-1 items-center px-5 hidden lg:flex'>

              {
                categories.map((category, index) => (
                  <Link
                    href={`/category/${slugify(category)}`}
                    key={index}
                  >
                    <a aria-label={category}>
                      <p className="sm:mr-8 sm:mb-0 mb-4  text-smaller mr-4" >
                        {category}
                      </p>
                    </a>
                  </Link>
                ))
              }

              <Link href={`/categories`}>
                <a aria-label={'home'}>
                  <p className="sm:mr-8 sm:mb-0 mb-4 text-left text-smaller mr-4 text-blue-500">Categories</p>
                </a>
              </Link>

            </div>

            <div className=' flex-1 items-center justify-end h-full flex '>

              <Link href="/search">
                <div className=" flex items-center justify-center justify-self-end  h-full p-3 text-gray-600  cursor-pointer">
                  <a aria-label="Home">
                    <FiSearch size={22} />
                  </a>
                </div>
              </Link>

              <Link href="/cart">
                <div className=" flex items-center justify-center justify-self-end  h-full p-3 text-gray-600  cursor-pointer">
                  <a aria-label="Home">
                    <FiShoppingCart size={22} />
                  </a>
                </div>
              </Link>


              <Link href="/auth">
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
      </nav >

      <div className="mobile:px-10 px-4 pb-10 flex justify-center">
        <main className="w-fw pt-12">{children}</main>
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
      <ToastContainer autoClose={3000} />
    </div >
  )
}