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

export default function SignupButton({
  isCompact = true,
}: {
  isCompact?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={cn(isCompact && "lg:hidden", "cursor-pointer")}
        >
          <span>Sign Up</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0 border-none bg-transparent shadow-none">
        <DialogTitle></DialogTitle>

        <SignUpDialog />
      </DialogContent>
    </Dialog>
  );
}
