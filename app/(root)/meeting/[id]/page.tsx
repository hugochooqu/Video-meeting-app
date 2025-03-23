'use client'
import { useAuth } from '@/actions/user.action'
import MeetingRoom from '@/components/meetingRoom'
import MeetingSetup from '@/components/meetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, {useState} from 'react'

const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
  const {user, loading} = useAuth()
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const resolvedParams = React.use(params) // Unwrap the params Promise
  const { call, isCallLoading } = useGetCallById(resolvedParams.id)

  if (loading || isCallLoading ) return <p>Loading...</p>

  if(!call) return

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting