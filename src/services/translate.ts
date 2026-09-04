// Traducción gratuita vía MyMemory (sin API key)
// Docs: https://mymemory.translated.net/doc/spec.php
// NO traducir títulos/nombres, solo overview y reviews

const CACHE = new Map<string, string>();

const chunkText = (text: string, maxLen = 450): string[] => {
  if (text.length <= maxLen) return [text];
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let cur = "";
  for (const s of sentences) {
    if ((cur + " " + s).length > maxLen) {
      if (cur) chunks.push(cur.trim());
      if (s.length > maxLen) {
        // force split long sentence
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

export const translateToSpanish = async (text: string): Promise<string> => {
  if (!text || !text.trim()) return text;
  const trimmed = text.trim();
  // si ya parece español, no traducir (heurística simple: contiene ñ o acentos frecuentes)
  // pero dejamos que MyMemory decida; solo evitamos cache miss
  if (CACHE.has(trimmed)) return CACHE.get(trimmed)!;

  // MyMemory detecta idioma automáticamente con langpair en|es
  const chunks = chunkText(trimmed);
  try {
    const translatedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|es`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`MyMemory ${res.status}`);
        const data = await res.json();
        // data.responseData.translatedText o matches
        const t = data?.responseData?.translatedText;
        if (t && typeof t === "string") {
          // MyMemory a veces devuelve el mismo texto si ya está en es
          return t;
        }
        return chunk;
      })
    );
    const result = translatedChunks.join(" ");
    CACHE.set(trimmed, result);
    return result;
  } catch {
    return text;
  }
};

export const translateManyToSpanish = async (texts: string[]): Promise<string[]> => {
  return Promise.all(texts.map((t) => translateToSpanish(t)));
};
