import Link from "next/link";
import Participants from "@/components/participants";
import TemplateSwitcher from "@/components/template-switcher";
import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import ThemeToggle from "@/components/theme-toggle";
import { LogoWithoutText } from "./common/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Header() {
  return (
    <header className="fixed top-2 md:top-5 w-full px-2 md:px-5 z-50">
      <div className="border border-border/80 rounded-xl bg-card/80 backdrop-blur-md h-12 md:h-16 flex justify-between items-center gap-2 px-4 shadow-lg/2">
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
          <Button size="sm" className="text-sm rounded-lg">
            Share Or Invite
          </Button>
          <Separator orientation="vertical" className="min-h-6 max-sm:hidden" />
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
