"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthDialog } from "./AuthDialogProvider";

export default function GetStartedButton({
  isCompact = true,
}: {
  isCompact?: boolean;
}) {
    const { openSignup } = useAuthDialog();
  
  return (
     <Button
      size="sm"
       className={cn(
            isCompact ? "lg:inline-flex" : "hidden",
            "cursor-pointer"
          )}
      onClick={openSignup}
    >
      <span>Get Started</span>
    </Button>
  );
}
