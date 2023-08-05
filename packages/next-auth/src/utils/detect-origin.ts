import { envvar } from "../next-shim"

/** Extract the origin from the environment */
export function detectOrigin(forwardedHost: any, protocol: any) {
  // If we detect a Vercel environment, we can trust the host
  if (envvar("VERCEL") ?? envvar("AUTH_TRUST_HOST"))
    return `${protocol === "http" ? "http" : "https"}://${forwardedHost}`

  // If `NEXTAUTH_URL` is `undefined` we fall back to "http://localhost:3000"
  return envvar("NEXTAUTH_URL")
}
