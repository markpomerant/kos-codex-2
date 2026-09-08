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
  type KosContainerAwareWithProp,
  DependencyLifecycle,
  executeServiceRequest,
  resolveContainerDeltas,
  ResponseRetention,
  kosReloadAware,
  kosContext,
  type KosContextBean,
} from '@kosdev-code/kos-ui-sdk';

import type { DocumentOptions } from './types';
import { Note, type NoteModel } from '../note/note-model';
import {
  serviceRequest,
} from '../../utils/services/codex/v1/service';
import {
  DocumentEndpoints,
  toOnNotesLoadedData,
  type OnNotesLoadedData,
  toAddNoteData,
  type AddNoteCtx,
  toModifyNoteData,
  type ModifyNoteCtx,
  toRemoveNoteData,
  type RemoveNoteCtx,
  toRefreshStatsData,
  type RefreshStatsCtx,
  type RefreshStatsRaw,
  type RefreshStatsData,
  toLoadNoteData,
  type LoadNoteCtx,
  type LoadNoteRaw,
  type LoadNoteData,
  type OnNotesLoadedCtx,
} from './services';

export const MODEL_TYPE = 'document-model';

export type DocumentModel = PublicModelInterface<DocumentModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DocumentModelImpl
  extends KosLoggerAware,
    KosContainerAwareWithProp<NoteModel, 'notes'> {}


// extract-code document-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code document-container
@kosContainerAware<NoteModel>({
  // extract-code document-container-property
  containerProperty: 'notes',
  // extract-code document-models-property
  modelsProperty: 'noteList',
  containerOptions: {
    // extract-code document-extension-id
    extensionId: 'document-notes',
    // extract-code ignore document-container
    sortKey: 'desc',
  },
})
// extract-code end document-container
// extract-code document-reload-aware
/** Marks the model as managing its own reload: after a reconnect KOS Core
 *  skips its destructive unload/reload cycle for this model, and `reload()`
 *  is ours to call — here it reconciles the notes in place. */
