"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Eye, EyeOff, Save, Loader2, RefreshCw } from "lucide-react";

type SaveStatus = "idle" | "saving" | "saved";
type HealthStatus = "unknown" | "checking" | "up" | "down";

function ApiKeyInput({
  label, envKey, placeholder, value, onChange,
}: {
  label: string; envKey: string; placeholder: string;
  value: string; onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="input pr-10"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

const DEFAULT_VOICE = `You are writing as [YOUR NAME], founder of [COMPANY].

TONE: Direct, confident, peer-to-peer. Never corporate.
VOCABULARY: Plain English. Short sentences.
NEVER USE: "leverage", "synergy", "game-changer", "unlock", exclamation points
ALWAYS: Lead with the insight, not the setup. End with a point, not a fade.`;

const DEFAULT_ICP = JSON.stringify(
  { titles: ["Founder", "CEO", "Co-Founder"], minEmployees: 10, maxEmployees: 200, minScore: 40 },
  null, 2
);

export default function SettingsPage() {
  const [keys, setKeys] = useState({
    anthropicKey: "", apolloKey: "", resendKey: "",
    bufferToken: "", twitterBearer: "", posthogKey: "",
  });
  const [voicePrompt, setVoicePrompt] = useState(DEFAULT_VOICE);
  const [icpJson, setIcpJson] = useState(DEFAULT_ICP);
  const [n8nHost, setN8nHost] = useState("http://localhost:5678");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [health, setHealth] = useState<HealthStatus>("unknown");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.keys) setKeys((k) => ({ ...k, ...data.keys }));
        if (data.voicePrompt) setVoicePrompt(data.voicePrompt);
        if (data.icpJson) setIcpJson(data.icpJson);
        if (data.n8nHost) setN8nHost(data.n8nHost);
      })
      .catch(() => {});
    checkHealth();
  }, []);

  async function checkHealth() {
    setHealth("checking");
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setHealth(data.n8n ? "up" : "down");
    } catch {
      setHealth("down");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus("saving");
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys, voicePrompt, icpJson, n8nHost }),
      });
      setSaveStatus("saved");
    } catch {
      setSaveStatus("idle");
    }
    setTimeout(() => setSaveStatus("idle"), 2500);
  }

  const setKey = (k: keyof typeof keys) => (v: string) => setKeys((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="p-8 max-w-[900px]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 text-sm mt-1">Configure your FORGE system — API keys, voice, ICP filters</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* API Keys */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">API Keys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ApiKeyInput label="Anthropic (Claude)" envKey="ANTHROPIC_API_KEY" placeholder="sk-ant-..."
              value={keys.anthropicKey} onChange={setKey("anthropicKey")} />
            <ApiKeyInput label="Apollo (Lead data)" envKey="APOLLO_API_KEY" placeholder="apollo_..."
              value={keys.apolloKey} onChange={setKey("apolloKey")} />
            <ApiKeyInput label="Resend (Email)" envKey="RESEND_API_KEY" placeholder="re_..."
              value={keys.resendKey} onChange={setKey("resendKey")} />
            <ApiKeyInput label="Buffer (Scheduling)" envKey="BUFFER_ACCESS_TOKEN" placeholder="buffer_..."
              value={keys.bufferToken} onChange={setKey("bufferToken")} />
            <ApiKeyInput label="Twitter Bearer" envKey="TWITTER_BEARER_TOKEN" placeholder="AAAAAA..."
              value={keys.twitterBearer} onChange={setKey("twitterBearer")} />
            <ApiKeyInput label="PostHog" envKey="NEXT_PUBLIC_POSTHOG_KEY" placeholder="phc_..."
              value={keys.posthogKey} onChange={setKey("posthogKey")} />
          </div>
        </div>

        {/* Voice Prompt */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-white">AI Voice Prompt</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Trains Claude to write exactly like you.</p>
            </div>
            <a href="https://github.com/Bigreddroid/forge/blob/master/prompts/voice-training/founder-voice.md"
              target="_blank" rel="noreferrer" className="text-xs text-orange-400 hover:text-orange-300">Guide</a>
          </div>
          <textarea className="input resize-none font-mono text-xs" rows={10}
            value={voicePrompt} onChange={(e) => setVoicePrompt(e.target.value)} />
        </div>

        {/* ICP Config */}
        <div className="card p-6">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-white">ICP Filters</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Used by Prospect Finder to score and filter leads</p>
          </div>
          <textarea className="input resize-none font-mono text-xs" rows={7}
            value={icpJson} onChange={(e) => setIcpJson(e.target.value)} spellCheck={false} />
        </div>

        {/* n8n Connection */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-white mb-4">n8n Connection</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">n8n Host</label>
              <input className="input" value={n8nHost} onChange={(e) => setN8nHost(e.target.value)} />
            </div>
            <div>
              <label className="label">Webhook Base URL</label>
              <input className="input" defaultValue={`${n8nHost}/webhook`} readOnly />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            {health === "checking" && <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-400" />}
            {health === "up" && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
            {health === "down" && <XCircle className="w-3.5 h-3.5 text-red-400" />}
            {health === "unknown" && <span className="w-3.5 h-3.5 rounded-full border border-zinc-600 inline-block" />}
            <span className={`text-xs ${
              health === "up" ? "text-emerald-400" :
              health === "down" ? "text-red-400" : "text-zinc-500"
            }`}>
              {health === "checking" ? "Checking..." :
               health === "up" ? `n8n reachable at ${n8nHost}` :
               health === "down" ? `n8n unreachable at ${n8nHost}` : "Not checked"}
            </span>
            <button type="button" onClick={checkHealth}
              className="btn-ghost text-xs py-1 px-2 ml-auto" disabled={health === "checking"}>
              <RefreshCw className={`w-3 h-3 ${health === "checking" ? "animate-spin" : ""}`} /> Check
            </button>
          </div>
        </div>

        <button type="submit" disabled={saveStatus === "saving"} className="btn-primary">
          {saveStatus === "saving"
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            : saveStatus === "saved"
            ? <><CheckCircle className="w-4 h-4" /> Saved</>
            : <><Save className="w-4 h-4" /> Save Settings</>}
        </button>
      </form>
    </div>
  );
}
