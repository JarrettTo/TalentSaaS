export const removeSlash = (str: string) => {
  return str.replace(/^\/|\/$/g, "");
};

export const removeSpaces = (str: string): string => {
  return str.replace(/\s+/g, " ").trim();
};
