const BASE = process.env.N8N_HOST ?? "http://localhost:5678";
const API_KEY = process.env.N8N_API_KEY ?? "";

function headers() {
  return { "X-N8N-API-KEY": API_KEY, "Content-Type": "application/json" };
}

export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  updatedAt: string;
  tags: { name: string }[];
}

export interface N8nExecution {
  id: string;
  workflowId: string;
  status: "success" | "error" | "running" | "waiting";
  startedAt: string;
  stoppedAt?: string;
  workflowData?: { name: string };
}

export async function getWorkflows(): Promise<N8nWorkflow[]> {
  const res = await fetch(`${BASE}/api/v1/workflows?limit=25`, {
    headers: headers(),
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`n8n ${res.status}`);
  const data = await res.json();
  return data.data ?? [];
}

export async function getExecutions(limit = 20): Promise<N8nExecution[]> {
  const res = await fetch(`${BASE}/api/v1/executions?limit=${limit}&includeData=false`, {
    headers: headers(),
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`n8n executions ${res.status}`);
  const data = await res.json();
  return data.data ?? [];
}

export async function getExecutionCount(workflowId: string): Promise<number> {
  const res = await fetch(
    `${BASE}/api/v1/executions?workflowId=${workflowId}&limit=1`,
    { headers: headers(), next: { revalidate: 60 } }
  );
  if (!res.ok) return 0;
  const data = await res.json();
  return data.count ?? 0;
}
