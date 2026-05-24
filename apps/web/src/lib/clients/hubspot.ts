const BASE = "https://api.hubapi.com";

function headers() {
  return {
    Authorization: `Bearer ${process.env.HUBSPOT_API_KEY ?? ""}`,
    "Content-Type": "application/json",
  };
}

export interface HubSpotContact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    jobtitle?: string;
    company?: string;
    linkedin?: string;
    forge_lead_score?: string;
    lead_source?: string;
    lifecyclestage?: string;
    createdate?: string;
  };
}

export async function getContacts(limit = 20): Promise<HubSpotContact[]> {
  const res = await fetch(
    `${BASE}/crm/v3/objects/contacts?limit=${limit}&properties=firstname,lastname,email,jobtitle,company,linkedin,forge_lead_score,lead_source,lifecyclestage,createdate`,
    { headers: headers(), next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`HubSpot ${res.status}`);
  const data = await res.json();
  return data.results ?? [];
}

export async function getContactCount(): Promise<number> {
  const res = await fetch(`${BASE}/crm/v3/objects/contacts?limit=1`, {
    headers: headers(),
    next: { revalidate: 60 },
  });
  if (!res.ok) return 0;
  const data = await res.json();
  return data.total ?? 0;
}
