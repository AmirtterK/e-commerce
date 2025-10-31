"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthDialog } from "./AuthDialogProvider";

export default function SignInButton({
  isCompact = true,
}: {
  isCompact?: boolean;
}) {
  const { openSignIn } = useAuthDialog();

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(isCompact && "lg:hidden", "cursor-pointer")}
      onClick={openSignIn}
    >
      Sign In
    </Button>
  );
}