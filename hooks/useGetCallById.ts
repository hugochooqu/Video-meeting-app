import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById = ( id : string | string[]) => {
    const [call, setCall] = useState<Call>()
    const [isCallLoading, setIsCallLoading] = useState(true)

    const client = useStreamVideoClient()
    console.log(client)

    useEffect(() => {
        if(!client) return

        console.log(id)

        const loadCall = async () => {
            try {
              const { calls } = await client.queryCalls({
                filter_conditions: {
                  id,
                },
              });
      
              
              if (calls.length > 0) {
                console.log(calls[0])
                setCall(calls[0]);

              } else {
                console.error("No call found with the given ID:", id);
              }
            } catch (error) {
              console.error("Failed to fetch call:", error);
            } finally {
              setIsCallLoading(false);
            }
          };


          loadCall();

    }, [client, id])

    useEffect(() => {
        if (call) {
          console.log("Updated call state:", call); // Log the updated call state
        }

        setIsCallLoading(false)
      }, [call]); // This effect runs whenever `call` changes

    return {call, isCallLoading}
    
}