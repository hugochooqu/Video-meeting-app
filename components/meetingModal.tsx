import React, { JSX, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  icon?: JSX.Element;
  buttonIcon?: JSX.Element;
}
const MeetingModal = ({
  isOpen,
  onClose,
  title,
  buttonText,
  className,
  children,
  handleClick,
  icon,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-charcoal px-6 py-9 text-white'>
        <div className="flex flex-col gap-6">
          {icon && (
            <div className="flex justify-center">
              {icon}
            </div>
          )}
          <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
          {children}
          <Button className="bg-silver focus-visible:ring focus-visible:ring-offset-0 text-black border-none" onClick={handleClick}>
            {buttonIcon && <div>{buttonIcon}</div>}
            &nbsp;
            {buttonText || 'Schedule meeting' }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
