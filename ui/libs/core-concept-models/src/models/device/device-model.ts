/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  PublicModelInterface,
  KosModelRegistrationType,
} from '@kosdev-code/kos-ui-sdk';
import {
  kosModel,
  kosLoggerAware,
  KosLoggerAware,
  executeServiceRequest,
} from '@kosdev-code/kos-ui-sdk';

import type { DeviceOptions } from './types';
import { serviceRequest } from '../../utils/services/codex/v1/service';
import {
  DeviceEndpoints,
  toPublishEventData,
  toEventBody,
  type PublishEventCtx,
  toAddObjectData,
  type AddObjectCtx,
  toRemoveObjectData,
  type RemoveObjectCtx,
  toRaiseTroubleData,
  type RaiseTroubleCtx,
  toRemoveTroubleData,
  type RemoveTroubleCtx,
} from './services';

export const MODEL_TYPE = 'device-model';

export type DeviceModel = PublicModelInterface<DeviceModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DeviceModelImpl extends KosLoggerAware {}

@kosModel({ modelTypeId: MODEL_TYPE, singleton: true })
@kosLoggerAware()
export class DeviceModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<DeviceModel, DeviceOptions>;

  id: string;
  eventsSent: number = 0;
  lastEvent: string = '';
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: DeviceOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      // Copy options VERBATIM (this.x = options.x). Derivation belongs in
      // computed getters or the DTO mapper — never transform inputs here.
    }
  }

  updateModel(_options: DeviceOptions): void {
    // Rename _options to options when implementing. Copy fields in place
    // (same verbatim rule as the constructor). Cross-model reads =
    // @kosDependency + computed getters over container indexes.
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing device ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading device ${this.id}`);
  }

  /** Publish one event on a topic, as a device would, out of band. */
  // extract-code device-publish-event
  @serviceRequest(DeviceEndpoints.publishEvent, {
    transform: toPublishEventData,
  })
  async publishEvent(
    topic: string,
    payload: unknown,
    $ctx?: PublishEventCtx
  ): Promise<void> {
    const data = await executeServiceRequest(this, $ctx, {
      body: toEventBody(topic, payload),
    });
    if (!data) return;
    this.eventsSent += 1;
  }

  /** Publish `count` events back to back, `gapMs` apart. */
  async publishBurst(
    topic: string,
    count: number,
    gapMs = 0,
    body: (n: number) => unknown = (n) => ({ n })
  ): Promise<void> {
    for (let n = 1; n <= count; n += 1) {
      await this.publishEvent(topic, body(n));
      if (gapMs > 0) await new Promise((r) => setTimeout(r, gapMs));
    }
  }

  @serviceRequest(DeviceEndpoints.addObject, { transform: toAddObjectData })
  async addObject($ctx?: AddObjectCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx);
    if (!data) return;
    this.lastEvent = `added #${data.id}`;
  }

  @serviceRequest(DeviceEndpoints.removeObject, {
    transform: toRemoveObjectData,
  })
  async removeObject($ctx?: RemoveObjectCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx);
    if (!data) return;
    this.lastEvent = `removed #${data.id}`;
  }

  /** Ask the backend to raise its codex session trouble through its trouble service. */
  // extract-code device-raise-trouble
  @serviceRequest(DeviceEndpoints.raiseTrouble, {
    transform: toRaiseTroubleData,
  })
  async raiseTrouble($ctx?: RaiseTroubleCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx);
    if (!data) return;
    this.lastEvent = 'trouble raised';
  }

  @serviceRequest(DeviceEndpoints.removeTrouble, {
    transform: toRemoveTroubleData,
  })
  /** Ask the backend to remove that trouble, as the raising service would when the condition ends. */
  async removeTrouble($ctx?: RemoveTroubleCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx);
    if (!data) return;
    this.lastEvent = 'trouble removed';
  }
}

export const Device = DeviceModelImpl.Registration;