@kosReloadAware()
// extract-code end document-reload-aware
@kosLoggerAware()
export class DocumentModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<DocumentModel, DocumentOptions>;

  id: string;
  // extract-code document-fields
  statsRequests: number = 0;
  count: number = 0;
  statsComputedAt: string = '';
  lastError: string = '';
  evictedNotes: number = 0;
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: DocumentOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      // Copy options VERBATIM (this.x = options.x). Derivation belongs in
      // computed getters or the DTO mapper — never transform inputs here.
    }
  }

  updateModel(_options: DocumentOptions): void {
    // Rename _options to options when implementing. Copy fields in place
    // (same verbatim rule as the constructor). Cross-model reads =
    // @kosDependency + computed getters over container indexes.
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing document ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading document ${this.id}`);
  }

  reloads: number = 0;
  contextNote: string = '';

  // extract-code document-reload
  async reload(): Promise<void> {
    this.reloads += 1;
    await this.reloadNotes();
  }

  // extract-code document-context
  /** `@kosContext` appends the model's context bean to the call, so a method
   *  can read shared keys without holding the creation context. */
  @kosContext
  describeContext(label: string, context?: KosContextBean): void {
    const owner = context?.get('teamId') ?? '(no owner key set)';
    this.contextNote = `${label}: bean ${context?.id ?? '?'}, teamId=${owner}`;
  }

  // -------------------SERVICE REQUESTS---------------------

  /**
   * The same endpoint as the LOAD request, in the method-driven form: a
   * lifecycle handler cannot be re-invoked, so a reload is its own method.
   * The list is reconciled in place, never cleared and re-added.
   */
  // extract-code service-reload
  @serviceRequest(DocumentEndpoints.onNotesLoaded, {
    transform: toOnNotesLoadedData,
  })
  async reloadNotes($ctx?: OnNotesLoadedCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx);
    if (!data) return;
    // extract-code ignore start service-reload
    // extract-code service-reload-reconcile
    // Map at the boundary first (wire ids are integers, model ids are strings),
    // then reconcile: gone → removed, matched → updated in place, new → added.
    const rows = data.notes.map((row) => ({
      id: String(row.id),
      desc: row.desc ?? '',
    }));
    resolveContainerDeltas<typeof this.notes, { id: string; desc: string }>({
      container: this.notes,
      onAddItem: (row) =>
        Note.instance(row.id).options({ desc: row.desc }).build(),
      onUpdateItem: (row, existing) => {
        existing.updateModel({ desc: row.desc });
        return null;
      },
    })(rows);
    // extract-code end service-reload-reconcile
    // extract-code ignore end service-reload
  }
  // extract-code end service-reload

  // extract-code service-mapping
  @serviceRequest(DocumentEndpoints.onNotesLoaded, {
    lifecycle: DependencyLifecycle.LOAD,
    // extract-code ignore start service-mapping
    // extract-code service-transform
    transform: toOnNotesLoadedData,
    // extract-code service-iterate-over
    iterateOver: 'notes',
    // extract-code service-mappings
    mappings: [
      { from: 'id', to: 'id', transform: 'string', required: true },
      { from: 'desc', to: 'desc', default: '' },
    ],
    // extract-code service-model-factory
    modelFactory: Note,
    idExtractor: (item) => item.id,
    // extract-code end service-model-factory
    // extract-code ignore end service-mapping
  })
  // extract-code end service-mapping
  // extract-code service-mapping-handler
  onNotesLoaded(error: string | null, models: NoteModel[]): void {
    if (error || !models) return;
    // iterateOver + modelFactory already built one NoteModel per row
    this.addAll(models);
  }

  // extract-code service-method
  @serviceRequest(DocumentEndpoints.addNote, { transform: toAddNoteData })
  async addNote(desc: string, $ctx?: AddNoteCtx): Promise<void> {
    // extract-code ignore start service-method
    // extract-code service-request-body
    // The client owns the id; the response is the object as stored.
    const id = this.nextNoteId();
    const data = await executeServiceRequest(this, $ctx, {
      body: { id, desc },
    });
    if (!data) return;
    this.addModel(
      Note.instance(String(data.id)).options({ desc: data.desc ?? '' }).build()
    );
    // extract-code end service-request-body
    // extract-code ignore end service-method
  }
  // extract-code end service-method

  // extract-code service-path-params
  @serviceRequest(DocumentEndpoints.modifyNote, { transform: toModifyNoteData })
  async modifyNote(id: string, $ctx?: ModifyNoteCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { id: Number(id) },
    });
    if (!data) return;
    // The response is the modified object: update that one note in place.
    this.notes.getModel(String(data.id))?.updateModel({ desc: data.desc ?? '' });
  }

  // extract-code service-remove-in-place
  @serviceRequest(DocumentEndpoints.removeNote, { transform: toRemoveNoteData })
  async removeNote(id: string, $ctx?: RemoveNoteCtx): Promise<void> {
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { id: Number(id) },
    });
    if (!data) return;
    // Success with no payload: the model already knows what changed.
    this.removeModel(id);
  }
  // extract-code end service-remove-in-place

  /** Ids are client-owned against this backend: one past the highest note held. */
  nextNoteId(): number {
    return this.notes.data.reduce((max, note) => Math.max(max, Number(note.id)), 0) + 1;
  }

  // extract-code service-error-request
  @serviceRequest(DocumentEndpoints.loadNote, {
    // extract-code ignore start service-error-request
    // extract-code service-error-handler
    errorHandler: {
      strategy: 'log',
      defaultValue: null,
      onError: (error, model) => {
        const status = (error as { status?: number }).status;
        (model as DocumentModelImpl).lastError = status
          ? `HTTP ${status}`
          : error.message;
      },
    },
    // extract-code ignore end service-error-request
    transform: toLoadNoteData,
  })
  // extract-code service-error-method
  async loadNote(id: string, $ctx?: LoadNoteCtx): Promise<void> {
    // extract-code ignore start service-error-request
    this.lastError = '';
    this.loadedNote = '';
    const data = await executeServiceRequest(this, $ctx, {
      pathParams: { id: Number(id) },
    });
    if (!data) return;
    // An unknown id is a success without a payload; the client then hands back
    // the bare envelope, so check the field, not the object.
    if (data.id === undefined) {
      this.loadedNote = '(no such note)';
      return;
    }
    this.loadedNote = `#${data.id}: ${data.desc}`;
    // extract-code ignore end service-error-request
  }
  // extract-code end service-error-request
  loadedNote: string = '';
  // extract-code service-load
  @serviceRequest(DocumentEndpoints.refreshStats, {
    lifecycle: DependencyLifecycle.LOAD,
    // extract-code ignore start service-load
    // extract-code service-condition
    condition: (model) => model.id !== 'document-without-stats',
    // extract-code service-request-options
    requestOptions: { timeout: 2000 },
    // extract-code service-cache
    cache: {
      retention: ResponseRetention.TTL,
      ttl: 5000,
      extendOnRefresh: true,
      maxSize: 1,
    },
    // extract-code ignore end service-load
    transform: toRefreshStatsData,
  })
  onStatsLoaded(error: string | null, data: RefreshStatsData): void {
    if (error || !data) return;
    this.statsRequests += 1;
    this.count = data.count ?? 0;
    this.statsComputedAt = data.computedAt ?? '';
  }
  // extract-code end service-load


}

export const Document = DocumentModelImpl.Registration;
