"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Github,
  Globe,
  KeyRound,
  Laptop,
  LogIn,
  LogOut,
  Search,
  ShieldCheck,
  Terminal,
  Wrench,
  Zap,
} from "lucide-react";

const commands = [
  {
    command: "orbit --help",
    description: "Show all available Orbital CLI commands.",
  },
  {
    command: "orbit login",
    description: "Authenticate the CLI using the Orbital device authorization flow.",
  },
  {
    command: "orbit login --help",
    description: "Show login options and configuration.",
  },
  {
    command: "orbit whoami",
    description: "Display the currently authenticated user.",
  },
  {
    command: "orbit logout",
    description: "Log out and clear stored credentials.",
  },
  {
    command: "orbit wakeup",
    description: "Start Orbital CLI and access the AI interface.",
  },
  {
    command: "orbit wakeup --help",
    description: "Show options available for the wakeup command.",
  },
];

const tools = [
  {
    icon: Search,
    name: "Google Search",
    description:
      "Give the AI access to current information from Google Search.",
  },
  {
    icon: Code2,
    name: "Code Execution",
    description:
      "Allow the AI to execute code for calculations, programming tasks, and problem solving.",
  },
  {
    icon: Globe,
    name: "URL Context",
    description:
      "Allow the AI to analyze URLs supplied in the conversation.",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Top navigation */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-500/30">
              <Terminal className="h-5 w-5 text-indigo-400" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Orbital CLI
              </p>
              <p className="text-[11px] text-zinc-500">Documentation</p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-400 transition hover:border-zinc-700 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orbital
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-zinc-800 px-6 py-8 lg:block">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Documentation
          </p>

          <nav className="space-y-1 text-sm">
            <a
              href="#getting-started"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Getting Started
            </a>

            <a
              href="#installation"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Installation
            </a>

            <a
              href="#authentication"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Authentication
            </a>

            <a
              href="#commands"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Commands
            </a>

            <a
              href="#modes"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              AI Modes
            </a>

            <a
              href="#tools"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Tools
            </a>

            <a
              href="#workflow"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Complete Workflow
            </a>

            <a
              href="#troubleshooting"
              className="block rounded-lg px-3 py-2 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            >
              Troubleshooting
            </a>
          </nav>
        </aside>

        {/* Main documentation */}
        <article className="min-w-0 flex-1 px-6 py-12 sm:px-10 lg:px-16">
          {/* Hero */}
          <section id="getting-started" className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
              <BookOpen className="h-3.5 w-3.5" />
              Orbital CLI Documentation
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Build, explore and interact with AI
              <span className="text-indigo-400"> from your terminal.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Orbital CLI is a command-line AI tool that gives you access to
              multiple AI interaction modes directly from your terminal.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
              >
                Open Orbital
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#installation"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900"
              >
                Get Started
              </a>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<Laptop className="h-5 w-5" />}
              title="Installation"
            />

            <p className="mt-4 text-zinc-400">
              Once Orbital CLI is available on your machine, verify that the
              CLI is installed correctly by running:
            </p>

            <CodeBlock>orbit --help</CodeBlock>

            <p className="mt-4 text-sm text-zinc-500">
              You should see the Orbital CLI banner and available commands.
            </p>
          </section>

          {/* Authentication */}
          <section id="authentication" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Authentication"
            />

            <p className="mt-4 leading-7 text-zinc-400">
              Orbital CLI uses device-flow authentication. Your CLI session is
              connected to your Orbital account without requiring you to enter
              your GitHub credentials inside the terminal.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Step
                number="01"
                icon={<Github className="h-5 w-5" />}
                title="Sign in"
                description="Authenticate on the Orbital website using GitHub."
              />

              <Step
                number="02"
                icon={<Terminal className="h-5 w-5" />}
                title="Run orbit login"
                description="Start the device authorization flow from your terminal."
              />

              <Step
                number="03"
                icon={<Check className="h-5 w-5" />}
                title="Approve"
                description="Open the displayed URL and approve the requesting device."
              />
            </div>

            <h3 className="mt-10 text-xl font-semibold text-white">
              Start authentication
            </h3>

            <CodeBlock>orbit login</CodeBlock>

            <p className="mt-5 text-zinc-400">
              Orbital will display a device authorization URL and a user code.
              Open the URL in your browser and enter the provided code.
            </p>

            <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
              <div className="flex gap-3">
                <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-indigo-400" />

                <div>
                  <p className="font-medium text-indigo-200">
                    Keep your authorization code private
                  </p>

                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    Only approve a device authorization request that you
                    initiated yourself.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Commands */}
          <section id="commands" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<Terminal className="h-5 w-5" />}
              title="Command Reference"
            />

            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
              {commands.map((item, index) => (
                <div
                  key={item.command}
                  className={`p-5 ${
                    index !== commands.length - 1
                      ? "border-b border-zinc-800"
                      : ""
                  }`}
                >
                  <code className="rounded-md bg-zinc-900 px-2 py-1 font-mono text-sm text-indigo-300">
                    {item.command}
                  </code>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Modes */}
          <section id="modes" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<Bot className="h-5 w-5" />}
              title="AI Modes"
            />

            <p className="mt-4 text-zinc-400">
              Run the CLI and choose the interaction mode that fits your task.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ModeCard
                icon={<Zap className="h-5 w-5" />}
                title="Chat"
                description="Simple conversational interaction with the AI."
              />

              <ModeCard
                icon={<Wrench className="h-5 w-5" />}
                title="Tool Calling"
                description="Give the AI access to external tools such as search, code execution and URL context."
              />

              <ModeCard
                icon={<Bot className="h-5 w-5" />}
                title="Agentic Mode"
                description="Allow the AI to work through more complex tasks using an agentic workflow."
              />
            </div>

            <CodeBlock>orbit wakeup</CodeBlock>
          </section>

          {/* Tools */}
          <section id="tools" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<Wrench className="h-5 w-5" />}
              title="Available Tools"
            />

            <p className="mt-4 text-zinc-400">
              Tool Calling Mode currently provides the following tools.
            </p>

            <div className="mt-8 space-y-3">
              {tools.map((tool) => {
                const Icon = tool.icon;

                return (
                  <div
                    key={tool.name}
                    className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5 transition hover:border-zinc-700"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-indigo-400 ring-1 ring-zinc-800">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-medium text-white">{tool.name}</h3>

                      <p className="mt-1 text-sm leading-6 text-zinc-400">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <p className="text-sm leading-6 text-zinc-400">
                <span className="font-medium text-amber-300">
                  Note about Code Execution:
                </span>{" "}
                availability depends on the selected Google Gemini model. If
                the configured model does not support code execution, the AI
                SDK will report that the tool is unsupported.
              </p>
            </div>
          </section>

          {/* Workflow */}
          <section id="workflow" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<ArrowRight className="h-5 w-5" />}
              title="Complete Setup Workflow"
            />

            <div className="mt-8 space-y-3">
              <WorkflowStep
                number="1"
                title="Create your Orbital account"
                description="Open the Orbital website and authenticate using GitHub."
              />

              <WorkflowStep
                number="2"
                title="Open your terminal"
                description="Make sure the orbit command is available."
              />

              <WorkflowStep
                number="3"
                title="Authenticate the CLI"
                description="Run orbit login and follow the device authorization instructions."
                code="orbit login"
              />

              <WorkflowStep
                number="4"
                title="Approve your device"
                description="Open the provided browser URL, enter the displayed user code and approve the device."
              />

              <WorkflowStep
                number="5"
                title="Start Orbital"
                description="Launch the AI interface."
                code="orbit wakeup"
              />

              <WorkflowStep
                number="6"
                title="Choose your mode"
                description="Select Chat, Tool Calling or Agentic Mode."
              />
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="mt-20 max-w-4xl">
            <SectionTitle
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Troubleshooting"
            />

            <div className="mt-8 space-y-4">
              <Trouble
                title="orbit command is not recognized"
                solution="Make sure Orbital CLI is installed correctly and that its executable is available in your system PATH."
              />

              <Trouble
                title="You are already logged in"
                solution="Run orbit logout first, then run orbit login again."
                code="orbit logout\norbit login"
              />

              <Trouble
                title="Device authorization is not working"
                solution="Make sure the authorization URL points to the correct Orbital server and that the website is reachable from your browser."
              />

              <Trouble
                title="A tool is not supported by the selected model"
                solution="Check the configured Gemini model and whether it supports the requested tool. Not every Gemini model supports every tool."
              />
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-24 border-t border-zinc-800 py-8">
            <div className="flex flex-col justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
              <p>Orbital CLI Documentation</p>

              <Link
                href="/"
                className="flex items-center gap-1 text-zinc-400 hover:text-white"
              >
                Back to Orbital
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}

/* ---------------- Components ---------------- */

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
        {icon}
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-[#050506]">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <span className="text-xs text-zinc-600">Terminal</span>
      </div>

      <pre className="overflow-x-auto p-5 text-sm">
        <code className="font-mono text-zinc-200">{children}</code>
      </pre>
    </div>
  );
}

function Step({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-600">{number}</span>

        <div className="text-indigo-400">{icon}</div>
      </div>

      <h3 className="mt-5 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
    </div>
  );
}

function ModeCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
        {icon}
      </div>

      <h3 className="mt-5 font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  description,
  code,
}: {
  number: string;
  title: string;
  description: string;
  code?: string;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950/40 p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-400 ring-1 ring-indigo-500/20">
        {number}
      </div>

      <div className="min-w-0">
        <h3 className="font-medium text-white">{title}</h3>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>

        {code && (
          <pre className="mt-3 overflow-x-auto rounded-lg bg-black p-3 text-sm">
            <code className="font-mono text-indigo-300">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

function Trouble({
  title,
  solution,
  code,
}: {
  title: string;
  solution: string;
  code?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 p-5">
      <h3 className="font-medium text-white">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">{solution}</p>

      {code && (
        <pre className="mt-4 overflow-x-auto rounded-lg bg-black p-4 text-sm">
          <code className="font-mono text-indigo-300">{code}</code>
        </pre>
      )}
    </div>
  );
}