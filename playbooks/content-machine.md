# Content Machine Playbook

Generate 30-50 pieces of on-brand content per week with minimal founder time.

## The One-to-Many Framework

One idea becomes many pieces. Never start from scratch.

```
1 CORE IDEA
    ↓
Long-form post (LinkedIn article or newsletter)
    ↓
├── 3 LinkedIn posts (hook, insight, proof)
├── 1 Twitter/X thread
├── 5 short tweets
├── 2 LinkedIn carousels
├── 1 YouTube Short script
├── 1 podcast talking point
└── 3 email subject line ideas
```

## Weekly Content Calendar

| Day | Format | Platform | Time Required |
|-----|--------|----------|---------------|
| Monday | Long-form post (authority/POV) | LinkedIn | 10 min review |
| Tuesday | Thread (tactical breakdown) | Twitter/X | 5 min review |
| Wednesday | Newsletter (deep dive) | Beehiiv | 15 min review |
| Thursday | Carousel (step-by-step) | LinkedIn | 10 min review |
| Friday | Short post (win/proof) | LinkedIn | 5 min review |
| Weekend | Repurpose top post | Twitter/X | Automated |

Total founder time: ~45 minutes/week to review and approve.

## Content Brief Template

Use this to feed your AI content generator (`prompts/content-gen/`):

```
Topic: [what this is about]
Audience: [who specifically]
Angle: [your take — what's the contrarian/novel view]
Key insight: [the one thing they should remember]
CTA: [what you want them to do after reading]
Tone: [casual/bold/vulnerable/educational]
Examples/proof: [any stats, stories, or results to include]
```

## Hook Formula Bank

A bad hook kills great content. Use these proven structures:

- "I made $X in Y days by doing Z (here's exactly how):"
- "Most [audience] [do X wrong]. Here's what the top 1% do instead:"
- "Unpopular opinion: [contrarian take that your ICP secretly agrees with]"
- "I spent [time] studying [X]. Here's what I found:"
- "Stop [common advice]. Do this instead:"
- "The [number] [things/rules/mistakes] that [outcome]:"
- "[Result] in [timeframe]. No [thing people assume is required]."

## AI Prompt Usage

See `prompts/content-gen/` for ready-to-use Claude prompts:

- `linkedin-post.md` — single LinkedIn post from a brief
- `newsletter.md` — full newsletter from bullet points
- `twitter-thread.md` — 8-12 tweet thread from an insight
- `carousel.md` — 8-slide carousel script

## Quality Gates

Before any content goes live, check:

- [ ] Hook makes you want to read the next line
- [ ] No jargon a smart 12-year-old wouldn't understand
- [ ] One clear idea (not three)
- [ ] Ends with a point, not a fade
- [ ] CTA is specific, not "let me know your thoughts"

## Automation Setup

1. Import `workflows/content/linkedin-autopilot.json` into n8n
2. Connect your Claude API key and LinkedIn account
3. Add your content brief to the trigger webhook
4. FORGE generates, schedules, and posts automatically
