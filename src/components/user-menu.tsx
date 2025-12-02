"use client";

import { ChevronDown, LayoutDashboard, LogIn, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type UserMenuProps = {
  user: Session["user"] | null;
};

const menuItems = {
  ADMIN: [{ label: "Dashboard", icon: Settings, href: "/dashboard" }],
  Teacher: [{ label: "Dashboard", icon: LayoutDashboard, href: "/teacher/dashboard" }],
  USER: [{ label: "Dashboard", icon: LayoutDashboard, href: "/student/dashboard" }],
};

export default function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true }); 
  };

  const getInitials = (name: string | null | undefined): string => {
    return name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U";
  };

  const getAvatarUrl = () => {
    if (user?.image) return user.image;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=6366f1&color=ffffff&size=128`;
  };

  if (!user) {
    return (
      <Button asChild className="gap-2 px-4 py-2 font-medium bg-white border text-black hover:bg-gray-300">
        <Link href="/login">
          <LogIn className="size-4" />
          Sign in
        </Link>
      </Button>
    );
  }

  const currentItems = menuItems[user.role as keyof typeof menuItems] || [];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 px-3 py-2 h-auto hover:bg-accent/50">
          <Avatar className="size-7 rounded-lg ring-1 ring-border/20">
            <AvatarImage src={getAvatarUrl()} alt={user.name || "User"} />
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground text-xs">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="truncate max-w-32 text-sm font-medium">
            {user.name || "User"}
          </div>
          <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 rounded-xl shadow-lg border-border/50 bg-background/95" sideOffset={8} align="end">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar className="size-10 rounded-xl ring-2 ring-border/10">
              <AvatarImage src={getAvatarUrl()} alt={user.name || "User"} />
              <AvatarFallback className="rounded-xl bg-primary text-primary-foreground font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-semibold text-sm">{user.name || "User"}</span>
              <span className="text-muted-foreground truncate text-xs mt-0.5">
                {/* {user.email || user.phone || "No contact info"} */}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="px-1">
          {currentItems.map((item) => (
            <DropdownMenuItem key={item.label} className="gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-accent/50">
              <item.icon className="size-4" />
              <Link href={item.href} className="font-medium text-sm">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="px-1 pb-1">
          <DropdownMenuItem
            className="gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50"
            onClick={handleSignOut}
          >
            <LogOut className="size-4" />
            <span className="font-medium text-sm">Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}