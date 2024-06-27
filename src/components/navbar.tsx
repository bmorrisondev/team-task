import * as React from "react"
import Link from "next/link"
import { OrganizationSwitcher, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { MenuIcon } from "lucide-react"
import { metadata } from "@/app/layout"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { FiArrowRight, FiArrowRightCircle, FiBook, FiCalendar, FiHome } from "react-icons/fi"
import ListsList from "./ListsList"

function Navbar() {
  return (
    <nav className="flex p-2 justify-between items-center bg-slate-100 border-b border-slate-200">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger className='lg:hidden'>
            <MenuIcon size={24} />
          </SheetTrigger>
          <SheetContent side='left'>
            <ListsList />
          </SheetContent>
        </Sheet>
        {/* <Menubar className="bg-transparent border-0">
          <MenubarMenu>
            <MenubarTrigger>
              <MenuIcon size={24} />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild>
                <Link href="/">
                  Home
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar> */}
        <div>{ metadata.title as string }</div>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">Sign in</Link>
      </SignedOut>
    </nav>
  )
}

export default Navbar
