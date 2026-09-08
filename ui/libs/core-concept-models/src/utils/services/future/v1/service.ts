import {
  kosServiceRequest as baseKosServiceRequest,
  createClient,
  type ClientResponse,
  type HttpMethod,
  type IKosServiceRequestParams,
  type KosExecutionContext,
  type PathsByMethod,
} from "@kosdev-code/kos-ui-sdk"
import type { paths } from "./openapi";

/**
 * Type aliases for future API
 */
export type Api = paths;
export type ApiPath = keyof paths;
export type ValidPaths = PathsByMethod<paths>;

/**
 * Methods a response type can be derived for — the lowercase subset of
 * HttpMethod. The uppercase spellings HttpMethod also permits do not match the
 * keys of an OpenAPI `paths` object, so they would silently yield `unknown`.
 */
export type SupportedMethod = "get" | "post" | "put" | "delete" | "patch";

/**
 * Get client response type for future API
 */
export type ApiResponse<
  Path extends ApiPath,
  Method extends SupportedMethod = "get"
> = ClientResponse<paths, Path, Method>;

/**
 * Get execution context type for future API
 */
export type ExecutionContext<
  Path extends ApiPath = ApiPath,
  Method extends HttpMethod = "get",
  Transformed = ApiResponse<Path, SupportedMethod & Method>
> = KosExecutionContext<paths, Path, Method, Transformed>;

/**
 * Typed decorator factory for @kosServiceRequest with future API types
 *
 * Provides full IntelliSense and type safety for path, query params, and body
 * based on the future OpenAPI schema.
 *
 * @example
 * ```typescript
 * import { kosServiceRequest } from '../../utils/services/future/v1/service';
 * import { DependencyLifecycle } from '@kosdev-code/kos-ui-sdk';
 *
 * @kosServiceRequest({
 *   path: '/api/...',
 *   method: 'get',
 *   lifecycle: DependencyLifecycle.LOAD
 * })
 * private onDataLoaded(): void {
 *   // Fully typed based on future API
 * }
 * ```
 */
export function kosServiceRequest<
  Path extends ApiPath,
  Method extends HttpMethod = "get",
  Response = any,
  TransformedResponse = Response
>(
  params: IKosServiceRequestParams<
    paths,
    Path,
    Method,
    Response,
    TransformedResponse
  >
) {
  return baseKosServiceRequest<
    paths,
    Path,
    Method,
    Response,
    TransformedResponse
  >(params);
}

/**
 * One endpoint of the future API: a path and the method it is called with.
 */
export interface Endpoint {
  path: ApiPath;
  method: SupportedMethod;
}

/**
 * Declare an endpoint once. The decorator config, the execution context type
 * and the response type are all derived from the result, so a path string is
 * never restated — and never drifts between the three.
 *
 * @example
 * ```typescript
 * export const BoardApi = {
 *   list: endpoint("/api/board", "get"),
 *   update: endpoint("/api/board/{id}", "put"),
 * } as const;
 * ```
 */
export function endpoint<Path extends ApiPath, Method extends SupportedMethod>(
  path: Path,
  method: Method
) {
  return { path, method } as const;
}

/**
 * Execution context for an endpoint — the method-driven `$ctx` parameter type.
 * Pass `Transformed` when the decorator declares a `transform`, so what the
 * method receives is typed as the mapper's output rather than the raw response.
 */
export type EndpointCtx<
  E extends Endpoint,
  Transformed = EndpointResponse<E>
> = ExecutionContext<E["path"], E["method"], Transformed>;

/** Response body type for an endpoint. */
export type EndpointResponse<E extends Endpoint> = ApiResponse<
  E["path"],
  E["method"]
>;

/**
 * @kosServiceRequest preconfigured from an endpoint descriptor, defaulting to
 * log-and-continue error handling. Pass overrides (lifecycle, errorHandler,
 * cache, …) as the second argument.
 *
 * A `transform` narrows what the model receives: its return type becomes the
 * handler's data type, so the raw response shape stops at the mapper.
 *
 * @example
 * ```typescript
 * @serviceRequest(BoardApi.update)
 * async renameBoard(name: string, $ctx?: EndpointCtx<typeof BoardApi.update>) {
 *   const data = await executeServiceRequest(this, $ctx, {
 *     pathParams: { id: this.id },
 *     body: { name },
 *   });
 *   if (!data) return;
 * }
 * ```
 */
export function serviceRequest<
  E extends Endpoint,
  Transformed = EndpointResponse<E>
>(
  ep: E,
  opts?: Partial<
    IKosServiceRequestParams<
      paths,
      E["path"],
      E["method"],
      EndpointResponse<E>,
      Transformed
    >
  >
) {
  return kosServiceRequest<
    E["path"],
    E["method"],
    EndpointResponse<E>,
    Transformed
  >({
    path: ep.path,
    method: ep.method,
    errorHandler: { strategy: "log", defaultValue: null },
    ...opts,
  });
}

/**
 * `serviceRequest` for an endpoint the generated types do not declare yet.
 *
 * There is no `paths` entry to derive anything from, so the response shape is
 * supplied by hand instead: `Raw` is what the backend is expected to serve (the
 * UNWRAPPED `data` payload — the client strips the `{status, data}` envelope
 * before `transform` runs) and `Transformed` is what `transform` returns. Path
 * and query params are untyped for the same reason.
 *
 * Every use is a debt, and the name is there to be grepped. When the endpoint
 * lands: re-run `api:generate`, drop the `as ApiPath` cast on its `endpoint(...)`
 * entry, point the raw type at `EndpointResponse<...>`, and switch back to
 * `serviceRequest`. The transform survives all of it unchanged.
 *
 * @example
 * ```typescript
 * export const BoardApi = {
 *   // PROVISIONAL — no /api/board/grants in the generated types yet.
 *   loadGrants: endpoint("/api/board/grants" as ApiPath, "get"),
 * } as const;
 *
 * @provisionalServiceRequest<GrantBean[], Grant[]>(BoardApi.loadGrants, {
 *   lifecycle: DependencyLifecycle.LOAD,
 *   transform: toGrants,
 * })
 * onGrantsLoaded(error: string | null, grants: Grant[]) {}
 * ```
 */
export function provisionalServiceRequest<Raw, Transformed = Raw>(
  ep: { readonly path: string; readonly method: string },
  opts?: Partial<
    IKosServiceRequestParams<
      Record<string, any>,
      string,
      HttpMethod,
      Raw,
      Transformed
    >
  >
) {
  return baseKosServiceRequest<
    Record<string, any>,
    string,
    HttpMethod,
    Raw,
    Transformed
  >({
    path: ep.path,
    method: ep.method as HttpMethod,
    errorHandler: { strategy: "log", defaultValue: null },
    ...opts,
  });
}

/**
 * Create an API client for future
 */
export const api = createClient<paths>();

export default api;
