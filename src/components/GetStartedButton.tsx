"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SignUpDialog from "./SignUpDialog";

export default function SignInButton({
  isCompact = true,
}: {
  isCompact?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(
            isCompact ? "lg:inline-flex" : "hidden",
            "cursor-pointer"
          )}
        >
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0 border-none bg-transparent shadow-none">
        <DialogTitle></DialogTitle>
        <SignUpDialog />
      </DialogContent>
    </Dialog>
  );
}
