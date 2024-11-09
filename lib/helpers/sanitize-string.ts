/**  Sanitize a string by replacing all non-alphanumeric characters with an underscore and converting it to lowercase. */
export function sanitizeString(inputString: string): string {
  return inputString.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}
