'use client'

import React, {useEffect} from 'react'
import { useAuth } from '@/actions/user.action'
import { redirect } from 'next/navigation'
import { FaDotCircle } from 'react-icons/fa'
import MeetingTypeList from '@/components/meetingTypeList'
import { setCookie } from 'cookies-next'
import Loader from '@/components/Loader'
import { useGetCalls } from '@/hooks/useGetCalls'
import { Call } from '@stream-io/video-react-sdk'


const Home = () => {
    const {user, loading} = useAuth()
    const {upcomingCalls} = useGetCalls()

    useEffect(() => {
        if (!loading && !user) {
            redirect('/sign-in')
        }
    }, [user, loading])
   
    console.log(user)
      setCookie('userId', user?.uid, { path: "/", secure: true, sameSite: "strict" } )
    
    if (loading) {
        return <Loader />
    }

    const now = new Date()

    const time = now.toLocaleTimeString('it-IT', {hour: "2-digit", minute: "2-digit"});
    const date = now.toLocaleDateString([], {month: 'short', day:'numeric', year:'numeric'})
  return (
    <section className='flex size-full flex-col gap-10'>
        <div className='flex flex-col lg:flex-row gap-4'>
            
            <div className='flex flex-col  w-full lg:w-1/2  '>
                <div className='flex flex-col gap-2 h-[300px] rounded-[20px] bg-charcoal p-10'>
                    <h1 className='text-2xl font-semibold'>Welcome,</h1>
                    <p className='text-4xl font-bold text-white'>{user?.displayName}</p>
                    <p className='tracking-wide text-silver text-lg pt-20 flex flex-row gap-2'>{time} <span className='!text-white tex-2xl'>|</span>{date}</p>
                </div>
                <div className='flex flex-col p-10 overflow-hidden '>
                    <h1 className='text-2xl font-bold'>Upcoming meetings</h1>
                    
                    <div className='flex flex-col pt-8'>
                        {upcomingCalls && upcomingCalls.length > 0 ? (
                            upcomingCalls.map((meeting : Call) => (
                                <p key={(meeting as Call).id}>
                                    {(meeting as Call).state?.custom?.description || 'No description'}
                                    &nbsp;
                                    {(meeting as Call).state?.startsAt?.toLocaleString()}
                                </p>
                            ))
                        ) : (
                            <h1>No upcoming calls</h1>
                        ) }
                    </div>
                    
                </div>
                
            </div>
            
            <div className='w-1/2'>
                <MeetingTypeList />
            </div>
        </div>
      </section>
  )
}

export default Home