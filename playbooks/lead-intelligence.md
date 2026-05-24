# Lead Intelligence Playbook

Move from "hoping for inbound" to a predictable, intent-based pipeline.

## ICP Definition Template

Fill this out before running any lead generation:

```
Who they are:
  Title(s): [e.g., Founder, CEO, Head of Growth]
  Company size: [e.g., 10-100 employees]
  Revenue stage: [e.g., $500K–$5M ARR]
  Industry: [e.g., B2B SaaS, professional services]
  Geography: [e.g., US, UK, Canada]

What they feel:
  Primary pain: [what keeps them up at night]
  Secondary pain: [what they complain about to peers]
  Desired outcome: [what success looks like in 90 days]

Buying signals (what indicates they're ready):
  - [e.g., posting about hiring a marketer]
  - [e.g., recently raised funding]
  - [e.g., commenting on competitor content]
  - [e.g., active on LinkedIn, posting about growth]

Where to find them:
  - LinkedIn (search filters below)
  - Newsletters they read
  - Communities they're in
  - Events they attend
```

## LinkedIn Search String

```
(Founder OR CEO OR "Co-Founder") AND ("SaaS" OR "B2B") NOT (student OR intern OR "looking for")
Filter: 2nd connections, 10-200 employees, specific industries
```

## Outreach Volume Targets

| Activity | Daily | Weekly | Monthly |
|----------|-------|--------|---------|
| Connection requests | 25 | 125 | 500 |
| Follow-up messages | 15 | 75 | 300 |
| Email outreach | 30 | 150 | 600 |
| Responses received | ~5 | ~25 | ~100 |
| Discovery calls | ~1 | ~5 | ~20 |

## Lead Scoring Model

Score every lead before spending time on them:

| Criteria | Points |
|----------|--------|
| Exact ICP title | +25 |
| Target company size | +15 |
| Active on LinkedIn (posts weekly) | +10 |
| Engaged with your content | +20 |
| Visited your website | +15 |
| Downloaded a lead magnet | +20 |
| Replied to outreach | +25 |
| Asked a specific question | +30 |
| Competitor customer | -10 |
| Student / no budget signals | -30 |

**Thresholds:**
- 80+ → Book a call immediately
- 50–79 → Add to email nurture + LinkedIn touchpoint
- 20–49 → Long-term nurture (monthly touchpoint)
- <20 → Don't spend time

## The 5-Touch Outreach Sequence

**Touch 1 (Day 0):** Connection request with personalized note (no pitch)
> "Noticed you're building [X] — we're both working on similar problems. Would love to connect."

**Touch 2 (Day 3):** Value-first message after connecting
> Share a resource, insight, or short observation relevant to their situation. No ask.

**Touch 3 (Day 7):** Soft ask
> "Curious — are you handling [pain point] manually right now or have you found a system that works?"

**Touch 4 (Day 14):** Case study drop
> "Thought this might be useful — we helped [similar founder] go from [problem] to [result] in 90 days."

**Touch 5 (Day 21):** Direct ask
> "Would a 20-min call to map out your [goal] be useful? Happy to share exactly what's been working."

## Automation

- Import `workflows/lead-gen/prospect-finder.json` into n8n
- Configure ICP filters (title, company size, industry)
- Set daily limits (LinkedIn ToS: max 100 connection requests/day)
- Responses auto-route to HubSpot CRM with lead score applied
