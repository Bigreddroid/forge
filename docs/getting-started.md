# Getting Started with FORGE

Get your AI growth system running in under 2 hours.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 20+
- API keys: Anthropic (required), others optional to start

## 1. Clone and Configure

```bash
git clone https://github.com/Bigreddroid/forge.git
cd forge
cp .env.example .env
```

Open `.env` and add your keys. At minimum you need:
- `ANTHROPIC_API_KEY` — get one at console.anthropic.com
- `DATABASE_URL` — auto-configured if using Docker

## 2. Start the Stack

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- n8n automation engine on port 5678
- FORGE web dashboard on port 3000

## 3. Set Up Your Voice

1. Open `prompts/voice-training/founder-voice.md`
2. Fill in your voice characteristics and paste 5-10 writing examples
3. Copy the completed prompt
4. In FORGE dashboard → Settings → AI Voice → paste your system prompt

## 4. Import Your First Workflow

1. Open n8n at `http://localhost:5678`
2. Go to Workflows → Import from file
3. Select `workflows/content/linkedin-autopilot.json`
4. Add your credentials (Claude API key, Buffer or LinkedIn token)
5. Activate the workflow

## 5. Test It

Send a test content brief to your webhook:

```bash
curl -X POST http://localhost:5678/webhook/forge-linkedin \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Why most founders waste money on paid ads",
    "angle": "You need organic authority before paid ads work",
    "key_insight": "Paid ads amplify what already works organically — they dont create it",
    "tone": "direct",
    "length": "medium"
  }'
```

You should receive a generated LinkedIn post within seconds.

## 6. Set Up Lead Generation

1. Sign up for Apollo.io (free tier works to start)
2. Add `APOLLO_API_KEY` to your `.env`
3. Import `workflows/lead-gen/prospect-finder.json` into n8n
4. Set your ICP filters in environment variables:
   ```
   FORGE_ICP_TITLES=["Founder","CEO","Co-Founder"]
   FORGE_ICP_MIN_EMPLOYEES=10
   FORGE_ICP_MAX_EMPLOYEES=200
   FORGE_MIN_LEAD_SCORE=40
   ```
5. Activate the workflow — it runs daily at 8 AM

## 7. Set Up Email Nurture

1. Sign up for Resend (free tier: 3,000 emails/month)
2. Add `RESEND_API_KEY` to `.env`
3. Import `workflows/nurture/email-sequence.json`
4. Customize the 5 email templates in the workflow nodes
5. Connect your lead magnet form's webhook to `http://localhost:5678/webhook/forge-nurture`

## What's Next

- Read the [Authority Engine playbook](../playbooks/authority-engine.md) to build your positioning
- Read the [Content Machine playbook](../playbooks/content-machine.md) for your content strategy
- Join the [FORGE Discord](https://discord.gg/forge) for community support

## Need Help?

- Discord: [forge.community](https://discord.gg/forge)
- GitHub Issues: [github.com/Bigreddroid/forge/issues](https://github.com/Bigreddroid/forge/issues)
- FORGE Cloud (no self-hosting): [forge.so](https://forge.so)
