"use client"
import React from "react";
import {User} from "@prisma/client";
import Image from "next/image";

interface AvatarProps {
    user?: User
}
const Avatar: React.FC<AvatarProps> = ({user})=>  {
    console.log(user?.name)
    return(
        <div>
            <div
                className={`
                    relative inline-block rounded-full overflow-hidden
                    h-9 w-9 md:h-11 md:w-11 
                `}
            >

                <Image fill src={user?.image || '/images/placeholder.png'} alt={'Avatar'} />

                <p>{user?.name}</p>
            </div>

        </div>
    )
}

export default Avatar