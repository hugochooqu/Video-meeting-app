import { cn } from '@/lib/utils'
import React, { JSX, ReactNode } from 'react'

interface HomeCardProps {
    title: string,
    desc: string,
    icon: JSX.Element,
    handleClick: () => void,
    className?: string,
}
const HomeCard = ({icon, title, desc, handleClick, className}: HomeCardProps) => {
  return (
    <div className={cn('px-4 py-6 flex flex-col justify-between  max-w-[240px] min-h-[240px] rounded-[14px] cursor-pointer ', className)} onClick={handleClick}>
        <div className='flex items-center justify-center rounded-[10px] size-10 glassmorphism'>
            {icon}
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-[20px] font-bold'>{title}</h1>
            <p className='text-sm font-normal text-silver'>{desc}</p>
        </div>
    </div>
  )
}

export default HomeCard