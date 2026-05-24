"use client";

import { useState } from "react";
import { triggerContentWorkflow, triggerTwitterWorkflow } from "@/lib/n8n";
import { FileText, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Tab = "linkedin" | "twitter";
type Status = "idle" | "loading" | "success" | "error";

const recentPosts = [
  {
    platform: "LinkedIn",
    preview: "Most founders waste money on paid ads before building organic authority. Here's why that's backwards:",
    scheduledAt: "Tomorrow 9:00 AM",
    status: "scheduled",
  },
  {
    platform: "LinkedIn",
    preview: "I analyzed 50 founder LinkedIn profiles. The ones generating inbound leads all share 3 things:",
    scheduledAt: "Today 2:00 PM",
    status: "posted",
  },
  {
    platform: "Twitter",
    preview: "Open-sourced the growth system I use for founders. All the n8n workflows, Claude prompts, and playbooks:",
    scheduledAt: "Yesterday 11:00 AM",
    status: "posted",
  },
];

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>("linkedin");
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState({
    topic: "",
    angle: "",
    keyInsight: "",
    cta: "",
    tone: "direct",
    length: "medium" as "short" | "medium" | "long",
    context: "",
  });
  const [tweet, setTweet] = useState("");
  const [tweetStatus, setTweetStatus] = useState<Status>("idle");

  async function handleLinkedIn(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await triggerContentWorkflow(brief);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  async function handleTweet(e: React.FormEvent) {
    e.preventDefault();
    setTweetStatus("loading");
    try {
      await triggerTwitterWorkflow({ type: "tweet", text: tweet });
      setTweetStatus("success");
      setTweet("");
      setTimeout(() => setTweetStatus("idle"), 3000);
    } catch {
      setTweetStatus("error");
      setTimeout(() => setTweetStatus("idle"), 3000);
    }
  }

  return (
    <div className="p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Content</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Submit briefs — Claude generates and schedules automatically
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Form */}
        <div className="xl:col-span-3 card p-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-zinc-800 p-1 rounded-lg w-fit">
            <button
              onClick={() => setTab("linkedin")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === "linkedin"
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> LinkedIn
            </button>
            <button
              onClick={() => setTab("twitter")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tab === "twitter"
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Twitter className="w-3.5 h-3.5" /> Twitter/X
            </button>
          </div>

          {tab === "linkedin" && (
            <form onSubmit={handleLinkedIn} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Topic *</label>
                  <input
                    className="input"
                    placeholder="e.g. Why founders need systems not hustle"
                    value={brief.topic}
                    onChange={(e) => setBrief({ ...brief, topic: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">Tone</label>
                  <select
                    className="input"
                    value={brief.tone}
                    onChange={(e) => setBrief({ ...brief, tone: e.target.value })}
                  >
                    <option value="direct">Direct</option>
                    <option value="bold">Bold</option>
                    <option value="vulnerable">Vulnerable</option>
                    <option value="educational">Educational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Angle — your contrarian take *</label>
                <input
                  className="input"
                  placeholder="e.g. Most advice tells founders to post daily. That's wrong."
                  value={brief.angle}
                  onChange={(e) => setBrief({ ...brief, angle: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Key insight — the one thing they remember *</label>
                <input
                  className="input"
                  placeholder="e.g. Systems compound. Hustle doesn't."
                  value={brief.keyInsight}
                  onChange={(e) => setBrief({ ...brief, keyInsight: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">CTA</label>
                  <input
                    className="input"
                    placeholder="e.g. DM me 'system' for the template"
                    value={brief.cta}
                    onChange={(e) => setBrief({ ...brief, cta: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Length</label>
                  <select
                    className="input"
                    value={brief.length}
                    onChange={(e) =>
                      setBrief({ ...brief, length: e.target.value as "short" | "medium" | "long" })
                    }
                  >
                    <option value="short">Short (~150w)</option>
                    <option value="medium">Medium (~250w)</option>
                    <option value="long">Long (~400w)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Additional context / stories / stats</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder="Any personal stories, data points, or examples to weave in..."
                  value={brief.context}
                  onChange={(e) => setBrief({ ...brief, context: e.target.value })}
                />
              </div>

              <button type="submit" disabled={status === "loading"} className="btn-primary">
                {status === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                ) : status === "success" ? (
                  <><CheckCircle className="w-4 h-4" /> Sent to n8n</>
                ) : status === "error" ? (
                  <><AlertCircle className="w-4 h-4" /> Error — check n8n</>
                ) : (
                  <><Send className="w-4 h-4" /> Generate &amp; Schedule</>
                )}
              </button>

              {status === "success" && (
                <p className="text-xs text-emerald-400">
                  Brief sent to n8n. Claude is generating your post and scheduling it via Buffer.
                </p>
              )}
            </form>
          )}

          {tab === "twitter" && (
            <form onSubmit={handleTweet} className="space-y-4">
              <div>
                <label className="label">Tweet text</label>
                <textarea
                  className="input resize-none"
                  rows={4}
                  maxLength={280}
                  placeholder="Write your tweet... (280 chars max)"
                  value={tweet}
                  onChange={(e) => setTweet(e.target.value)}
                  required
                />
                <p className={`text-xs mt-1 text-right ${tweet.length > 260 ? "text-orange-400" : "text-zinc-600"}`}>
                  {tweet.length} / 280
                </p>
              </div>

              <button type="submit" disabled={tweetStatus === "loading"} className="btn-primary">
                {tweetStatus === "loading" ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
                ) : tweetStatus === "success" ? (
                  <><CheckCircle className="w-4 h-4" /> Posted</>
                ) : (
                  <><Twitter className="w-4 h-4" /> Post Tweet</>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Recent posts */}
        <div className="xl:col-span-2 card p-5">
          <h2 className="text-sm font-semibold text-zinc-300 mb-4">Recent Posts</h2>
          <div className="space-y-4">
            {recentPosts.map((post, i) => (
              <div key={i} className="pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-zinc-500">{post.platform}</span>
                  <span
                    className={post.status === "posted" ? "badge-green" : "badge-orange"}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-300 line-clamp-2">{post.preview}</p>
                <p className="text-xs text-zinc-600 mt-1">{post.scheduledAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
