import translate from "translate";

// Config: Google free sin key
(translate as any).engine = "google";

const CACHE_KEY = "la-peli-translate-cache-v2";
const BATCH_SIZE = 5;

const cache = new Map<string, string>();

try {
  const raw = localStorage.getItem(CACHE_KEY);
  if (raw) {
    const obj = JSON.parse(raw) as Record<string, string>;
    Object.entries(obj).forEach(([k, v]) => cache.set(k, v));
  }
} catch (_e) {
  // localStorage no disponible o JSON corrupto — cache en memoria sigue funcionando
}

function persist() {
  try {
    const obj: Record<string, string> = {};
    cache.forEach((v, k) => {
      obj[k] = v;
    });
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
  } catch (_e) {
    // quota excedida o storage bloqueado — se ignora
  }
}

export async function translateToSpanish(text: string): Promise<string> {
  if (!text || !text.trim()) return text;
  const trimmed = text.trim().slice(0, 900);
  if (cache.has(trimmed)) return cache.get(trimmed)!;

  try {
    const res = await translate(trimmed, { from: "en", to: "es" });
    const out = typeof res === "string" && res.trim() ? res : trimmed;
    cache.set(trimmed, out);
    persist();
    return out;
  } catch {
    return trimmed;
  }
}

export async function translateManyToSpanish(texts: string[], limit = BATCH_SIZE): Promise<string[]> {
  const slice = texts.slice(0, limit);
  const results: string[] = [];

  for (let i = 0; i < slice.length; i++) {
    const t = slice[i];
    if (cache.has(t.trim().slice(0, 900))) {
      results.push(cache.get(t.trim().slice(0, 900))!);
    } else {
      // eslint-disable-next-line no-await-in-loop
      const translated = await translateToSpanish(t);
      results.push(translated);
      if (i < slice.length - 1) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 400));
      }
    }
  }

  // Rellenar resto sin traducir (se traducen on-demand si el usuario hace scroll)
  for (let i = slice.length; i < texts.length; i++) {
    results.push(texts[i]);
  }

  return results;
}

export function getCachedTranslation(text: string): string | undefined {
  return cache.get(text.trim().slice(0, 900));
}
