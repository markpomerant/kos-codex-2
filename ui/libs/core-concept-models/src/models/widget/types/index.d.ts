export interface WidgetOptions {}

/** A temperature event from the device, in tenths of a degree. */
export interface TemperatureEvent {
  value: number;
}

/** An in-app event published on the EventBus, never over the socket. */
export interface PingEvent {
  n: number;
}

/** A numbered sample event; bursts publish many of these quickly. */
export interface SampleEvent {
  n: number;
}

/** What `onReading` receives after its `transform` has run. */
export interface Reading {
  celsius: number;
  label: 'hot' | 'mild';
}

/** What `onFlowBatch` receives after the flow `transform` folds a batch. */
export interface BatchSummary {
  count: number;
  sum: number;
}
