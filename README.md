# crewai-test
Testing the CrewAi with Redify
# Sprint3 Crew

Welcome to the Sprint3 Crew project, powered by [crewAI](https://crewai.com). This template is designed to help you set up a multi-agent AI system with ease, leveraging the powerful and flexible framework provided by crewAI. Our goal is to enable your agents to collaborate effectively on complex tasks, maximizing their collective intelligence and capabilities.

## Installation

Ensure you have Python >=3.10 <3.14 installed on your system. This project uses [UV](https://docs.astral.sh/uv/) for dependency management and package handling, offering a seamless setup and execution experience.

First, if you haven't already, install uv:

```bash
pip install uv
```

Next, navigate to your project directory and install the dependencies:

(Optional) Lock the dependencies and install them by using the CLI command:
```bash
crewai install
```
### Customizing

**Add your `OPENAI_API_KEY` into the `.env` file**

- Modify `src/sprint_3/config/agents.yaml` to define your agents
- Modify `src/sprint_3/config/tasks.yaml` to define your tasks
- Modify `src/sprint_3/crew.py` to add your own logic, tools and specific args
- Modify `src/sprint_3/main.py` to add custom inputs for your agents and tasks

## Running the Project

To kickstart your crew of AI agents and begin task execution, run this from the root folder of your project:

```bash
$ crewai run
```

This command initializes the sprint-3 Crew, assembling the agents and assigning them tasks as defined in your configuration.

This example, unmodified, will run the create a `report.md` file with the output of a research on LLMs in the root folder.

## Understanding Your Crew

The sprint-3 Crew is composed of multiple AI agents, each with unique roles, goals, and tools. These agents collaborate on a series of tasks, defined in `config/tasks.yaml`, leveraging their collective skills to achieve complex objectives. The `config/agents.yaml` file outlines the capabilities and configurations of each agent in your crew.

## Support

For support, questions, or feedback regarding the Sprint3 Crew or crewAI.
- Visit our [documentation](https://docs.crewai.com)
- Reach out to us through our [GitHub repository](https://github.com/joaomdmoura/crewai)
- [Join our Discord](https://discord.com/invite/X4JWnZnxPb)
- [Chat with our docs](https://chatg.pt/DWjSBZn)

Let's create wonders together with the power and simplicity of crewAI.

## Website Mimicker Crew

This project now includes a CrewAI workflow to analyze a target website's layout and scaffold a Next.js + Tailwind CSS application that mimics its structure (without copying content).

### Setup
1. Ensure you have Node.js 18+ and pnpm installed.
2. Copy `.env.example` to `.env` and provide the required API keys.

### Required environment variables
- `MODEL`
- `GEMINI_API_KEY`
- `SERPER_API_KEY`

### Commands
- `pnpm install` – install dependencies
- `pnpm dev` – run the Next.js development server
- `pnpm build` – build the production app
- `pnpm typecheck` – run TypeScript checks
- `pnpm test` – run unit and accessibility tests
- `pnpm crew:run --url <target>` – analyze the given URL and update the app

### Regenerating for another URL
Run `pnpm crew:run --url https://example.com` to regenerate layout artifacts and update auto-generated sections. Existing custom code is preserved outside of `// <auto-gen start: crew-site-mimicker>` markers.

### App Features
- Split hero layout on the home page
- URL-synchronised category filters (price, size, color)
- Product gallery with thumbnails and keyboard navigation
- Promo code placeholder in the cart (`SAVE10` for 10% off)
- Checkout progress indicator with basic form validation
- Sticky header with accessible mega-menu stub
