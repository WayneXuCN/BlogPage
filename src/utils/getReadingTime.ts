const WORDS_PER_MINUTE = 200;
const CJK_CHARS_PER_MINUTE = 300;

// Matches CJK Unified Ideographs and common CJK ranges
const CJK_REGEX = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g;

const sanitizeContent = (text: string) => {
  return text
    .replace(/`{3}[\s\S]*?`{3}/g, " ") // code blocks
    .replace(/`[^`]*`/g, " ") // inline code
    .replace(/<[^>]*>/g, " ") // html tags
    .replace(/[#>*_~\-+`]/g, " ") // markdown syntax
    .replace(/\s+/g, " ")
    .trim();
};

export const getReadingTime = (text: string) => {
  const clean = sanitizeContent(text);
  if (!clean) return 1;

  const cjkChars = clean.match(CJK_REGEX)?.length ?? 0;
  const nonCjk = clean.replace(CJK_REGEX, " ").trim();
  const words = nonCjk ? nonCjk.split(/\s+/).filter(Boolean).length : 0;

  const minutes = Math.max(
    1,
    Math.ceil(words / WORDS_PER_MINUTE + cjkChars / CJK_CHARS_PER_MINUTE)
  );
  return minutes;
};

export default getReadingTime;
