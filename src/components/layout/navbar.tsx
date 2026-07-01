"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { user } from "@/data/user";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation"><Menu size={20} /></Button>
        </SheetTrigger>
        <SheetContent><Sidebar /></SheetContent>
      </Sheet>
      <div className="relative max-w-xl flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} />
        <Input className="pl-10" placeholder="Search projects, deployments, logs..." />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications"><Bell size={19} /></Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Avatar className="h-9 w-9">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>KM</AvatarFallback>
      </Avatar>
    </header>
  );
}
