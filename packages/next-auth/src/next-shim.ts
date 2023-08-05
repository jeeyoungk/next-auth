import { IncomingMessage, ServerResponse } from "http"
import { ParsedUrlQuery } from "querystring"

declare type Send<T> = (body: T) => void
export type PreviewData = string | false | object | undefined
export declare type Env = {
  [key: string]: string | undefined
}

export declare type NextApiRequestCookies = Partial<{
  [key: string]: string
}>

export type GetServerSidePropsContext<
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData
> = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
  res: ServerResponse
  params?: Params
  query: ParsedUrlQuery
  preview?: boolean
  previewData?: Preview
  resolvedUrl: string
  locale?: string
  locales?: string[]
  defaultLocale?: string
}

export interface NextApiRequest extends IncomingMessage {
  /**
   * Object of `query` values from url
   */
  query: Partial<{
    [key: string]: string | string[]
  }>
  /**
   * Object of `cookies` from header
   */
  cookies: Partial<{
    [key: string]: string
  }>
  body: any
  env: Env
  preview?: boolean
  /**
   * Preview data set on the request, if any
   * */
  previewData?: PreviewData
}

export declare type NextApiResponse<Data = any> = ServerResponse & {
  /**
   * Send data `any` data in response
   */
  send: Send<Data>
  /**
   * Send data `json` data in response
   */
  json: Send<Data>
  status: (statusCode: number) => NextApiResponse<Data>
  redirect(url: string): NextApiResponse<Data>
  redirect(status: number, url: string): NextApiResponse<Data>
  /**
   * Set preview data for Next.js' prerender mode
   */
  setPreviewData: (
    data: object | string,
    options?: {
      /**
       * Specifies the number (in seconds) for the preview session to last for.
       * The given number will be converted to an integer by rounding down.
       * By default, no maximum age is set and the preview session finishes
       * when the client shuts down (browser is closed).
       */
      maxAge?: number
      /**
       * Specifies the path for the preview session to work under. By default,
       * the path is considered the "default path", i.e., any pages under "/".
       */
      path?: string
    }
  ) => NextApiResponse<Data>
  /**
   * Clear preview data for Next.js' prerender mode
   */
  clearPreviewData: (options?: { path?: string }) => NextApiResponse<Data>
  /**
   * Revalidate a specific page and regenerate it using On-Demand Incremental
   * Static Regeneration.
   * The path should be an actual path, not a rewritten path. E.g. for
   * "/blog/[slug]" this should be "/blog/post-1".
   * @link https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation
   */
  revalidate: (
    urlPath: string,
    opts?: {
      unstable_onlyGenerated?: boolean
    }
  ) => Promise<void>
}
