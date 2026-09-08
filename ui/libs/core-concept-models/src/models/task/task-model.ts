/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */

import type {
  IKosDataModel,
  IKosIdentifiable,
  PublicModelInterface,
  KosModelRegistrationType,
  ExternalFutureInterface,
  IFutureModel,
} from '@kosdev-code/kos-ui-sdk';
import {
  kosModel,
  kosFuture,
  kosFutureAware,
  KosFutureAwareFull,
  kosLoggerAware,
  KosLoggerAware,
  executeServiceRequest,
} from '@kosdev-code/kos-ui-sdk';

import type { TaskOptions } from './types';
import type { TaskOperationProgress } from './services';
import { serviceRequest } from '../../utils/services/codex/v1/service';
import {
  TaskEndpoints,
  toStartAdditionalDataData,
  type StartAdditionalDataCtx,
  type StartAdditionalDataData,
} from './services';

export const MODEL_TYPE = 'task-model';

export type TaskModel = PublicModelInterface<TaskModelImpl> &
  ExternalFutureInterface<TaskOperationProgress>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskModelImpl
  extends KosLoggerAware,
    KosFutureAwareFull<TaskOperationProgress> {}

// extract-code task-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code task-future-aware
@kosFutureAware()
// extract-code end task-future-aware
@kosLoggerAware()
export class TaskModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<TaskModel, TaskOptions>;

  id: string;
  name: string = '';
  done: boolean = false;
  lastUpdate: string = '';
  // logger property is automatically provided by @kosLoggerAware decorator

  // Future support properties are provided via interface merging - no need to declare

  constructor(modelId: string, options: TaskOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      this.name = options.name ?? this.name;
    }
  }

  updateModel(options: TaskOptions): void {
    this.name = options.name ?? this.name;
  }

  /**
   * Optional: Custom Future update handling
   * Called whenever the Future state changes (progress, status, completion, etc.)
   */
  // extract-code task-future-update
  onFutureUpdate?(update: IFutureModel<TaskOperationProgress>): void {
    this.lastUpdate = `${update.status} ${update.progress ?? 0}%`;
    if (update.endState) {
      this.done = true;
    }
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing task ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading task ${this.id}`);
  }



  // extract-code task-future
  /**
   * Studio answers this POST with a FutureWork it keeps updating over the
   * socket. `@kosFuture` opens a tracked future before the call, injects the
   * tracker into the execution context, and maps the response onto it; the
   * request carries the tracker so the device's progress events bind to it.
   */
  @kosFuture({
    alias: 'additionalData',
    namespace: 'codex',
    abortController: true,
    trackerPolicy: 'context',
  })
  // extract-code task-future-signature
  @serviceRequest(TaskEndpoints.startAdditionalData, {
    transform: toStartAdditionalDataData,
  })
  async startAdditionalData(
    numOfItems: number,
    // abortController: true makes the framework pass the AbortSignal before
    // the execution context, so the context is the THIRD parameter here.
    _signal?: AbortSignal,
    $ctx?: StartAdditionalDataCtx
  ): Promise<StartAdditionalDataData | undefined> {
    // extract-code ignore start task-future-signature
    // extract-code task-future-body
    this.done = false;
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { numOfItems },
      requestOptions: { tracker: $ctx?.$tracker },
    });
    return data ?? undefined;
    // extract-code end task-future-body
    // extract-code ignore end task-future-signature
  }
  // extract-code end task-future-signature
}

export const Task = TaskModelImpl.Registration;
