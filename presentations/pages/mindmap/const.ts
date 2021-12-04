export const filteringMindMapContents = (f: any) =>
  (f.name as string).endsWith(".km") && f.type === "file";
