const WORDS_PER_MINUTE = 200;

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
  const words = clean ? clean.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return minutes;
};

export default getReadingTime;
