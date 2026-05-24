# FORGE

**The open source AI growth system for founders who refuse to be average.**

FORGE turns your expertise into an unstoppable engine of authority, content, and inbound revenue — combining AI agents, automation workflows, and battle-tested playbooks into one system you own completely.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Bigreddroid/forge?style=social)](https://github.com/Bigreddroid/forge)
[![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2)](https://discord.gg/forge)

---

## What is FORGE?

FORGE is an open source framework that gives founders a complete go-to-market system:

| Pillar | What it does |
|--------|-------------|
| **Authority Engine** | Positions you as the undeniable category leader |
| **Content Machine** | Generates 30-50 pieces of on-brand content per week |
| **Distribution Dominance** | Publishes across LinkedIn, Twitter, newsletter, YouTube |
| **Lead Intelligence** | Identifies, scores, and nurtures high-intent prospects |
| **Revenue Acceleration** | Automates pipeline from first touch to closed deal |
| **Market Intelligence** | Monitors competitors and surfaces opportunities daily |

## Self-host or use FORGE Cloud

| | Self-hosted | FORGE Cloud |
|---|---|---|
| Cost | Free forever | $97–$997/mo |
| Setup | ~2 hours | 5 minutes |
| Maintenance | You manage | We manage |
| Customization | Unlimited | Configurable |
| Support | Community | Priority |

→ [FORGE Cloud](https://forge.so) — hosted, managed, no DevOps required

---

## Quick Start (Self-hosted)

```bash
# Clone the repo
git clone https://github.com/Bigreddroid/forge.git
cd forge

# Install dependencies
npm install

# Copy and configure environment
cp .env.example .env

# Start with Docker
docker-compose up -d
```

See [docs/getting-started.md](docs/getting-started.md) for the full setup guide.

---

## Tech Stack

- **Automation:** n8n (workflow engine)
- **AI:** Claude API (Anthropic)
- **Frontend:** Next.js 15 + Tailwind CSS + shadcn/ui
- **Backend:** Node.js + tRPC
- **Database:** PostgreSQL via Supabase
- **Auth:** Clerk
- **Email:** Resend + React Email
- **Analytics:** PostHog
- **Deployment:** Docker + Docker Compose

---

## Repo Structure

```
forge/
├── workflows/          # n8n automation recipes (content, lead-gen, nurture)
├── prompts/            # Claude AI prompt library (voice-trained, role-specific)
├── templates/          # Landing pages, email sequences, dashboards
├── playbooks/          # Strategic guides (authority, content, leads, revenue)
├── integrations/       # LinkedIn, Apollo, Beehiiv, Claude API wrappers
├── apps/
│   ├── web/            # Next.js FORGE Cloud dashboard
│   └── cli/            # forge CLI tool
└── docs/               # Documentation
```

---

## Playbooks

- [Authority Engine](playbooks/authority-engine.md) — become the go-to name in your category
- [Content Machine](playbooks/content-machine.md) — 30-50 pieces/week on autopilot
- [Lead Intelligence](playbooks/lead-intelligence.md) — intent-based prospect pipeline
- [Revenue Acceleration](playbooks/revenue-acceleration.md) — close faster with automation

---

## Workflows

Drop-in n8n automation recipes:

- `workflows/content/linkedin-autopilot.json` — daily LinkedIn posts from a content brief
- `workflows/content/newsletter-generator.json` — weekly newsletter from your notes
- `workflows/lead-gen/prospect-finder.json` — ICP-matched leads from LinkedIn
- `workflows/lead-gen/outreach-sequence.json` — personalized cold outreach at scale
- `workflows/nurture/email-sequence.json` — 5-email welcome + pitch sequence
- `workflows/intelligence/competitor-monitor.json` — daily competitor content alerts

---

## Prompts

Claude-powered prompt library:

- `prompts/voice-training/` — train AI to write exactly like you
- `prompts/content-gen/` — LinkedIn posts, newsletters, Twitter threads
- `prompts/outreach/` — personalized cold messages that get replies
- `prompts/analysis/` — market, competitor, and lead analysis

---

## Contributing

FORGE is built by founders, for founders. Contributions welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/my-workflow`
3. Commit your changes
4. Open a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT — free forever, including commercial use.

---

## Community

- **Discord:** [forge.community](https://discord.gg/forge)
- **Twitter:** [@forgeso](https://twitter.com/forgeso)
- **Newsletter:** [forge.so/newsletter](https://forge.so/newsletter)
