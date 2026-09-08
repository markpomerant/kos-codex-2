/**
 * Service layer for the timer model: the endpoints it calls and the
 * types derived from them. Standalone service functions for callers outside a
 * model context belong here too.
 */
import {
  endpoint,
  type EndpointResponse,
  type EndpointCtx,
} from '../../../utils/services/codex/v1/service';

export const TimerEndpoints = {
  startShort: endpoint(
    '/api/codex/objects/additional-data/{numOfItems}',
    'post'
  ),
} as const;

export type StartShortData = EndpointResponse<typeof TimerEndpoints.startShort>;

export const toStartShortData = (
  raw: EndpointResponse<typeof TimerEndpoints.startShort>
): StartShortData => raw;

export type StartShortCtx = EndpointCtx<
  typeof TimerEndpoints.startShort,
  StartShortData
>;
