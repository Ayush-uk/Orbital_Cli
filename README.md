# Orbital CLI

> An AI-powered developer CLI for chat, tool calling, and agentic workflows directly from your terminal.

Orbital CLI brings AI-powered development workflows to the command line. Authenticate securely through the Orbital web application, connect your terminal using device authorization, and interact with AI through multiple execution modes.

## ✨ Features

* 🤖 **AI Chat** — Have conversational AI interactions directly from your terminal.
* 🛠️ **Tool Calling** — Enable AI-powered tools such as Google Search, Code Execution, and URL Context.
* 🧠 **Agentic Mode** — Run agentic workflows designed to handle multi-step tasks.
* 🔐 **Secure Authentication** — Authenticate through GitHub using the Orbital web application.
* 📱 **Device Authorization** — Connect your CLI to your Orbital account without entering GitHub credentials in the terminal.
* 📚 **Developer Documentation** — Built-in documentation covering installation, authentication, commands, AI modes, and troubleshooting.

---

## 🏗️ Architecture

Orbital CLI consists of two primary components:

```text
                    Orbital CLI
                         │
             ┌───────────┴───────────┐
             │                       │
        Web Application          CLI Application
             │                       │
          Next.js                 Node.js
             │                       │
       Better Auth              orbit commands
             │                       │
       GitHub OAuth            Device Flow
             │                       │
             └───────────┬───────────┘
                         │
                    Same Account
```

### Web Application

The web application handles:

* GitHub authentication
* User sessions
* Device authorization
* Device approval
* User dashboard
* Documentation

### CLI Application

The CLI provides:

* Authentication
* Account information
* AI conversations
* Tool calling
* Agentic workflows

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git
* PostgreSQL

You will also need:

* A GitHub OAuth application
* A Google Generative AI API key
* A configured PostgreSQL database

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/orbital-cli.git
cd orbital-cli
```

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL="your-postgresql-connection-string"

BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3005"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

GOOGLE_GENERATIVE_AI_API_KEY="your-google-generative-ai-api-key"

ORBITAI_MODEL="gemini-2.5-flash"
```

> Never commit your `.env` file or expose API keys and OAuth secrets publicly.

The exact environment variables may vary depending on your deployment configuration.

---

# 🔐 Authentication

Orbital CLI uses a browser-based authentication flow instead of asking users to enter their GitHub credentials directly into the terminal.

The authentication flow is:

```text
GitHub Login
     ↓
Orbital Web Application
     ↓
orbit login
     ↓
Device Authorization
     ↓
Open Browser
     ↓
Enter Device Code
     ↓
Approve Device
     ↓
CLI Authenticated
```

### Login

Run:

```bash
orbit login
```

The CLI will provide a device authorization URL and code.

Open the provided URL in your browser, enter the code, and approve the device.

Once approved, the CLI becomes authenticated with your Orbital account.

---

# 💻 CLI Commands

### Display available commands

```bash
orbit --help
```

### Login

```bash
orbit login
```

### Login help

```bash
orbit login --help
```

### Check current account

```bash
orbit whoami
```

### Logout

```bash
orbit logout
```

### Start Orbital AI

```bash
orbit wakeup
```

### Wakeup help

```bash
orbit wakeup --help
```

---

# 🤖 AI Modes

Running:

```bash
orbit wakeup
```

opens the Orbital AI interface.

You can choose between three modes:

### 1. Chat

A straightforward conversational AI experience.

```text
User → AI → Response
```

Use Chat when you need explanations, brainstorming, questions, or general AI assistance.

### 2. Tool Calling

Tool Calling allows the AI to interact with configured external tools.

Current tools include:

* Google Search
* Code Execution
* URL Context

The tool system is designed to allow tools to be enabled or disabled depending on the workflow.

### 3. Agentic Mode

Agentic Mode allows the AI to work through multi-step tasks using an agentic workflow.

Instead of simply responding to a single prompt, the agent can reason through a task and perform multiple operations as required.

---

# 🛠️ Available Tools

Orbital CLI currently supports the following tool integrations:

| Tool           | Description                                       |
| -------------- | ------------------------------------------------- |
| Google Search  | Search the web for relevant information           |
| Code Execution | Execute supported code through the AI tool system |
| URL Context    | Provide URL-based context to the AI               |

Tools are initialized lazily and can be enabled or disabled through the CLI's tool configuration.

> Some tools may depend on model/provider capabilities. If a model does not support a particular tool, that tool may be unavailable.

