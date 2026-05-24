# Revenue Acceleration Playbook

Close faster by automating every touchpoint from first reply to signed contract.

## The FORGE Sales Flow

```
Lead replies or books call
        ↓
Automated confirmation + prep email (value, agenda, what to expect)
        ↓
Discovery call (30 min — Authority Audit framework)
        ↓
Custom 90-day FORGE roadmap sent within 24 hours
        ↓
Follow-up sequence (3 touches over 7 days)
        ↓
Proposal / offer
        ↓
Objection handling (automated FAQ + personal response)
        ↓
Contract + onboarding
```

## Discovery Call Framework: The Authority Audit

Use these 6 questions in every call:

1. **Situation:** "Walk me through how you're currently generating leads — what's working, what isn't?"
2. **Pain:** "What's the biggest bottleneck between where you are now and where you want to be?"
3. **Impact:** "What does that cost you — in time, money, or missed opportunities?"
4. **Desired outcome:** "If we were sitting here 90 days from now and everything had gone perfectly, what would that look like?"
5. **Previous attempts:** "What have you already tried to solve this?"
6. **Decision:** "If we can show you a clear path to [desired outcome], what would need to be true for you to move forward?"

## The 90-Day FORGE Roadmap

After every discovery call, send a custom roadmap within 24 hours. Include:

- Month 1: Foundation (positioning, voice, content pillars, stack setup)
- Month 2: Content Machine (daily publishing, audience building, lead magnet live)
- Month 3: Revenue (outbound running, pipeline active, first inbound leads)

Personalize with their specific numbers, pain points, and goals from the call.

## Email Follow-up Sequence (Post-Call)

**Email 1 (same day):** Recap + roadmap
> "Here's what we covered today + your custom 90-day roadmap."

**Email 2 (Day 3):** Relevant case study
> "Thought you'd find this relevant — [client] had the exact same challenge and here's what happened."

**Email 3 (Day 7):** The honest close
> "I want to be upfront — I only take on [X] new clients per month to ensure results. Are you still interested in moving forward, or should I free up the spot?"

## Objection Handling

| Objection | Response |
|-----------|----------|
| "Too expensive" | "What's the cost of your current situation? If we generate one enterprise client, does FORGE pay for itself?" |
| "Not the right time" | "Most founders who say that tell me later they wished they'd started sooner. What would need to change for timing to be right?" |
| "Need to think about it" | "What specifically is unclear? I'd rather answer those questions now than have you overthink something I can address in 5 minutes." |
| "I can do it myself" | "Absolutely. FORGE is open source — you can run the whole system yourself. Most founders find that the time cost is higher than the service cost." |

## Pricing Tiers (Quick Reference)

| Tier | Price | Who it's for |
|------|-------|-------------|
| FORGE CORE | $997/mo | Founders just starting |
| FORGE PRO | $2,997/mo | Founders ready to scale (recommended) |
| FORGE DOMINANCE | $7,997/mo | Founders going all-in |
| FORGE EMPIRE | $19,997/mo | Total done-for-you |

**Annual discount:** 2 months free (17% off)
**Risk reversal:** 30-day money-back guarantee
**Entry offer:** First month of CORE at $497

## CRM Setup

Import `workflows/nurture/email-sequence.json` into n8n and connect to HubSpot:

- New lead → auto-tagged by source
- Discovery call booked → prep email triggered
- Call completed → roadmap reminder at 23 hours
- No response after 7 days → follow-up sequence starts
- Deal closed → onboarding workflow triggered
