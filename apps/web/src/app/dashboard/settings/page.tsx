"use client";

import { useState } from "react";
import { CheckCircle, Eye, EyeOff, Save, Loader2 } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved";

function ApiKeyInput({ label, envKey, placeholder }: { label: string; envKey: string; placeholder: string }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="input pr-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-[11px] text-zinc-600 mt-1">Env var: <code>{envKey}</code></p>
    </div>
  );
}

export default function SettingsPage() {
  const [voicePrompt, setVoicePrompt] = useState(
    `You are writing as [YOUR NAME], founder of [COMPANY].

TONE: Direct, confident, peer-to-peer. Never corporate.
VOCABULARY: Plain English. Short sentences.
NEVER USE: "leverage", "synergy", "game-changer", "unlock", exclamation points
ALWAYS: Lead with the insight, not the setup. End with a point, not a fade.`
  );
  const [icpJson, setIcpJson] = useState(
    JSON.stringify(
      { titles: ["Founder", "CEO", "Co-Founder"], minEmployees: 10, maxEmployees: 200, minScore: 40 },
      null,
      2
    )
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");
    await new Promise((r) => setTimeout(r, 800));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  }

  return (
    <div className="p-8 max-w-[900px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">
          Configure your FORGE system — API keys, voice, ICP filters
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* API Keys */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">API Keys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ApiKeyInput label="Anthropic (Claude)" envKey="ANTHROPIC_API_KEY" placeholder="sk-ant-..." />
            <ApiKeyInput label="Apollo (Lead data)" envKey="APOLLO_API_KEY" placeholder="apollo_..." />
            <ApiKeyInput label="Resend (Email)" envKey="RESEND_API_KEY" placeholder="re_..." />
            <ApiKeyInput label="Buffer (Scheduling)" envKey="BUFFER_ACCESS_TOKEN" placeholder="buffer_..." />
            <ApiKeyInput label="Twitter Bearer" envKey="TWITTER_BEARER_TOKEN" placeholder="AAAAAA..." />
            <ApiKeyInput label="PostHog" envKey="NEXT_PUBLIC_POSTHOG_KEY" placeholder="phc_..." />
          </div>
        </div>

        {/* Voice Prompt */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-sm font-semibold text-white">AI Voice Prompt</h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                This trains Claude to write exactly like you. The more examples, the better.
              </p>
            </div>
            <a
              href="https://github.com/Bigreddroid/forge/blob/master/prompts/voice-training/founder-voice.md"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-orange-400 hover:text-orange-300"
            >
              Guide
            </a>
          </div>
          <textarea
            className="input resize-none font-mono text-xs"
            rows={10}
            value={voicePrompt}
            onChange={(e) => setVoicePrompt(e.target.value)}
          />
        </div>

        {/* ICP Config */}
        <div className="card p-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-white">ICP Filters</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Used by the Prospect Finder workflow to score and filter leads
            </p>
          </div>
          <textarea
            className="input resize-none font-mono text-xs"
            rows={7}
            value={icpJson}
            onChange={(e) => setIcpJson(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* n8n Connection */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">n8n Connection</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">n8n Host</label>
              <input className="input" defaultValue="http://localhost:5678" />
            </div>
            <div>
              <label className="label">Webhook Base URL</label>
              <input className="input" defaultValue="http://localhost:5678/webhook" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            n8n is reachable at localhost:5678
          </div>
        </div>

        <button type="submit" disabled={saveStatus === "saving"} className="btn-primary">
          {saveStatus === "saving" ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
          ) : saveStatus === "saved" ? (
            <><CheckCircle className="w-4 h-4" /> Saved</>
          ) : (
            <><Save className="w-4 h-4" /> Save Settings</>
          )}
        </button>
      </form>
    </div>
  );
}
