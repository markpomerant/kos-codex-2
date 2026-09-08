/**
 * Service layer for the task model: the endpoints it calls and the
 * types derived from them. Standalone service functions for callers outside a
 * model context belong here too.
 */
import {
  endpoint,
  type EndpointResponse,
  type EndpointCtx,
} from '../../../utils/services/codex/v1/service';

export const TaskEndpoints = {
  startAdditionalData: endpoint(
    '/api/codex/objects/additional-data/{numOfItems}',
    'post'
  ),
} as const;

export type StartAdditionalDataData = EndpointResponse<
  typeof TaskEndpoints.startAdditionalData
>;

export const toStartAdditionalDataData = (
  raw: EndpointResponse<typeof TaskEndpoints.startAdditionalData>
): StartAdditionalDataData => raw;

export type StartAdditionalDataCtx = EndpointCtx<
  typeof TaskEndpoints.startAdditionalData,
  StartAdditionalDataData
>;

/** What Studio reports on the future's clientData while the work runs. */
export interface TaskOperationProgress {
  stage?: string;
  percentComplete?: number;
}
