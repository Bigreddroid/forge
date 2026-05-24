import { NextResponse } from "next/server";
import { getContacts } from "@/lib/clients/hubspot";

const MOCK_LEADS = [
  { name: "Alex Chen", title: "Founder", company: "DataStack", score: 92, source: "LinkedIn", status: "SQL", addedDays: 1 },
  { name: "Sarah Mills", title: "CEO", company: "Pulse AI", score: 78, source: "Content", status: "MQL", addedDays: 2 },
  { name: "James Park", title: "Co-Founder", company: "Flowbase", score: 85, source: "Outreach", status: "SQL", addedDays: 3 },
  { name: "Priya Nair", title: "Founder", company: "Kira Health", score: 61, source: "LinkedIn", status: "MQL", addedDays: 4 },
  { name: "Tom Walsh", title: "CEO", company: "Clearops", score: 45, source: "Organic", status: "Lead", addedDays: 5 },
  { name: "Anika Soto", title: "Founder", company: "Vantir", score: 88, source: "Outreach", status: "SQL", addedDays: 6 },
  { name: "Marcus Liu", title: "Co-Founder", company: "Drafter", score: 33, source: "Content", status: "Lead", addedDays: 8 },
  { name: "Elena Novak", title: "CEO", company: "Rove Labs", score: 71, source: "LinkedIn", status: "MQL", addedDays: 9 },
];

function scoreToStatus(score: number) {
  if (score >= 80) return "SQL";
  if (score >= 50) return "MQL";
  return "Lead";
}

function daysSince(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / 86_400_000);
}

export async function GET() {
  if (!process.env.HUBSPOT_API_KEY) {
    return NextResponse.json({ leads: MOCK_LEADS, source: "mock" });
  }

  try {
    const contacts = await getContacts(25);
    const leads = contacts.map((c) => {
      const score = parseInt(c.properties.forge_lead_score ?? "40");
      return {
        name: `${c.properties.firstname ?? ""} ${c.properties.lastname ?? ""}`.trim() || "Unknown",
        title: c.properties.jobtitle ?? "Founder",
        company: c.properties.company ?? "—",
        score: isNaN(score) ? 40 : score,
        source: c.properties.lead_source?.replace("FORGE ", "") ?? "Direct",
        status: scoreToStatus(isNaN(score) ? 40 : score),
        addedDays: c.properties.createdate ? daysSince(c.properties.createdate) : 0,
      };
    });
    return NextResponse.json({ leads, source: "hubspot" });
  } catch (e) {
    console.error("HubSpot error:", e);
    return NextResponse.json({ leads: MOCK_LEADS, source: "mock" });
  }
}
