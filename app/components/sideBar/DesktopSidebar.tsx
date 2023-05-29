"use client"

import useRoutes from "@/app/hooks/useRoutes";
import {useState} from "react";
import DesktopItem from "@/app/components/sideBar/DesktopItem";
import {User} from "@prisma/client"
interface DesktopSidebarProps {
    currentUser: User
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({currentUser}) => {
    const routes = useRoutes()
    const [isopen,setIsOpen]
        = useState(false)

    console.log({currentUser})
    return (
        <div
        className={`hidden 
        lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20
        xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px]
        lg:pb-4 lg:flex lg:flex-col justify-between
        `}
        >
            <nav
            className={`
                mt-4 flex flex-col justify-between
            `}
            >
                <ul role={"list"} className={`flex flex-col items-center
                    space-y-1 
                `}>
                    {routes.map(item => (
                        <DesktopItem
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                            key={item.label} />
                    ))}
                </ul>
            </nav>

        </div>
    )
}

export default  DesktopSidebar