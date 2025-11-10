import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  // Kinyerjük a "ref" kódot az URL-ből és a JWT tokenből
  const urlRef = url.split(".")[0].replace("https://", "");
  let decodedRef = null;

  try {
    const base64Payload = anon.split(".")[1];
    const jsonPayload = Buffer.from(base64Payload, "base64").toString("utf8");
    const parsed = JSON.parse(jsonPayload);
    decodedRef = parsed?.ref || null;
  } catch (e) {
    // ha a kulcs hibás formátumú
  }

  // Ellenőrzések
  const hasUrl = !!url;
  const hasAnon = !!anon;
  const refsMatch = decodedRef === urlRef;

  const tips = [];

  if (!hasUrl) tips.push("❌ Nincs beállítva NEXT_PUBLIC_SUPABASE_URL a Vercelben.");
  if (!hasAnon) tips.push("❌ Nincs beállítva NEXT_PUBLIC_SUPABASE_ANON_KEY a Vercelben.");
  if (hasUrl && hasAnon && !refsMatch)
    tips.push("⚠️ Az anon key más Supabase projekthez tartozik, mint az URL.");

  return res.status(200).json({
    ok: hasUrl && hasAnon && refsMatch,
    url,
    urlRef,
    decodedRef,
    refsMatch,
    tips,
    note: "Ha refsMatch = false, az URL és az anon key nem ugyanahhoz a Supabase projekthez tartozik.",
  });
}
