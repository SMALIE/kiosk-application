/**
 * Translation service using LibreTranslate
 *
 * To use this module, you need to run LibreTranslate Docker container:
 *
 * docker run -td --name libretranslate \
 *   -p 8888:5000 \
 *   -e LT_LOAD_ONLY=pl,en,uk \
 *   libretranslate/libretranslate
 *
 * This will start LibreTranslate on port 8888 with Polish, English, and Ukrainian language support.
 * You can add more languages by modifying the LT_LOAD_ONLY environment variable.
 */

import axios from 'axios';

const apiUrl = process.env.LIBRE_API_URL || 'http://localhost:8888';
const translateEndpoint = `${apiUrl}/translate`;
const languagesEndpoint = `${apiUrl}/languages`;

let supportedPairs: Set<string> | null = null;

type TranslateTextParams = {
  text: string;
  targetLang: string;
  sourceLang?: string;
  pivotLang?: string;
};

interface LanguageInfo {
  code: string;
  name: string;
  targets?: string[];
}

async function fetchSupportedPairs(): Promise<Set<string>> {
  if (supportedPairs) return supportedPairs;

  const { data } = await axios.get<LanguageInfo[]>(languagesEndpoint);
  const pairs = new Set<string>();

  data.forEach(({ code: src, targets }) => {
    if (Array.isArray(targets)) {
      targets.forEach((tgt) => {
        pairs.add(`${src}-${tgt}`);
      });
    }
  });

  supportedPairs = pairs;
  return supportedPairs;
}

async function doTranslate({ text, source, target }: { text: string; source: string; target: string }): Promise<string> {
  const { data } = await axios.post(translateEndpoint, {
    q: text,
    source,
    target,
    format: 'text',
  });

  if (!data.translatedText) {
    throw new Error("Brak 'translatedText' w odpowiedzi LibreTranslate");
  }

  return data.translatedText;
}

export async function translateText({ text, targetLang, sourceLang = 'pl', pivotLang = 'en' }: TranslateTextParams): Promise<string> {
  const pairs = await fetchSupportedPairs();
  const direct = `${sourceLang}-${targetLang}`;

  if (pairs.has(direct)) {
    return doTranslate({ text, source: sourceLang, target: targetLang });
  }

  const pivot1 = `${sourceLang}-${pivotLang}`;
  const pivot2 = `${pivotLang}-${targetLang}`;

  if (pairs.has(pivot1) && pairs.has(pivot2)) {
    const intermediate = await doTranslate({ text, source: sourceLang, target: pivotLang });
    return doTranslate({ text: intermediate, source: pivotLang, target: targetLang });
  }

  throw new Error(`Brak wsparcia dla tłumaczenia ${sourceLang} → ${targetLang}, również przez ${pivotLang}`);
}
