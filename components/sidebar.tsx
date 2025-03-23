'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between items-center bg-charcoal p-6 pt-24 text-white max-sm:hidden lg:w-[264px]'>
        <div className='flex flex-col flex-1 gap-4'>
            {sidebarLinks.map((link) => {
                const isActive = pathname === link.route;

                return(
                    <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-3  rounded-lg justify-start', {'bg-dimgray' : isActive})}>
                        <>{link.icon}</>
                        <p className='text-lg font-semibold max-lg:hidden'>
                            {link.label}
                        </p>
                    </Link>
                )
            })}
        </div>
    </section>
  )
}

export default Sidebar