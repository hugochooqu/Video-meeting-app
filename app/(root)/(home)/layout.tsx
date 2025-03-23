import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import StreamVideoProvider from '@/providers/StreamClientProviders'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Vidz",
  description: "Video calling app",
};

const RootLayout = ({children} : {children : ReactNode }) => {
  return (
    <main className='relative'>
      
        <Navbar />

        <div className='flex'>
            <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col pb-6 px-6 pt-28 max-md:pb-14 sm:px-14 '>
                <div className='w-full'>
                   {children}
                </div>
            </section>
        </div>
        
    </main>
  )
}

export default RootLayout