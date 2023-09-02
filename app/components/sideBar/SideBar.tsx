import DesktopSidebar from "@/app/components/sideBar/DesktopSidebar";
import MobileFooter from "@/app/components/sideBar/MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function SideBar({
    children
}: {children: React.ReactNode}) {
    const currentUser = await getCurrentUser();
     return (
         <div className={'h-full'}>
             <DesktopSidebar currentUser={currentUser!} />
             <MobileFooter currentUser={currentUser!} />
             <div className={'lg:pl-20 h-full'}>
                 {children}
             </div>
         </div>
     )
}