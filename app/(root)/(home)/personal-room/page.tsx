'use client'

import { useAuth } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-bold text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-medium max-sm:max-w-[320px] lg:text-lg">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useAuth();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.uid;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;
  
    try {
      // Create a new call if it doesn't exist
      const newCall = client.call("default", meetingId!);
  
      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }
  
      // Navigate to the meeting
      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      console.error("Failed to create or join call:", error);
      toast({
        title: "Failed to start meeting",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-xl font-bold lg:text-3xl">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.displayName}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-charcoal" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dimgray"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
}

export default PersonalRoom