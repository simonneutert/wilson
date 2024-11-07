export function sanitizeString(inputString: string): string {
    return inputString.replace(/[^a-z0-9]/gi, "_").toLowerCase();
}
