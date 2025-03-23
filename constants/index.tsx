import { JSX } from "react";
import { FaHome, FaVideo } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { LuCalendarArrowDown, LuCalendarArrowUp } from "react-icons/lu";

interface SidebarLink {
  label: string;
  route: string;
  icon: JSX.Element; // ReactNode supports JSX elements like <FaHome />
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Home',
    route: '/',
    icon: <FaHome />,
  },
    {
        label: 'Upcoming',
        route: '/upcoming',
        icon: <LuCalendarArrowUp />,
    },
    {
        label: 'Previous',
        route: '/previous',
        icon: <LuCalendarArrowDown />,
    },
    {
        label: 'Recordings',
        route: '/recordings',
        icon: <FaVideo />,
    },
    {
        label: 'Personal Room',
        route: '/personal-room',
        icon: <FaPlus />,
    },
]

export const avatarImages = [
  '/images/avatar-1.jpeg',
  '/images/avatar-2.jpeg',
  '/images/avatar-3.png',
  '/images/avatar-4.png',
  '/images/avatar-5.png',
];