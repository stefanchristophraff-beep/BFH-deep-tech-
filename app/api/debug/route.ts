import { NextResponse } from "next/server";

const BASE_ID = "appJn6vW6UO1JSDvd";
const TABLE_NAME = "tblyKeuT35fpIhBr0";

export async function GET() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "no api key" }, { status: 500 });

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?pageSize=1`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });

  const data = await res.json();
  // Return only the fields of the first record so we can see the real field names
  const firstRecord = data.records?.[0];
  return NextResponse.json({
    fieldNames: firstRecord ? Object.keys(firstRecord.fields) : [],
    firstRecord: firstRecord ?? null,
  });
}
