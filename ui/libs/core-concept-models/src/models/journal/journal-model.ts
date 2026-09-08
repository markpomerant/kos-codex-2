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
  kosContainerAware,
  type KosContainerAware,
  DependencyLifecycle,
  kosTopicHandler,
  ReplayStrategy,
} from '@kosdev-code/kos-ui-sdk';

import type { JournalOptions, ObjectEvent } from './types';
import { Note, type NoteModel } from '../note';
import { serviceRequest } from '../../utils/services/codex/v1/service';
import {
  JournalEndpoints,
  toOnNotesLoadedData,
  type OnNotesLoadedData,
} from './services';

export const MODEL_TYPE = 'journal-model';

export type JournalModel = PublicModelInterface<JournalModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JournalModelImpl
  extends KosLoggerAware,
    KosContainerAware<NoteModel> {}

@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code journal-container
@kosContainerAware<NoteModel>()
// extract-code end journal-container
@kosLoggerAware()
export class JournalModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<JournalModel, JournalOptions>;

  id: string;
  deltasApplied: number = 0;
  deltasSeen: string = '';
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: JournalOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      // Copy options VERBATIM (this.x = options.x). Derivation belongs in
      // computed getters or the DTO mapper — never transform inputs here.
    }
  }

  updateModel(_options: JournalOptions): void {
    // Rename _options to options when implementing. Copy fields in place
    // (same verbatim rule as the constructor). Cross-model reads =
    // @kosDependency + computed getters over container indexes.
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing journal ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading journal ${this.id}`);
  }

  /** The baseline: this endpoint publishes a delta and then answers slowly. */
  // extract-code journal-baseline
  @serviceRequest(JournalEndpoints.onNotesLoaded, {
    lifecycle: DependencyLifecycle.LOAD,
    transform: toOnNotesLoadedData,
  })
  onNotesLoaded(error: string | null, data: OnNotesLoadedData): void {
    if (error || !data) return;
    for (const row of data) this.upsert(row);
  }
  // extract-code end journal-baseline

  private upsert(row: { id?: number; desc?: string }): void {
    if (row.id === undefined) return;
    const id = String(row.id);
    const existing = this.getModel(id);
    if (existing) existing.updateModel({ desc: row.desc ?? '' });
    else this.addModel(Note.instance(id).options({ desc: row.desc ?? '' }).build());
  }

  // extract-code topic-catch-up
  @kosTopicHandler<ObjectEvent>({
    // INIT, not the default: the subscription must exist before the LOAD
    // request goes out, or a delta published during it is never seen.
    lifecycle: DependencyLifecycle.INIT,
    topic: '/studio/codex/objects/added',
    websocket: true,
    // extract-code ignore start topic-catch-up
    // extract-code topic-requires-baseline
    requiresBaseline: {
      path: '/api/codex/test/objects/race',
      method: 'get',
      replayStrategy: ReplayStrategy.AFTER_REQUEST,
    },
    // extract-code topic-replay
    replay: { bufferSize: 3 },
    // extract-code ignore end topic-catch-up
  })
  // extract-code end topic-catch-up
  // extract-code topic-catch-up-handler
  onObjectAdded(event: ObjectEvent) {
    this.deltasApplied += 1;
    this.deltasSeen = `${this.deltasSeen}added:${event.id} `;
    this.upsert(event);
  }

  // extract-code topic-catch-up-removed
  @kosTopicHandler<ObjectEvent>({
    lifecycle: DependencyLifecycle.INIT,
    topic: '/studio/codex/objects/removed',
    websocket: true,
    requiresBaseline: {
      path: '/api/codex/test/objects/race',
      method: 'get',
      replayStrategy: ReplayStrategy.AFTER_REQUEST,
    },
  })
  onObjectRemoved(event: ObjectEvent) {
    this.deltasApplied += 1;
    this.deltasSeen = `${this.deltasSeen}removed:${event.id} `;
    this.removeModel(String(event.id));
  }
}

export const Journal = JournalModelImpl.Registration;
