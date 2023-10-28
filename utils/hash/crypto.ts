import * as serverCrypto from 'crypto'

export const calculateSHA256Hash = async (text: string): Promise<string> => {
  if (process.server) {
    return serverCrypto.createHash('sha256').update(text).digest('base64')
  }
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  return base64
}
