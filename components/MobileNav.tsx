'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MobileNav = ({ user }: MobileNavProps) => {
    const pathname = usePathname();

  return (
    <section className="w-full max-w-66">
        <Sheet>
          <SheetTrigger>
            <Image
                src='/icons/hamburger.svg'
                alt="menu"
                width={34}
                height={34}
                className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent 
            side="left"
            className='border-none bg-white'
          >
            <Link
                href='/'
                className='cursor-pointer flex items-center gap-1.5 px-4 mx-2 mt-4'
            >
              <Image
                 src='/icons/logo.svg'
                 alt='Horizon logo'
                 width={32}
                 height={32}
              />
              <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>

            <div className="mobilenav-sheet mx-4">
                <SheetClose>
                    <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
                            return (
                                <SheetClose key={link.route}>
                                    <Link
                                        key={link.label}
                                        href={link.route}
                                        className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient': isActive})}
                                        >
                                        <Image
                                            src={link.imgURL}
                                            alt={link.label}
                                            width={20}
                                            height={20}
                                            className={cn({'brightness-[3] invert-0': isActive})}
                                        />
                                        <p className={cn('text-16 font-semibold text-black-2', {'text-white': isActive })}>
                                            {link.label}
                                        </p>
                                    </Link>
                                </SheetClose>
                            )
                        })}

                        USER
                    </nav>
                </SheetClose>
                FOOTER
            </div>
          </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
