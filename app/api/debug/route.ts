import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_ID = "appJn6vW6UO1JSDvd";
const TABLE_NAME = "tblyKeuT35fpIhBr0";

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "no api key" }, { status: 500 });

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?pageSize=5`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: `Airtable ${res.status}`, detail: text }, { status: res.status });
  }

  const data = await res.json();
  const records = data.records ?? [];
  const firstRecord = records[0];

  return NextResponse.json({
    fieldNames: firstRecord ? Object.keys(firstRecord.fields) : [],
    phaseValues: records.map((r: { fields: Record<string, unknown> }) => ({
      name: r.fields["Program Name"],
      phaseRaw: r.fields["Phase (TRL/MRL)"],
      phaseType: Array.isArray(r.fields["Phase (TRL/MRL)"]) ? "array" : typeof r.fields["Phase (TRL/MRL)"],
    })),
  });
}
