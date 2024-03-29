import SideBar from "@/app/components/sideBar/SideBar";



export default async function UsersLayout({
    children
}: {children: React.ReactNode}) {
    return (
        // @ts-expect-error Server Component
        <SideBar >
            <div className={'h-full'}>
                {children}
            </div>
        </SideBar>
    )
}