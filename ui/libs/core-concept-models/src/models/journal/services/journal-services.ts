/**
 * Service layer for the journal model: the endpoints it calls and the
 * types derived from them. Standalone service functions for callers outside a
 * model context belong here too.
 */
import {
  endpoint,
  type EndpointResponse,
} from '../../../utils/services/codex/v1/service';

export const JournalEndpoints = {
  onNotesLoaded: endpoint('/api/codex/test/objects/race', 'get'),
} as const;

export type OnNotesLoadedData = EndpointResponse<
  typeof JournalEndpoints.onNotesLoaded
>;

export const toOnNotesLoadedData = (
  raw: EndpointResponse<typeof JournalEndpoints.onNotesLoaded>
): OnNotesLoadedData => raw;
