import DesktopSidebar from "@/app/components/sideBar/DesktopSidebar";

export default async function SideBar({
    children
}: {children: React.ReactNode}) {
     return (
         <div className={'h-full'}>
             <DesktopSidebar />
             <div className={'lg:pl-20 h-full'}>
                 {children}
             </div>
         </div>
     )
}