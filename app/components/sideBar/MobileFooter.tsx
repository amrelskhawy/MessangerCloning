"use client"
import useRoutes from "@/app/hooks/useRoutes";
import useConversation from "@/app/hooks/useConversation";
import MobileItem from "@/app/components/sideBar/MobileItem";
import {User} from "@prisma/client";
interface MobileFooterProps {
    currentUser: User
}
const MobileFooter: React.FC<MobileFooterProps> = ({currentUser}) =>  {
    const routes = useRoutes()
    const {isOpen} = useConversation()

    if (isOpen) {
        return null
    }

    return(
        <div
            className={`
                fixed
                flex
                justify-between
                w-full
                bottom-0
                z-40
                items-center
                bg-white
                border-t-[1px]
                lg:hidden
            `}
        >
            {routes.map(item => (
                <MobileItem
                    href={item.href}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                    key={item.label} />
            ))}
        </div>
    )
}


export default MobileFooter