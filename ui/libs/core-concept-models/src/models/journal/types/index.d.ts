export interface JournalOptions {}

/** A note as the codex backend publishes it on its object topics. */
export interface ObjectEvent {
  id: number;
  desc?: string;
}
