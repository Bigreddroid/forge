const BASE = "https://api.apollo.io/v1";

export interface ApolloLead {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  email?: string;
  linkedin_url?: string;
  organization?: { name: string; num_employees?: number };
  score?: number;
}

export async function searchLeads(params: {
  titles: string[];
  minEmployees: number;
  maxEmployees: number;
  page?: number;
}): Promise<ApolloLead[]> {
  const res = await fetch(`${BASE}/mixed_people/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "X-Api-Key": process.env.APOLLO_API_KEY ?? "",
    },
    body: JSON.stringify({
      titles: params.titles,
      organization_num_employees_ranges: [
        `${params.minEmployees},${params.maxEmployees}`,
      ],
      page: params.page ?? 1,
      per_page: 25,
    }),
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Apollo ${res.status}`);
  const data = await res.json();
  return data.people ?? [];
}
