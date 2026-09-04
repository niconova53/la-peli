// Traducción MyMemory — modo bajo demanda con cache persistente
// TMDB ya devuelve overview en es-ES (language=es-ES), solo reviews necesitan traducir y bajo demanda
// para no agotar quota diaria (1000 requests/día free)

const CACHE = new Map<string, string>();

// Cargar cache de localStorage
try {
  const saved = localStorage.getItem("la-peli-translate-cache");
  if (saved) {
    const obj = JSON.parse(saved);
    Object.entries(obj).forEach(([k, v]) => CACHE.set(k, v as string));
  }
} catch {}

const persistCache = () => {
  try {
    const obj: Record<string, string> = {};
    CACHE.forEach((v, k) => {
      obj[k] = v;
    });
    localStorage.setItem("la-peli-translate-cache", JSON.stringify(obj));
  } catch {}
};

let quotaExhaustedUntil: number | null = null;

export const isQuotaExhausted = () => quotaExhaustedUntil !== null && Date.now() < quotaExhaustedUntil;

export const translateToSpanish = async (text: string): Promise<string> => {
  if (!text || !text.trim()) return text;
  const trimmed = text.trim();
  if (CACHE.has(trimmed)) return CACHE.get(trimmed)!;
  if (isQuotaExhausted()) return trimmed;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed.slice(0, 500))}&langpair=en|es`;
    const res = await fetch(url);
    const data = await res.json();

    // Detectar quota agotada
    const translatedText: string = data?.responseData?.translatedText || "";
    if (translatedText.includes("MYMEMORY WARNING") || data?.responseStatus === 429) {
      // quota diaria agotada — bloquear por 4h
      quotaExhaustedUntil = Date.now() + 4 * 60 * 60 * 1000;
      return trimmed;
    }

    if (translatedText && translatedText.trim() && translatedText !== trimmed) {
      CACHE.set(trimmed, translatedText);
      persistCache();
      return translatedText;
    }
    // Si devuelve igual, cachear igual para no reintentar
    CACHE.set(trimmed, trimmed);
    return trimmed;
  } catch {
    return text;
  }
};
