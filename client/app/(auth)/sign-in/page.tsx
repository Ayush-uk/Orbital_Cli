"use client";

import { LoginForm } from "@/components/login-form";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && data?.session && data?.user) {
      router.replace("/");
    }
  }, [isPending, data, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <Spinner className="h-5 w-5 text-zinc-400" />
      </div>
    );
  }

  if (data?.session && data?.user) {
    return null;
  }

  return <LoginForm />;
}