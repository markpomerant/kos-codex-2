/**
 * Service layer for the project model: the endpoints it calls and the
 * types derived from them. Standalone service functions for callers outside a
 * model context belong here too.
 */
import {
  endpoint,
  type EndpointResponse,
  type EndpointCtx,
} from '../../../utils/services/codex/v1/service';

export const ProjectEndpoints = {
  startSync: endpoint(
    '/api/codex/objects/additional-data/{numOfItems}',
    'post'
  ),
} as const;
export type ProjectOperationProgress = {
  stage: string;
  percentComplete: number;
  currentItem?: string;
  totalItems?: number;
};
export type ProjectOperationResult = {
  success: boolean;
  message?: string;
  data?: unknown;
};
export type StartSyncData = EndpointResponse<typeof ProjectEndpoints.startSync>;

export const toStartSyncData = (
  raw: EndpointResponse<typeof ProjectEndpoints.startSync>
): StartSyncData => raw;

export type StartSyncCtx = EndpointCtx<
  typeof ProjectEndpoints.startSync,
  StartSyncData
>;
