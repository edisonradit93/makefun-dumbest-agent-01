export function getDumbestMoment(): string {
  return "My agent spent 14 minutes debugging why localhost refused connections, rewrote the TLS config thrice, then triumphantly discovered it had never actually started the server.";
}

export function validateLine(line: string): string {
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry line must be a single line.");
  }
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    throw new Error("Entry line cannot be empty.");
  }
  if (trimmed.length > 200) {
    throw new Error(`Entry line exceeds 200 characters (${trimmed.length}).`);
  }
  const utf8Bytes = new TextEncoder().encode(trimmed).length;
  if (utf8Bytes > 200) {
    throw new Error(`Entry line exceeds 200 UTF-8 bytes (${utf8Bytes}).`);
  }
  return trimmed;
}
