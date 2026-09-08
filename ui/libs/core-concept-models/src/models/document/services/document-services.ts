/**
 * Service layer for the document model: the endpoints it calls and the
 * types derived from them. Standalone service functions for callers outside a
 * model context belong here too.
 */
import {
  endpoint,
  type EndpointCtx,
  type EndpointResponse,
} from '../../../utils/services/codex/v1/service';

// extract-code endpoint-catalog
export const DocumentEndpoints = {
  onNotesLoaded: endpoint('/api/codex/objects', 'get'),
  // extract-code ignore start endpoint-catalog
  // extract-code endpoint-writes
  addNote: endpoint('/api/codex/objects', 'post'),
  modifyNote: endpoint('/api/codex/objects/{id}', 'put'),
  removeNote: endpoint('/api/codex/objects/{id}', 'delete'),
  // extract-code end endpoint-writes
  // extract-code endpoint-reads
  refreshStats: endpoint('/api/codex/objects/stats', 'get'),
  loadNote: endpoint('/api/codex/objects/{id}', 'get'),
  // extract-code end endpoint-reads
  // extract-code ignore end endpoint-catalog
} as const;
// extract-code end endpoint-catalog

// extract-code notes-mapper
/**
 * Studio answers with a bare array of `{ id, desc }`. `iterateOver` needs a
 * path into an object, so the mapper wraps it: the one place the wire shape is
 * adapted, shared by the LOAD request and the reload.
 */
export type OnNotesLoadedData = {
  notes: EndpointResponse<typeof DocumentEndpoints.onNotesLoaded>;
};

export const toOnNotesLoadedData = (
  raw: EndpointResponse<typeof DocumentEndpoints.onNotesLoaded>
): OnNotesLoadedData => ({ notes: raw });
// extract-code end notes-mapper

export type AddNoteData = EndpointResponse<typeof DocumentEndpoints.addNote>;

export const toAddNoteData = (
  raw: EndpointResponse<typeof DocumentEndpoints.addNote>
): AddNoteData => raw;

export type AddNoteCtx = EndpointCtx<
  typeof DocumentEndpoints.addNote,
  AddNoteData
>;
export type ModifyNoteData = EndpointResponse<
  typeof DocumentEndpoints.modifyNote
>;

export const toModifyNoteData = (
  raw: EndpointResponse<typeof DocumentEndpoints.modifyNote>
): ModifyNoteData => raw;

export type ModifyNoteCtx = EndpointCtx<
  typeof DocumentEndpoints.modifyNote,
  ModifyNoteData
>;
export type RemoveNoteData = EndpointResponse<
  typeof DocumentEndpoints.removeNote
>;

export const toRemoveNoteData = (
  raw: EndpointResponse<typeof DocumentEndpoints.removeNote>
): RemoveNoteData => raw;

export type RemoveNoteCtx = EndpointCtx<
  typeof DocumentEndpoints.removeNote,
  RemoveNoteData
>;
export type RefreshStatsRaw = EndpointResponse<
  typeof DocumentEndpoints.refreshStats
>;
export type RefreshStatsData = RefreshStatsRaw;

export const toRefreshStatsData = (raw: RefreshStatsRaw): RefreshStatsData =>
  raw;

export type RefreshStatsCtx = EndpointCtx<
  typeof DocumentEndpoints.refreshStats,
  RefreshStatsData
>;
export type LoadNoteRaw = EndpointResponse<typeof DocumentEndpoints.loadNote>;
export type LoadNoteData = LoadNoteRaw;

export const toLoadNoteData = (raw: LoadNoteRaw): LoadNoteData => raw;

export type LoadNoteCtx = EndpointCtx<
  typeof DocumentEndpoints.loadNote,
  LoadNoteData
>;
export type OnNotesLoadedCtx = EndpointCtx<
  typeof DocumentEndpoints.onNotesLoaded,
  OnNotesLoadedData
>;