---

# 🧠 AI Architecture

Orbital CLI uses the Vercel AI SDK together with Google's AI provider.

The AI service supports:

* Streaming responses
* Tool calls
* Tool results
* Multi-step execution
* Structured generation
* Usage tracking
* Finish reasons

The core AI workflow is based around the AI SDK's streaming interface.

```text
User Prompt
     ↓
AI Service
     ↓
Google AI Model
     ↓
┌───────────────┐
│ Text Response │
│ Tool Call     │
│ Tool Result   │
└───────────────┘
     ↓
CLI Output
```

---

# 🌐 Web Application

The Orbital web application is built with Next.js.

Important routes include:

```text
/
├── sign-in
├── device
└── docs
```

### Sign In

Users authenticate using GitHub.

### Device Authorization

The `/device` route is used to approve CLI device authorization requests.

### Documentation

Developer documentation is available at:

```text
/docs
```

The documentation covers:

* Getting Started
* Installation
* Authentication
* CLI Commands
* AI Modes
* Tools
* Complete Workflow
* Troubleshooting

---

# 🔄 Complete Workflow

A typical Orbital CLI session looks like this:

```text
1. Open Orbital Web Application
              ↓
2. Sign in with GitHub
              ↓
3. Install Orbital CLI
              ↓
4. Run `orbit login`
              ↓
5. Receive device code
              ↓
6. Open device authorization page
              ↓
7. Enter code
              ↓
8. Approve device
              ↓
9. Run `orbit whoami`
              ↓
10. Run `orbit wakeup`
              ↓
11. Select an AI mode
              ↓
12. Start working with Orbital
```

---

# 🧪 Development

Start the web application in development mode:

```bash
npm run dev
```

Depending on the project configuration, the application will be available locally at:

```text
http://localhost:3000
```

The authentication/server configuration may use a separate local port.

---

# 🗄️ Database

Orbital CLI uses Prisma as the database ORM with PostgreSQL.

Typical Prisma commands:

```bash
npx prisma generate
```

Generate the Prisma client.

```bash
npx prisma migrate dev
```

Create and apply development migrations.

```bash
npx prisma migrate status
```

Check migration status.

---

# 🔒 Security

Orbital CLI uses browser-based authentication so users do not need to provide their GitHub credentials directly to the CLI.

For development and deployment:

* Keep OAuth credentials private.
* Keep API keys private.
* Never commit `.env` files.
* Use environment variables for secrets.
* Use HTTPS in production.
* Configure production OAuth callback URLs correctly.
* Use a production PostgreSQL database for deployed environments.

---

# 🚀 Production Deployment

The web application can be deployed using Vercel or another compatible hosting platform.

Before deploying, configure:

* Production PostgreSQL database
* Prisma environment variables
* Better Auth configuration
* GitHub OAuth production credentials
* Google Generative AI API key
* Production application URL
* CLI production server URL

The CLI must communicate with the deployed authentication server rather than a local URL such as:

```text
http://localhost:3005
```

---

# 🐛 Troubleshooting

### `orbit` command is not recognized

Make sure the CLI package is installed correctly and that its executable is available in your system PATH.

### Already logged in

If the CLI reports that you are already authenticated, check your current account:

```bash
orbit whoami
```

To authenticate again:

```bash
orbit login
```

### Device authorization failed

Make sure:

* The device code has not expired.
* You are using the correct authorization URL.
* The browser is connected to the same Orbital environment.
* The authentication server is running.

### AI tool is not supported

Some AI models do not support every available tool.

For example, a model may support normal text generation but not a particular tool such as Code Execution.

Check the configured model and provider capabilities before enabling unsupported tools.

---

# 🗺️ Roadmap

Potential future improvements include:

* [ ] Package and publish the CLI for easier installation
* [ ] Improved CLI configuration management
* [ ] More AI providers
* [ ] Additional developer tools
* [ ] Improved agentic workflows
* [ ] Persistent workspace management
* [ ] Usage analytics
* [ ] Team/workspace support
* [ ] Production-ready device management
* [ ] Enhanced documentation

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

To contribute:

```bash
git clone https://github.com/YOUR_USERNAME/orbital-cli.git
cd orbital-cli
npm install
```

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test them locally, and open a pull request.

---

# 📄 License

Add the project's license here once the licensing decision has been finalized.

---

## Orbital CLI

**AI for your terminal.**

Build, explore, search, and work with AI directly from the command line.
