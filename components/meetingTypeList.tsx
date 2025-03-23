"use client";

import { FaPlusSquare } from "react-icons/fa";
import HomeCard from "./homeCard";
import { FaCalendar, FaUserPlus, FaVideo } from "react-icons/fa6";
import {  useRouter } from "next/navigation";
import { useState } from "react";
import MeetingModal from "./meetingModal";
import { useAuth } from "@/actions/user.action";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker'
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const { toast } = useToast();

  const router = useRouter();

  const { user } = useAuth();
  const client = useStreamVideoClient();
 

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Please select a date and time",
        });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "Meeting created",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
  return (
    <section className="grid grid-col-1 md:grid-cols-2 gap-5">
      <HomeCard
        icon={<FaPlusSquare size={20} />}
        title="New meeting"
        desc="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-red-400"
      />
      <HomeCard
        icon={<FaUserPlus size={20} />}
        title="Join Meeting"
        desc="Join a meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-blue-400"
      />
      <HomeCard
        icon={<FaVideo size={20} />}
        title="View Recordings"
        desc="Check out your recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-yellow-400"
      />
      <HomeCard
        icon={<FaCalendar size={20} />}
        title="Schedule meeting"
        desc="Plan a meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        className="bg-green-400"
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-white"
          handleClick={createMeeting}
        >
            <div className="flex flex-col gap-2.5">
                <label className="text-base text-normal leading-[22px] text-sky-2">
                    Add a description
                </label>
                <Textarea className="border-none bg-black focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e) => setValues({...values, description: e.target.value})} />

            </div>
            <div className="flex w-full flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
                    Select a date and time
                </label>
                <ReactDatePicker 
                    selected={values.dateTime}
                    onChange={(date) => setValues({...values, dateTime: date!})}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat='MMMM d, yyyy h:mm aa'
                    className="w-full rounded bg-black p-2 focus:outline-none"
                />
            </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-white text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink)
            toast({title: 'Link copied'})
          }}
           
          buttonText="Copy Meeting Link"
        />
      )}

<MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-black focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start a new meeting"
        buttonText="Start meeting"
        className="text-white"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
