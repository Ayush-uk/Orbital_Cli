"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Terminal,
  Github,
  CheckCircle2,
  Copy,
  ExternalLink,
  LogOut,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.replace("/sign-in");
    }
  }, [isPending, data, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#09090b]">
        <Spinner className="h-5 w-5 text-zinc-400" />
      </div>
    );
  }

  if (!data?.session || !data?.user) {
    return null;
  }

  const copyCommand = async () => {
    await navigator.clipboard.writeText("orbit login");
    toast.success("Command copied");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Terminal className="h-4 w-4" />
            </div>

            <span className="text-sm font-semibold">Orbital CLI</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-500 hover:text-zinc-200"
            onClick={() =>
              authClient.signOut({
                fetchOptions: {
                  onSuccess: () => router.replace("/sign-in"),
                },
              })
            }
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Welcome */}
        <div className="flex flex-col justify-between gap-6 border-b border-zinc-900 pb-10 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Authentication active
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome, {data.user.name || "there"}.
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Your Orbital CLI account is ready to use.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3">
            {data.user.image ? (
              <img
                src={data.user.image}
                alt={data.user.name || "User"}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-800" />
            )}

            <div>
              <p className="text-xs font-medium text-zinc-200">
                {data.user.name}
              </p>
              <p className="text-[11px] text-zinc-600">
                {data.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Setup section */}
        <div className="grid gap-6 py-10 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Connect Orbital CLI</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Follow these steps to authenticate your local terminal.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              {/* Step 1 */}
              <div className="border-b border-zinc-800 p-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs font-medium text-zinc-400">
                    01
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-zinc-200">
                      Open your terminal
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                      Make sure Orbital CLI is installed and available in your
                      terminal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border-b border-zinc-800 p-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs font-medium text-zinc-400">
                    02
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-zinc-200">
                      Start device authentication
                    </h3>

                    <p className="mt-1 text-xs text-zinc-600">
                      Run the following command:
                    </p>

                    <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-800 bg-[#0d0d0f] px-4 py-3">
                      <code className="font-mono text-sm text-zinc-300">
                        <span className="text-indigo-400">$</span> orbit login
                      </code>

                      <button
                        onClick={copyCommand}
                        className="text-zinc-600 transition hover:text-zinc-300"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6">
                <div className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs font-medium text-zinc-400">
                    03
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-200">
                      Authorize the device
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                      Follow the authorization prompt shown by Orbital CLI.
                      Only approve devices that you initiated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Account sidebar */}
          <aside className="space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium">
                  Authentication status
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Session active
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 text-zinc-400" />

                <div>
                  <p className="text-xs text-zinc-500">Connected account</p>
                  <p className="mt-1 text-sm text-zinc-200">GitHub</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-xs text-zinc-500">Need help?</p>

              {/* <button  className=" mt-3 flex items-center gap-2 text-sm text-zinc-300 hover:text-white">
                View CLI documentation
                <ExternalLink className="h-3.5 w-3.5" />
              </button> */}
              <Link
  href="/docs"
  className="group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5"
>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
        <BookOpen className="h-5 w-5" />
      </div>

      <div>
        <h2 className="font-semibold text-zinc-100">
          Orbital CLI Documentation
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Learn how to install, authenticate and use Orbital CLI.
        </p>
      </div>
    </div>

    <ArrowRight className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-indigo-400" />
  </div>
</Link>
            </div>
          </aside>
        </div>

        {/* Security note */}
        <div className="border-t border-zinc-900 pt-6">
          <div className="flex gap-3 text-xs leading-5 text-zinc-600">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Orbital uses device authentication so your GitHub credentials
              never need to be entered into the CLI. Never approve an
              authorization request that you did not initiate.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
