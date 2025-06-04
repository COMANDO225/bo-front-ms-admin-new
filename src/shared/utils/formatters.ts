// formatters file

// Converts a base64url encoded string to a base64 encoded string
export function base64UrlToBase64(input: string): string {
    const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
    return base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=')
}