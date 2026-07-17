export interface CodeFile {
  path: string;
  label: string;
  content: string;
}

export interface CardCodeEntry {
  componentName: string;
  mainFile: CodeFile;
  dependencies: CodeFile[];
  npmPackages: string[];
  installCommand: string;
}

export interface CodeEntryMetadata {
  componentName: string;
  mainFile: Pick<CodeFile, "path" | "label">;
  npmPackages: string[];
  dependencies: Array<Pick<CodeFile, "path" | "label">>;
  installCommand: string;
}

export type PublicCodeFile = Pick<CodeFile, "path" | "label" | "content">;

export interface PublicCodeEntry {
  componentName: string;
  mainFile: PublicCodeFile;
  dependencies: PublicCodeFile[];
  npmPackages: string[];
  installCommand: string;
}

export interface CodeEntryResponse {
  entry: PublicCodeEntry;
  sharedCssNotes: string;
}