"use client";

import {
  IconLogout,
  IconShoppingCart,
  IconUserCircle,
} from "@tabler/icons-react";

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

import { useUser, useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavUser({ isScrolled = false }: { isScrolled?: boolean }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <div
            className={cn(
              "text-accent-foreground block duration-150 transition-all duration-300",
              isScrolled && "hidden"
            )}
          >
            {/* <div className="text-accent-foreground block duration-150"> */}
            {user.firstName || user.username}
          </div>
          <Avatar className="h-8 w-8 rounded-lg ">
            <AvatarImage src={user.imageUrl} alt={"Profile"} />
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-background"
        side={"bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal ">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.imageUrl} alt={"profile"} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.firstName || user.username}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <IconUserCircle />
            Account
          </DropdownMenuItem>

          <Link href={"/cart"}>
            <DropdownMenuItem className="cursor-pointer">
              <IconShoppingCart />
              Cart
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
