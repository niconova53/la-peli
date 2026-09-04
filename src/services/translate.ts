// Traducción vía MyMemory (free, sin key) — con throttling y fallback
// NO traducir títulos/nombres, solo overview y reviews
// MyMemory tiene rate limit estricto → queue + delay + detección ES para no disparar requests innecesarios

const CACHE = new Map<string, string>();

// Heurística: si ya parece español, no traducir
const looksSpanish = (text: string): boolean => {
  const t = text.toLowerCase();
  // caracteres propios del español
  if (/[ñáéíóúü¿¡]/.test(t)) return true;
  // palabras muy frecuentes en ES que raramente aparecen en EN
  const esMarkers = /\b(el|la|los|las|de|del|que|con|una|para|por|como|cómo|cuando|donde|dónde|esta|está|este|esto|pero|sin|sobre|entre|hasta|desde|todo|todos|muy|más|también|tiene|años?)\b/;
  // si tiene varios marcadores, probablemente ya está en ES
  const matches = t.match(new RegExp(esMarkers, "g"));
  if (matches && matches.length >= 3) return true;
  return false;
};

const chunkText = (text: string, maxLen = 450): string[] => {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let cur = "";
  for (const s of sentences) {
    if ((cur + " " + s).length > maxLen) {
      if (cur) chunks.push(cur.trim());
      if (s.length > maxLen) {
        for (let i = 0; i < s.length; i += maxLen) chunks.push(s.slice(i, i + maxLen));
        cur = "";
      } else {
        cur = s;
      }
    } else {
      cur = cur ? cur + " " + s : s;
    }
  }
  if (cur) chunks.push(cur.trim());
  return chunks;
};

// Queue serial con delay entre requests para no saturar MyMemory
let queue: Promise<void> = Promise.resolve();
const enqueue = <T>(fn: () => Promise<T>, delayMs = 600): Promise<T> => {
  const run = queue.then(() => fn());
  queue = run.then(
    () => new Promise<void>((r) => setTimeout(r, delayMs)),
    () => new Promise<void>((r) => setTimeout(r, delayMs))
  );
  return run;
};

const fetchWithBackoff = async (url: string, retries = 1): Promise<any> => {
  const res = await fetch(url);
  if (res.status === 429) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500));
      return fetchWithBackoff(url, retries - 1);
    }
    throw new Error("MyMemory 429");
  }
  if (!res.ok) throw new Error(`MyMemory ${res.status}`);
  return res.json();
};

export const translateToSpanish = async (text: string): Promise<string> => {
  if (!text || !text.trim()) return text;
  const trimmed = text.trim();
  if (CACHE.has(trimmed)) return CACHE.get(trimmed)!;
  // si ya parece español, cachear original y no llamar API
  if (looksSpanish(trimmed)) {
    CACHE.set(trimmed, trimmed);
    return trimmed;
  }

  const chunks = chunkText(trimmed);
  try {
    const translatedChunks = await enqueue(async () => {
      const out: string[] = [];
      for (const chunk of chunks) {
        if (looksSpanish(chunk)) {
          out.push(chunk);
          continue;
        }
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|es`;
        try {
          const data = await fetchWithBackoff(url);
          const t = data?.responseData?.translatedText;
          out.push(t && typeof t === "string" && t.trim() ? t : chunk);
        } catch {
          out.push(chunk);
        }
        if (chunks.length > 1) await new Promise((r) => setTimeout(r, 400));
      }
      return out;
    });

    const result = translatedChunks.join(" ");
    CACHE.set(trimmed, result);
    return result;
  } catch {
    return text;
  }
};

export const translateManyToSpanish = async (texts: string[]): Promise<string[]> => {
  // Reviews: traducir siempre (son en EN), con concurrencia limitada para no 429
  // Sin looksSpanish check — reviews de TMDB siempre vienen en inglés
  const results: string[] = new Array(texts.length);
  const CONCURRENCY = 3;
  let idx = 0;

  async function worker() {
    while (idx < texts.length) {
      const i = idx++;
      // eslint-disable-next-line no-await-in-loop
      results[i] = await translateToSpanish(texts[i]);
      if (idx < texts.length) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 350));
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, texts.length) }, () => worker()));
  return results;
};
