import { NextResponse } from "next/server";

export interface AirtableProgram {
  id: string;
  name: string;
  organization: string;
  offerings: string;
  commercialisationSkills: string;
  purpose: string;
  targetGroup: string;
  cluster: string;
  phase: string;
  deeptechSpecific: boolean;
  accessibleToAllFounders: boolean;
  hyperlink: string;
  remarks: string;
}

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

function toString(val: unknown): string {
  if (!val) return "";
  if (Array.isArray(val)) return val.join(", ");
  return String(val);
}

const BASE_ID = "appJn6vW6UO1JSDvd";
const TABLE_NAME = "tblyKeuT35fpIhBr0";

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AIRTABLE_API_KEY is not set in environment variables" },
      { status: 500 }
    );
  }

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`;

  try {
    const records: AirtableRecord[] = [];
    let offset: string | undefined;

    do {
      const params = new URLSearchParams({ pageSize: "100" });
      if (offset) params.set("offset", offset);

      const res = await fetch(`${url}?${params}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      });

      if (!res.ok) {
        const detail = await res.text();
        return NextResponse.json(
          { error: `Airtable returned ${res.status}`, detail },
          { status: res.status }
        );
      }

      const data = await res.json();
      records.push(...(data.records ?? []));
      offset = data.offset;
    } while (offset);

    const programs: AirtableProgram[] = records.map((r) => ({
      id: r.id,
      name: toString(r.fields["Program Name"]),
      organization: toString(r.fields["Organisation"]),
      offerings: toString(r.fields["Offerings"]),
      commercialisationSkills: toString(r.fields["Commercialisation Skills"]),
      purpose: toString(r.fields["Purpose"]),
      targetGroup: toString(r.fields["Target Group"]),
      cluster: toString(r.fields["Cluster"]),
      phase: toString(r.fields["Phase"]),
      deeptechSpecific: false,
      accessibleToAllFounders: Boolean(r.fields["Accessible to all founders"]),
      hyperlink: toString(r.fields["Hyperlink"]),
      remarks: toString(r.fields["Remarks"] ?? ""),
    }));

    return NextResponse.json(programs);
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error", detail: String(err) },
      { status: 500 }
    );
  }
}
