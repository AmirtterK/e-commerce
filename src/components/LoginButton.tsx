"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginDialog from "./LoginDialog";

export default function LoginButton({
  isCompact = true,
}: {
  isCompact?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(isCompact && "lg:hidden", "cursor-pointer")}
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0 border-none bg-transparent shadow-none">
        <DialogTitle></DialogTitle>
        <LoginDialog />
      </DialogContent>
    </Dialog>
  );
}
