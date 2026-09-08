/**
 * Service layer for the device model: the endpoints it calls and the
 * types derived from them. Standalone service functions for callers outside a
 * model context belong here too.
 */
import {
  endpoint,
  type EndpointResponse,
  type EndpointCtx,
} from '../../../utils/services/codex/v1/service';

export const DeviceEndpoints = {
  publishEvent: endpoint('/api/codex/test/event', 'post'),
  addObject: endpoint('/api/codex/test/objects/added', 'post'),
  removeObject: endpoint('/api/codex/test/objects/removed', 'post'),
  raiseTrouble: endpoint('/api/codex/test/troubles/raise', 'post'),
  removeTrouble: endpoint('/api/codex/test/troubles/remove', 'post'),
} as const;

/** Body for the event endpoint. The spec types the untyped Java payload as an
 *  empty record, so the one adaptation the codex needs lives here, not in the model. */
export type PublishEventBody = NonNullable<
  Parameters<NonNullable<PublishEventCtx['$request']>>[0]
>['body'];
export const toEventBody = (
  topic: string,
  payload: unknown
): PublishEventBody => ({
  topic,
  payload: payload as Record<string, never>,
});

export type PublishEventData = EndpointResponse<
  typeof DeviceEndpoints.publishEvent
>;

export const toPublishEventData = (
  raw: EndpointResponse<typeof DeviceEndpoints.publishEvent>
): PublishEventData => raw;

export type PublishEventCtx = EndpointCtx<
  typeof DeviceEndpoints.publishEvent,
  PublishEventData
>;
export type AddObjectData = EndpointResponse<typeof DeviceEndpoints.addObject>;

export const toAddObjectData = (
  raw: EndpointResponse<typeof DeviceEndpoints.addObject>
): AddObjectData => raw;

export type AddObjectCtx = EndpointCtx<
  typeof DeviceEndpoints.addObject,
  AddObjectData
>;
export type RemoveObjectData = EndpointResponse<
  typeof DeviceEndpoints.removeObject
>;

export const toRemoveObjectData = (
  raw: EndpointResponse<typeof DeviceEndpoints.removeObject>
): RemoveObjectData => raw;

export type RemoveObjectCtx = EndpointCtx<
  typeof DeviceEndpoints.removeObject,
  RemoveObjectData
>;
export type RaiseTroubleData = EndpointResponse<
  typeof DeviceEndpoints.raiseTrouble
>;

export const toRaiseTroubleData = (
  raw: EndpointResponse<typeof DeviceEndpoints.raiseTrouble>
): RaiseTroubleData => raw;

export type RaiseTroubleCtx = EndpointCtx<
  typeof DeviceEndpoints.raiseTrouble,
  RaiseTroubleData
>;
export type RemoveTroubleData = EndpointResponse<
  typeof DeviceEndpoints.removeTrouble
>;

export const toRemoveTroubleData = (
  raw: EndpointResponse<typeof DeviceEndpoints.removeTrouble>
): RemoveTroubleData => raw;

export type RemoveTroubleCtx = EndpointCtx<
  typeof DeviceEndpoints.removeTrouble,
  RemoveTroubleData
>;
