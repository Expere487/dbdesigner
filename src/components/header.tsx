"use client";
import Link from "next/link";
import Participants from "@/components/participants";
import TemplateSwitcher from "@/components/template-switcher";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import ThemeToggle from "@/components/theme-toggle";
import { LogoWithoutText } from "./common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { runAllExamples } from "@/lib/sql-converter-examples";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./dropdown-menu";
import { signOut } from "@/lib/supabase/auth/action";

export default function Header() {
  return (
    <header className="w-full">
      <div className="border border-border/80  bg-background backdrop-blur-md h-12 md:h-16 flex justify-between items-center gap-2 px-4 shadow-lg/2">
        {/* Left area */}
        <div className="flex-1 flex items-center gap-4">
          <Link className="inline-flex" href="/">
            <LogoWithoutText className="size-12" />
          </Link>
          <div>
            <TemplateSwitcher />
          </div>
        </div>
        {/* Center area */}
        <div className="grow flex justify-center">
        </div>
        {/* Right area */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="text-sm rounded-lg" onClick={() => runAllExamples()}>
            Share Or Invite
          </Button>
          <Separator orientation="vertical" className="min-h-6 max-sm:hidden" />
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-10">
                <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => {
                signOut()
              }}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}
