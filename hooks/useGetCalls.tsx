
import { useAuth } from "@/actions/user.action"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls , setCalls] = useState<Call[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const client = useStreamVideoClient()
    const {user} = useAuth()

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.uid) return

            setIsLoading(true)

            try {
                const {calls} = await client.queryCalls({
                    sort: [{field: 'starts_at', direction: -1}],
                    filter_conditions: {
                        starts_at: {$exists: true},
                        $or: [
                            {created_by_user_id: user.uid}, 
                            {members: {$in : [user.uid]}}
                        ]
                    }
                })
                setCalls(calls)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        loadCalls()
    }, [client, user?.uid])

    const now = new Date();

    const endedCalls = calls.filter(({state: {startsAt, endedAt}} : Call) => {
        return(startsAt && new Date(startsAt) < now || !!endedAt)
    })

    const upcomingCalls = calls.filter(({state : {startsAt}} : Call) => {
        return startsAt && new Date(startsAt) > now
    })

    return {endedCalls, upcomingCalls, isLoading, callRecordings: calls}
}