import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const loggedIn = { firstName: 'Krishanu', lastName: 'Bera' };

  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn} />

        <div className="flex size-full flex-col">
            <div className="root-layout">
                <Image
                   src='/icons/logo.svg'
                   alt="logo"
                   width={38}
                   height={38}
                />
                <div className="">
                  <MobileNav user={loggedIn} />
                </div>
            </div>
            {children}
        </div>
    </main>
  );
}