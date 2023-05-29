"use client"

import Link from "next/link"
import clsx from "clsx";
interface MobileItemProps {
    icon: any
    href: string
    onClick?: () => void
    active?: boolean
}

const MobileItem: React.FC<MobileItemProps>  = ({
    icon:  Icon,
    href,
    onClick,
    active
}) => {

    const handleClick = () => {
        if ( onClick ) {
            return onClick();
        }
    }
    return(
            <Link onClick={handleClick} href={href}
                  className={clsx(`
                        group
                        flex
                        gap-x-3
                        rounded-md
                        p-4
                        leading-6
                        text-sm
                        w-full
                        justify-center
                        font-semibold
                        text-gray-500
                        hover:text-black
                        hover:bg-gray-100
                    `,
                      active && 'text-black bg-gray-100'
                  )
                  }
            >
                <Icon className={"h-6 w-6 shrink-0"} />
            </Link>
    )
}

export default MobileItem