"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Terminal, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import Link from  "next/link";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    try {
      setIsLoading(true);

      await authClient.signIn.social({
        provider: "github",
        callbackURL: window.location.origin,
      });
    } catch (error) {
      console.error("GitHub login failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:px-10">
        {/* Navbar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Terminal className="h-4 w-4 text-zinc-200" />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight text-zinc-100">
                Orbital CLI
              </p>
              <p className="text-[11px] text-zinc-500">
                Developer platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-xs text-zinc-500 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Authentication service operational
          </div>
        </header>

        {/* Main */}
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="grid w-full max-w-5xl items-center gap-16 lg:grid-cols-[1fr_420px]">
            {/* Left */}
            <section className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Secure device authentication
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] text-zinc-50 sm:text-5xl">
                Connect your terminal
                <br />
                <span className="text-zinc-500">to Orbital.</span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Sign in to authorize Orbital CLI on your machine. Your
                account lets the CLI securely access your Orbital workspace
                without storing your GitHub credentials locally.
              </p>

              {/* Terminal preview */}
              <div className="mt-10 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0d0f] shadow-2xl shadow-black/20">
                <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="ml-2 text-[11px] text-zinc-600">
                    terminal
                  </span>
                </div>

                <div className="p-5 font-mono text-sm">
                  <div>
                    <span className="text-indigo-400">$</span>{" "}
                    <span className="text-zinc-300">orbit login</span>
                  </div>

                  <div className="mt-3 text-zinc-500">
                    Waiting for browser authentication...
                  </div>

                  <div className="mt-2 text-zinc-600">
                    › Open Orbital and authorize this device
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-zinc-400" />
                  Secure authentication
                </div>

                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-zinc-400" />
                  CLI device flow
                </div>
              </div>
            </section>

            {/* Login Card */}
            <section className="w-full">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-2xl shadow-black/30">
                <div className="mb-8">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                    <Image
                      src="/github.svg"
                      alt="GitHub"
                      width={22}
                      height={22}
                      className="dark:invert"
                    />
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
                    Sign in to Orbital
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    Use your GitHub account to continue and authorize your
                    CLI session.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleGithubLogin}
                  disabled={isLoading}
                  className="h-11 w-full rounded-lg bg-zinc-100 font-medium text-zinc-950 hover:bg-white"
                >
                  {isLoading ? (
                    "Connecting..."
                  ) : (
                    <>
                      <Github className="mr-2 h-4 w-4" />
                      Continue with GitHub
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </>
                  )}
                </Button>
                <Link
               href="/docs"
               className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                <BookOpen className="h-4 w-4" />
                 View Documentation
               </Link>

                <div className="my-7 flex items-center gap-3">
                  <div className="h-px flex-1 bg-zinc-800" />
                  <span className="text-[11px] uppercase tracking-wider text-zinc-600">
                    Device authentication
                  </span>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-xs text-zinc-400">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-300">
                        Run the CLI
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-600">
                        Start authentication with{" "}
                        <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-zinc-400">
                          orbit login
                        </code>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-xs text-zinc-400">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-300">
                        Sign in here
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-600">
                        Authenticate with your GitHub account.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-xs text-zinc-400">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-300">
                        Authorize your device
                      </p>
                      <p className="mt-1 text-xs leading-5 text-zinc-600">
                        Confirm the device code shown by Orbital CLI.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-[11px] leading-5 text-zinc-600">
                By continuing, you authorize Orbital CLI to access your
                account through the device authentication flow.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col gap-2 border-t border-zinc-900 pt-5 text-[11px] text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Orbital CLI</span>
          <span>Secure authentication · Device flow</span>
        </footer>
      </div>
    </div>
  );
}