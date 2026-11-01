/**
 * Fixed-window limiter kept in server memory: 5 submissions per IP per minute.
 * Enough for one server; on serverless hosting each instance keeps its own window,
 * so pair it with Supabase's own limits or move it to a shared store if abuse appears.
 */
const WINDOW_MS = 60_000;
const LIMIT = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function allow(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 10_000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    return true;
  }
  entry.count += 1;
  return entry.count <= LIMIT;
}
