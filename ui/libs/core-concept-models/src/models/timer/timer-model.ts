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
  kosCompanion,
  kosMultipleFutureAware,
  kosFuture,
  executeServiceRequest,
  type KosCompanionComposition,
  type KosMultipleFutureAwareFull,
  type IFutureModel,
} from '@kosdev-code/kos-ui-sdk';

import type { TimerOptions } from './types';

import type { SessionModel } from '@kos-codex-2/core-concept-models';
import { serviceRequest } from '../../utils/services/codex/v1/service';
import {
  TimerEndpoints,
  toStartShortData,
  type StartShortCtx,
  type StartShortData,
} from './services';

export const MODEL_TYPE = 'timer-model';

export type TimerModel = PublicModelInterface<TimerModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// extract-code timer-merge
export interface TimerModelImpl
  extends KosLoggerAware,
    KosCompanionComposition<SessionModel>,
    KosMultipleFutureAwareFull<'short' | 'long'> {}

// extract-code timer-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code timer-companion
/** Created alongside every Session and destroyed with it. In composition mode
 *  the timer keeps its own surface and reads the parent through a reference;
 *  nothing of the session is proxied onto it. */
@kosCompanion({
  mode: 'composition',
  // extract-code ignore start timer-companion
  // extract-code timer-companion-parent-property
  parentProperty: 'session',
  // extract-code ignore end timer-companion
})
// extract-code end timer-companion
// extract-code timer-multi-future
/** Several tracked operations at once, each addressed by its alias. */
@kosMultipleFutureAware()
// extract-code end timer-multi-future
@kosLoggerAware()
export class TimerModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<TimerModel, TimerOptions>;

  id: string;
  // logger property is automatically provided by @kosLoggerAware decorator

  /** The parent, injected under the name given to `parentProperty`. */
  // extract-code timer-parent-field
  declare readonly session: SessionModel;
  lastUpdate: string = '';

  constructor(modelId: string, _options: TimerOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator
  }

  // extract-code timer-parent-read
  /** Companion reads reach the parent through the injected property. */
  get sessionUser(): string {
    return this.session?.user ?? '';
  }

  updateModel(_options: TimerOptions): void {
    // Rename _options to options when implementing. Copy fields in place
    // (same verbatim rule as the constructor). Cross-model reads =
    // @kosDependency + computed getters over container indexes.
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing timer ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading timer ${this.id}`);
  }

  /** Two operations on the same Studio endpoint, tracked as two futures:
   *  `shortFuture` and `longFuture`, each with its own progress and cancel. */
  // extract-code timer-future-short
  @kosFuture({ alias: 'short', trackerPolicy: 'context' })
  @serviceRequest(TimerEndpoints.startShort, { transform: toStartShortData })
  async startShort($ctx?: StartShortCtx): Promise<StartShortData | undefined> {
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { numOfItems: 2 },
      requestOptions: { tracker: $ctx?.$tracker },
    });
    return data ?? undefined;
  }

  // extract-code timer-future-long
  @kosFuture({ alias: 'long', trackerPolicy: 'context' })
  @serviceRequest(TimerEndpoints.startShort, { transform: toStartShortData })
  async startLong($ctx?: StartShortCtx): Promise<StartShortData | undefined> {
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { numOfItems: 8 },
      requestOptions: { tracker: $ctx?.$tracker },
    });
    return data ?? undefined;
  }

  // extract-code timer-future-update
  onFutureUpdate(update: IFutureModel<object>, alias?: string): void {
    this.lastUpdate = `${alias ?? 'default'}: ${update.status} ${update.progress ?? 0}%`;
  }
}

export const Timer = TimerModelImpl.Registration;
