import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within the streamcall component");
  }

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable(), call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  const VideoDisabled = () => (
    <div className="m-0 flex items-center justify-center bg-gray-800 text-white">
      Video is disabled
    </div>
  );

  return (
    <div className="flex h-screen  flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      
      <VideoPreview
        
        className={
          videoDisabled ? "w-[300px] h-[200px]" : "w-[600px] h-[400px]"
        }
        DisabledVideoPreview={VideoDisabled}
      />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <Button
        className="rounded-md bg-white px-4 py-2.5 text-black"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
