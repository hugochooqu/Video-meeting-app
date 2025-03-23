'use client'

import Link from 'next/link'
import React from 'react'
import { FaVideo } from 'react-icons/fa6'
import MobileNav from './mobileNav'

const Navbar = () => {

  return (
    <nav className='flex justify-between fixed z-50 w-full bg-charcoal px-6 py-4 lg:px-10 '>
        <Link href='/' className='flex items-center gap-1'>
            <FaVideo size={24} color='silver' />
            <p className='text-white font-semibold text-2xl max-sm:hidden'>VIDEO APP</p>
        </Link>

        <div className='flex justify-between gap-5'>
            <MobileNav />
        </div>
    </nav>
  )
}

export default Navbar