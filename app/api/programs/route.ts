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
  fields: Record<string, string | boolean | string[]>;
}

function toString(val: unknown): string {
  if (!val) return "";
  if (Array.isArray(val)) return val.join(", ");
  return String(val);
}

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;

  if (!apiKey || !baseId || !tableName) {
    return NextResponse.json(
      {
        error: "Missing Airtable configuration",
        missing: {
          apiKey: !apiKey,
          baseId: !baseId,
          tableName: !tableName,
        },
      },
      { status: 500 }
    );
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

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
        const err = await res.text();
        console.error("Airtable error:", res.status, err);
        return NextResponse.json(
          { error: "Airtable request failed", status: res.status, detail: err },
          { status: res.status }
        );
      }

      const data = await res.json();
      records.push(...data.records);
      offset = data.offset;
    } while (offset);

    const programs: AirtableProgram[] = records.map((r) => ({
      id: r.id,
      name: toString(r.fields["program name"]),
      organization: toString(r.fields["organization"]),
      offerings: toString(r.fields["offerings"]),
      commercialisationSkills: toString(r.fields["commercialisation skills"]),
      purpose: toString(r.fields["purpose"]),
      targetGroup: toString(r.fields["target group"]),
      cluster: toString(r.fields["cluster"]),
      phase: toString(r.fields["phase"]),
      deeptechSpecific: Boolean(r.fields["deeptech specific"]),
      accessibleToAllFounders: Boolean(r.fields["accessible to all founders"]),
      hyperlink: toString(r.fields["hyperlink"]),
      remarks: toString(r.fields["remarks"]),
    }));

    return NextResponse.json(programs);
  } catch (err) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Internal error", detail: String(err) },
      { status: 500 }
    );
  }
}
