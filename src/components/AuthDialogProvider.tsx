"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import SignUpDialog from "./SignUpDialog";
import SignInDialog from "./SignInDialog";

type AuthDialogType = "signin" | "signup" | null;

interface AuthDialogContextType {
  openSignIn: () => void;
  openSignup: () => void;
  closeDialog: () => void;
}

const AuthDialogContext = createContext<AuthDialogContextType | undefined>(undefined);

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [dialogType, setDialogType] = useState<AuthDialogType>(null);

  const openSignIn = () => setDialogType("signin");
  const openSignup = () => setDialogType("signup");
  const closeDialog = () => setDialogType(null);

  return (
    <AuthDialogContext.Provider value={{ openSignIn, openSignup, closeDialog }}>
      {children}
      
      <Dialog open={dialogType !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-lg p-0 border-none bg-transparent shadow-none">
          <DialogTitle className="sr-only">
            {dialogType === "signup" ? "Sign Up" : "signin"}
          </DialogTitle>

          {dialogType === "signup" ? (
            <SignUpDialog onSwitchToSignIn={openSignIn} />
          ) : dialogType === "signin" ? (
            <SignInDialog onSwitchToSignUp={openSignup} />
          ) : null}
        </DialogContent>
      </Dialog>
    </AuthDialogContext.Provider>
  );
}

export function useAuthDialog() {
  const context = useContext(AuthDialogContext);
  if (!context) {
    throw new Error("useAuthDialog must be used within AuthDialogProvider");
  }
  return context;
}