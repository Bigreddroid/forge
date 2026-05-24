"use client";

import { useState } from "react";
import { triggerContentWorkflow, triggerTwitterWorkflow } from "@/lib/n8n";
import {
  FileText, Send, CheckCircle, AlertCircle, Loader2,
  Sparkles, Copy, Check, Twitter,
} from "lucide-react";

type Tab = "linkedin" | "twitter";
type Status = "idle" | "loading" | "success" | "error";

export default function ContentPage() {
  const [tab, setTab] = useState<Tab>("linkedin");

  // LinkedIn state
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState({
    topic: "", angle: "", keyInsight: "", cta: "",
    tone: "direct", length: "medium" as "short" | "medium" | "long", context: "",
  });
  const [preview, setPreview] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Twitter state
  const [tweet, setTweet] = useState("");
  const [tweetStatus, setTweetStatus] = useState<Status>("idle");
  const [tweetPreview, setTweetPreview] = useState("");
  const [generatingTweet, setGeneratingTweet] = useState(false);

  async function handleGenerate() {
    if (!brief.topic || !brief.angle || !brief.keyInsight) return;
    setGenerating(true);
    setPreview("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...brief, platform: "linkedin" }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPreview(data.post);
    } catch (e) {
      setPreview(`Error: ${e instanceof Error ? e.message : "Generation failed"}`);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSchedule(e: React.FormEvent) {
    e.preventDefault();
    if (!preview) { await handleGenerate(); return; }
    setStatus("loading");
    try {
      await triggerContentWorkflow({ ...brief });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGenerateTweet() {
    if (!tweet) return;
    setGeneratingTweet(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: tweet, angle: tweet, keyInsight: tweet, platform: "twitter" }),
      });
      const data = await res.json();
      setTweetPreview(data.post ?? "");
    } catch {
      setTweetPreview("");
    } finally {
      setGeneratingTweet(false);
    }
  }

  async function handleTweet(e: React.FormEvent) {
    e.preventDefault();
    setTweetStatus("loading");
    try {
      await triggerTwitterWorkflow({ type: "tweet", text: tweetPreview || tweet });
      setTweetStatus("success");
      setTweet(""); setTweetPreview("");
      setTimeout(() => setTweetStatus("idle"), 3000);
    } catch {
      setTweetStatus("error");
      setTimeout(() => setTweetStatus("idle"), 3000);
    }
  }

  return (
    <div className="p-8 max-w-[1400px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Content</h1>
        <p className="text-zinc-400 text-sm mt-1">Claude generates your post — review, copy, or send to n8n</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-zinc-900 border border-zinc-800 p-1 rounded-lg w-fit">
        {(["linkedin", "twitter"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              tab === t ? "bg-zinc-700 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {t === "linkedin" ? <FileText className="w-3.5 h-3.5" /> : <Twitter className="w-3.5 h-3.5" />}
            {t === "linkedin" ? "LinkedIn" : "Twitter/X"}
          </button>
        ))}
      </div>

      {tab === "linkedin" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Brief form */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4">Content Brief</h2>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Topic *</label>
                  <input className="input" placeholder="Why founders need systems, not hustle"
                    value={brief.topic} onChange={(e) => setBrief({ ...brief, topic: e.target.value })} required />
                </div>
                <div>
                  <label className="label">Tone</label>
                  <select className="input" value={brief.tone} onChange={(e) => setBrief({ ...brief, tone: e.target.value })}>
                    <option value="direct">Direct</option>
                    <option value="bold">Bold</option>
                    <option value="vulnerable">Vulnerable</option>
                    <option value="educational">Educational</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Angle — contrarian take *</label>
                <input className="input" placeholder="Most advice tells founders to post daily. That's wrong."
                  value={brief.angle} onChange={(e) => setBrief({ ...brief, angle: e.target.value })} required />
              </div>

              <div>
                <label className="label">Key insight *</label>
                <input className="input" placeholder="Systems compound. Hustle doesn't."
                  value={brief.keyInsight} onChange={(e) => setBrief({ ...brief, keyInsight: e.target.value })} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">CTA</label>
                  <input className="input" placeholder="DM me 'system' for the template"
                    value={brief.cta} onChange={(e) => setBrief({ ...brief, cta: e.target.value })} />
                </div>
                <div>
                  <label className="label">Length</label>
                  <select className="input" value={brief.length}
                    onChange={(e) => setBrief({ ...brief, length: e.target.value as "short" | "medium" | "long" })}>
                    <option value="short">Short (~150w)</option>
                    <option value="medium">Medium (~250w)</option>
                    <option value="long">Long (~400w)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="label">Context / stories / stats</label>
                <textarea className="input resize-none" rows={3}
                  placeholder="Any personal stories, data points, or examples to weave in..."
                  value={brief.context} onChange={(e) => setBrief({ ...brief, context: e.target.value })} />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={handleGenerate}
                  disabled={generating || !brief.topic || !brief.angle || !brief.keyInsight}
                  className="btn-ghost flex-1">
                  {generating
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                    : <><Sparkles className="w-4 h-4" /> Generate Preview</>}
                </button>
                <button type="submit" disabled={status === "loading" || !preview} className="btn-primary flex-1">
                  {status === "loading"
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    : status === "success"
                    ? <><CheckCircle className="w-4 h-4" /> Sent to n8n</>
                    : status === "error"
                    ? <><AlertCircle className="w-4 h-4" /> Error</>
                    : <><Send className="w-4 h-4" /> Send to n8n</>}
                </button>
              </div>
            </form>
          </div>

          {/* Preview panel */}
          <div className="card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-zinc-300">Preview</h2>
              {preview && (
                <button onClick={handleCopy} className="btn-ghost text-xs py-1 px-2">
                  {copied ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
              )}
            </div>

            {generating ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">Claude is writing your post...</p>
                </div>
              </div>
            ) : preview ? (
              <div className="flex-1 bg-zinc-800/50 rounded-lg p-4 overflow-y-auto">
                <p className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">{preview}</p>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg">
                <div className="text-center px-6">
                  <Sparkles className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
                  <p className="text-sm text-zinc-500">Fill in the brief and click</p>
                  <p className="text-sm font-medium text-zinc-400">Generate Preview</p>
                </div>
              </div>
            )}

            {status === "success" && (
              <p className="text-xs text-emerald-400 mt-3">
                Sent to n8n — Claude will schedule this via Buffer.
              </p>
            )}
          </div>
        </div>
      )}

      {tab === "twitter" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4">Tweet</h2>
            <form onSubmit={handleTweet} className="space-y-4">
              <div>
                <label className="label">Your idea or draft</label>
                <textarea className="input resize-none" rows={4} maxLength={280}
                  placeholder="What's on your mind? Claude will punch it up..."
                  value={tweet} onChange={(e) => setTweet(e.target.value)} required />
                <p className={`text-xs mt-1 text-right ${tweet.length > 260 ? "text-orange-400" : "text-zinc-600"}`}>
                  {tweet.length} / 280
                </p>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={handleGenerateTweet}
                  disabled={generatingTweet || !tweet} className="btn-ghost flex-1">
                  {generatingTweet
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting...</>
                    : <><Sparkles className="w-4 h-4" /> AI Rewrite</>}
                </button>
                <button type="submit" disabled={tweetStatus === "loading"} className="btn-primary flex-1">
                  {tweetStatus === "loading"
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
                    : tweetStatus === "success"
                    ? <><CheckCircle className="w-4 h-4" /> Posted</>
                    : <><Twitter className="w-4 h-4" /> Post Tweet</>}
                </button>
              </div>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4">Rewritten</h2>
            {tweetPreview ? (
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-sm text-zinc-200 whitespace-pre-wrap">{tweetPreview}</p>
                <p className={`text-xs mt-2 text-right ${tweetPreview.length > 260 ? "text-orange-400" : "text-zinc-500"}`}>
                  {tweetPreview.length} / 280
                </p>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-lg h-32">
                <p className="text-sm text-zinc-600">AI rewrite will appear here</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
