# FORGE — Claude Code Context

This file gives any Claude Code session full context on the FORGE project so work can continue immediately without re-explanation.

## What FORGE Is

FORGE is an open source AI-powered growth system for founders. It replaces the category of "personal branding agency" with a self-hosted, automatable, AI-native system that any founder can run.

**One-liner:** The open source AI growth system for founders who refuse to be average.

**Business model:** Open core.
- The system (workflows, prompts, playbooks) is MIT-licensed and free forever
- FORGE Cloud (hosted, managed version) is paid: $97–$997/month
- The community around FORGE is the moat

**Comparable companies:** Cal.com (open source Calendly), Ghost (open source WordPress), n8n (open source Zapier)

## Repo: github.com/Bigreddroid/forge

Public. MIT license. Owned by Varun (GitHub: Bigreddroid).

## Current State (as of 2026-05-25)

### What exists
- `playbooks/` — 4 complete strategic guides (authority, content, leads, revenue)
- `workflows/` — 4 n8n automation JSON files (LinkedIn autopilot, prospect finder, email nurture, competitor monitor)
- `prompts/` — 5 Claude prompt templates (voice training, LinkedIn post, newsletter, cold outreach, market analysis)
- `integrations/claude/index.ts` — TypeScript wrapper for Anthropic SDK
- `docs/getting-started.md` — Self-hosting guide
- `docker-compose.yml` — Full stack: PostgreSQL + n8n + web app
- `.claude/agents/hermes.md` — Marketing automation agent

### What does NOT exist yet (needs to be built)
- `apps/web/` — Next.js dashboard (FORGE Cloud UI)
- `apps/cli/` — `forge` CLI tool
- `workflows/content/newsletter-generator.json` — Weekly newsletter workflow
- `workflows/lead-gen/outreach-sequence.json` — Automated cold outreach
- `workflows/marketing/twitter-autopilot.json` — Twitter/X automation
- `templates/` — Landing pages, email templates, dashboards
- Tests — none yet
- `packages/` — Shared TypeScript types and utilities

## Architecture

```
Automation engine: n8n (self-hosted, open source)
AI: Claude API via Anthropic SDK (model: claude-sonnet-4-6)
Frontend: Next.js 15 (to be built in apps/web/)
Backend: Node.js + tRPC (to be built)
Database: PostgreSQL via Supabase or self-hosted
Auth: Clerk
Email: Resend + React Email
Analytics: PostHog
Deployment: Docker Compose (self-host) / Railway (FORGE Cloud)
```

## The 6 Pillars

| Pillar | Status | Workflow |
|--------|--------|----------|
| Authority Engine | Playbook done, UI not built | Manual |
| Content Machine | LinkedIn autopilot workflow done | `workflows/content/linkedin-autopilot.json` |
| Distribution | LinkedIn done, Twitter/newsletter pending | Partial |
| Lead Intelligence | Prospect finder + email nurture done | `workflows/lead-gen/prospect-finder.json` |
| Revenue Acceleration | Playbook done, CRM integration pending | Manual |
| Market Intelligence | Competitor monitor done | `workflows/intelligence/competitor-monitor.json` |

## Key Environment Variables

See `.env.example` for all vars. Critical ones:
- `ANTHROPIC_API_KEY` — required for all AI features
- `N8N_HOST` — automation engine (default: http://localhost:5678)
- `DATABASE_URL` — PostgreSQL connection string
- `APOLLO_API_KEY` — for lead prospecting
- `RESEND_API_KEY` — for email sequences
- `BUFFER_ACCESS_TOKEN` or `LINKEDIN_ACCESS_TOKEN` — for posting

## Local Development

```bash
# Clone
git clone https://github.com/Bigreddroid/forge.git
cd forge

# Setup
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Start full stack
docker-compose up -d

# n8n available at http://localhost:5678
# Web app (when built) at http://localhost:3000

# Install Node deps
npm install
```

## The Hermes Agent

`.claude/agents/hermes.md` is a Claude Code subagent that handles all marketing tasks:
- Drafts and posts Twitter/X content
- Writes Show HN and Reddit posts
- Runs launch campaigns
- Monitors mentions and engages
- Generates weekly performance reports

Summon it by describing a marketing task: "tweet about X", "run the HN launch", "write a thread about Y".

## Coding Standards

- TypeScript for all integration code (strict mode)
- No `any` types without explanation
- No comments that describe what code does — only why
- Prefer editing existing files over creating new ones
- n8n workflows as JSON with `name`, `description`, `setup`, `nodes`, `connections` keys

## Business Context

- Founder: Varun (varun.sheri@gmail.com, GitHub: Bigreddroid)
- Target customer: B2B founders at $500K–$5M ARR, 1–15 person teams
- Primary acquisition: GitHub (open source) → FORGE Cloud (paid)
- Secondary: LinkedIn content, HN launches, founder communities
- Pricing: CORE $997/mo, PRO $2,997/mo, DOMINANCE $7,997/mo, EMPIRE $19,997/mo

## Next Priorities (in order)

1. `workflows/marketing/twitter-autopilot.json` — Twitter automation live
2. `apps/web/` — Next.js dashboard scaffold (FORGE Cloud MVP)
3. `workflows/content/newsletter-generator.json` — Newsletter automation
4. `apps/cli/` — `forge` CLI for running workflows from terminal
5. `templates/landing-pages/` — Authority audit lead magnet page
6. CI/CD pipeline to Railway for FORGE Cloud hosting

## Key Decisions Already Made

- **n8n** as automation engine (also open source — perfect brand alignment)
- **Claude Sonnet 4.6** as default model (not GPT — product integrity)
- **MIT license** (not AGPL) — maximize adoption, monetize through cloud
- **Monorepo with Turborepo** — single repo for web, CLI, and packages
- **Resend** for email (better DX than SendGrid)
- **Buffer** for social scheduling (has LinkedIn + Twitter API)

## How to Work on This Project

1. Read this file first (you just did)
2. Check `git log --oneline` for recent changes
3. Use the Hermes agent for any marketing tasks
4. Check `workflows/` for what automation exists before building new
5. When adding a workflow, match the JSON structure of existing ones
6. When in doubt, check `playbooks/` for strategic context
