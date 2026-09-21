// Reads the published Ground D technician sheet on the server and hands the
// browser plain CSV, so the sheet id never appears in the page source.
// To point at a different sheet or tab, set SHEET_PUBLISH_ID / SHEET_GID in
// Vercel -> Settings -> Environment Variables. With no gid, Google returns the
// first tab (Form Responses 1).

const PUBLISH_ID = process.env.SHEET_PUBLISH_ID ||
  '2PACX-1vQI1SWr7DTjMIFee9HSyl5itIeyo48LVy7RMlw1CyD3z3DofXPYXYmD9rZFHkW87rpavMmcsR4OlIKa';
const GID = process.env.SHEET_GID || '';

export default async function handler(req, res) {
  const base = `https://docs.google.com/spreadsheets/d/e/${PUBLISH_ID}/pub`;
  const url = GID ? `${base}?gid=${GID}&single=true&output=csv` : `${base}?output=csv`;

  try {
    const upstream = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; duty-board/1.0)' }
    });

    if (!upstream.ok) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(502).json({ error: `Google returned ${upstream.status}.` });
    }

    const text = await upstream.text();
    if (/^\s*</.test(text)) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(502).json({ error: 'The sheet is no longer published to the web.' });
    }

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=120');
    return res.status(200).send(text);
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ error: 'Unable to reach the sheet.' });
  }
}
