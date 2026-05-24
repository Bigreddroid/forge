# Contributing to FORGE

FORGE is built by founders, for founders. All contributions welcome.

## What to Contribute

- **Workflows** — new n8n automation recipes (content, lead-gen, nurture, intelligence)
- **Prompts** — Claude prompt templates for new use cases
- **Templates** — landing pages, email sequences, dashboards
- **Playbooks** — strategic guides for specific channels or tactics
- **Integrations** — new platform connectors (Taplio, Instantly, Beehiiv, etc.)
- **Bug fixes** — anything broken in the core stack

## How to Contribute

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-workflow`
3. Make your changes
4. Test it works
5. Open a pull request with a clear description

## Workflow Contribution Guidelines

New n8n workflows must include:
- `name` and `description` fields
- `setup` object with required credentials, env vars, and import instructions
- Node descriptions explaining what each step does
- No hardcoded API keys or secrets (use `$env.VAR_NAME`)

## Prompt Contribution Guidelines

New prompts must include:
- A system prompt section
- A user prompt template with clear placeholders
- At least one example output or output structure
- No made-up statistics or false claims

## Code Style

- TypeScript for all integration code
- ESLint + Prettier (run `npm run lint` before PR)
- No `any` types without a comment explaining why

## Recognition

Top contributors get:
- Credit in the README contributors section
- Featured in the FORGE newsletter
- Early access to FORGE Cloud features
