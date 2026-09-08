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
  kosTopicHandler,
  createPropKey,
  DependencyLifecycle,
  kosConfigProperty,
  type KosConfigProperty,
  kosConfigBean,
  type IConfigBeanModel,
  kosDependency,
  RegionInfo,
  type RegionInfoModel,
} from '@kosdev-code/kos-ui-sdk';

import type {
  ApiCallback,
  ApiCallbackWithWildcard,
} from '@kosdev-code/kos-ui-sdk';

import type {
  BatchSummary,
  PingEvent,
  Reading,
  SampleEvent,
  TemperatureEvent,
  WidgetOptions,
} from './types';

export const MODEL_TYPE = 'widget-model';

/** A topic per zone: the PropKey is replaced with the instance's `zone` when
 *  the subscription is made. */
// extract-code topic-prop-key
export const TOPIC_ZONE_STATUS = `/codex/zone/${createPropKey<WidgetModelImpl>('zone')}/status`;
// extract-code end topic-prop-key

export type WidgetModel = PublicModelInterface<WidgetModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface WidgetModelImpl extends KosLoggerAware {}

@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
@kosLoggerAware()
export class WidgetModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  static Registration: KosModelRegistrationType<WidgetModel, WidgetOptions>;

  id: string;
  // extract-code topic-websocket
  temperature: number = 0;
  // extract-code topic-local
  pings: number = 0;
  // extract-code topic-skip-parse
  rawEvent: string = '';
  // extract-code topic-condition
  threshold: number = 30;
  alerts: number = 0;
  // extract-code end topic-condition
  // extract-code topic-filter
  evenSamples: number = 0;
  // extract-code topic-once
  firstEventAt: string = '';
  // extract-code topic-transform
  reading: string = '';
  // extract-code topic-debounce
  debounceCalls: number = 0;
  debounceLastBatch: number = 0;
  // extract-code end topic-debounce
  // extract-code topic-throttle
  throttleCalls: number = 0;
  // extract-code topic-buffer
  bufferItems: number = 0;
  // extract-code topic-flow-batch
  flowBatches: number = 0;
  flowBatchSum: number = 0;
  // extract-code end topic-flow-batch
  // extract-code topic-flow-rate-limit
  flowAccepted: number = 0;
  // extract-code topic-flow-errors
  flowAttempts: number = 0;
  flowSucceeded: number = 0;
  // extract-code end topic-flow-errors
  // extract-code topic-wildcard
  wildcardPath: string = '';
  // extract-code topic-destination
  addressedEvents: number = 0;
  // -------------------CONFIG PROPERTIES--------------------

  // extract-code config-property
  /** A boolean on Studio's codex config bean, resolved through the app's
   *  config service path mapper (/api/config on Studio). */
  @kosConfigProperty({ path: 'studio:service:codex', attribute: 'enabled' })
  enabled!: KosConfigProperty<boolean>;

  @kosConfigProperty({
    path: 'studio:service:codex',
    attribute: 'colors',
    // extract-code config-lazy
    lazy: true,
    // extract-code config-service-base-path
    serviceBasePath: '/api/config',
    // extract-code config-options-expander
    optionsExpander: [
      { value: 'DEFAULT', label: 'Default palette' },
      { value: 'HIGH_CONTRAST', label: 'High contrast' },
    ],
  })
  colors!: KosConfigProperty<string>;

  // extract-code config-conversion-implicit
  /** No converter here. The schema says the backend stores millilitres
   *  (`format: "ml"`); the region's unit system decides what to show. */
  @kosConfigProperty({ path: 'studio:service:codex', attribute: 'volume' })
  volume!: KosConfigProperty<number>;

  // extract-code config-bean
  /** The whole bean, for code that needs every attribute at once. */
  @kosConfigBean({ path: 'studio:service:codex' })
  codexConfig!: IConfigBeanModel;
  @kosConfigProperty({
    path: 'studio:service:codex',
    attribute: 'other_volume',
    // extract-code config-converter
    converter: { measure: 'volume', from: 'milliliter', to: 'fluid-ounce' },
    // extract-code config-formatter
    formatter: (system) =>
      system === 'us'
        ? { style: 'unit', unitDisplay: 'long', maximumFractionDigits: 1 }
        : { style: 'unit', unitDisplay: 'short', maximumFractionDigits: 0 },
  })
  otherVolume!: KosConfigProperty<number>;
  // extract-code config-display-options
  /** No converter and no format: a plain number whose schema carries
   *  per-unit-system `options` (range, interval, decimals) the UI reads
   *  through `displayOptions` and `options`. */
  @kosConfigProperty({
    path: 'studio:service:codex',
    attribute: 'unitSystemRangeInterval',
  })
  rangeInterval!: KosConfigProperty<number>;
  @kosConfigProperty({ path: 'studio:service:codex', attribute: 'codex_name' })
  codexName!: KosConfigProperty<string>;
  // extract-code widget-region-dependency
  @kosDependency({ modelType: RegionInfo.type })
  private regionInfo!: RegionInfoModel;
  ownReadings: number = 0;
  zoneEvents: number = 0;
  // logger property is automatically provided by @kosLoggerAware decorator

  constructor(modelId: string, options: WidgetOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator

    if (options) {
      // Copy options VERBATIM (this.x = options.x). Derivation belongs in
      // computed getters or the DTO mapper — never transform inputs here.
    }
  }

  // extract-code widget-zone
  get zone(): string {
    return this.id.replace(/^widget-/, '');
  }

  // extract-code widget-region-read
  get regionName(): string {
    return this.regionInfo?.regionId ?? '';
  }

  get unitSystem(): string {
    return this.regionInfo?.selectedUnitSystem ?? '';
  }

  get unitSystems(): string {
    return (this.regionInfo?.unitSystemOptions ?? [])
      .map((o) => o.id)
      .join(', ');
  }
  // extract-code end widget-region-read

  // extract-code widget-region-write
  /** Writes the region's unit system on the backend; every binding follows. */
  setUnitSystem(id: string): void {
    this.regionInfo.setSelectedUnitSystem(id);
  }

  updateModel(_options: WidgetOptions): void {
    // Rename _options to options when implementing. Copy fields in place
    // (same verbatim rule as the constructor). Cross-model reads =
    // @kosDependency + computed getters over container indexes.
  }

  // -------------------LIFECYCLE----------------------------

  async init(): Promise<void> {
    this.logger.debug(`initializing widget ${this.id}`);
  }

  async load(): Promise<void> {
    this.logger.debug(`loading widget ${this.id}`);
  }

  // -------------------TOPIC HANDLERS-----------------------

  // extract-code topic-websocket
  @kosTopicHandler({
    topic: '/codex/widget/temperature',
    websocket: true,
  })
  onTemperature(event: TemperatureEvent) {
    this.temperature = event.value;
  }

  // extract-code topic-local
  @kosTopicHandler({
    topic: '/codex/widget/ping',
    websocket: false,
  })
  onLocalPing(event: PingEvent) {
    this.pings = event.n;
  }

  // extract-code topic-skip-parse
  @kosTopicHandler({
    topic: '/codex/widget/raw',
    websocket: true,
    skipParse: true,
    // extract-code ignore start topic-skip-parse
    // extract-code topic-lifecycle
    lifecycle: DependencyLifecycle.READY,
    // extract-code ignore end topic-skip-parse
  })
  onRawEvent(event: string) {
    this.rawEvent = event;
  }
  // extract-code end topic-skip-parse

  // extract-code topic-condition
  @kosTopicHandler<TemperatureEvent, WidgetModelImpl>({
    topic: '/codex/widget/alert',
    websocket: true,
    condition: (payload, model) => payload.value > model.threshold,
  })
  onHighTemperature(_event: TemperatureEvent) {
    this.alerts += 1;
  }

  // extract-code topic-filter
  @kosTopicHandler({
    topic: '/codex/widget/sample',
    websocket: true,
    // filter runs BEFORE parsing: it sees the raw event, whose body is still
    // the JSON string the device sent.
    filter: (raw: ApiCallback<string>) => JSON.parse(raw.body).n % 2 === 0,
  })
  onEvenSample(_event: SampleEvent) {
    this.evenSamples += 1;
  }

  // extract-code topic-once
  @kosTopicHandler({
    topic: '/codex/widget/first',
    websocket: true,
    once: true,
  })
  onFirstEvent(event: SampleEvent) {
    this.firstEventAt = `event #${event.n}`;
  }

  // extract-code topic-transform
  @kosTopicHandler<TemperatureEvent, WidgetModelImpl, Reading>({
    topic: '/codex/widget/reading',
    websocket: true,
    transform: (payload) => ({
      celsius: payload.value / 10,
      label: payload.value >= 300 ? 'hot' : 'mild',
    }),
  })
  onReading(event: Reading) {
    this.reading = `${event.celsius.toFixed(1)} °C (${event.label})`;
  }

  // extract-code topic-debounce
  @kosTopicHandler({
    topic: '/codex/widget/burst/debounce',
    websocket: true,
    debounce: 300,
  })
  onBurstDebounced(events: SampleEvent[]) {
    // debounce hands over EVERY event of the quiet window, as an array
    this.debounceCalls += 1;
    this.debounceLastBatch = events.length;
  }

  // extract-code topic-throttle
  @kosTopicHandler({
    topic: '/codex/widget/burst/throttle',
    websocket: true,
    throttle: { interval: 300, discardIntermediate: true },
  })
  onBurstThrottled(_event: SampleEvent) {
    // one event per window; the rest of the burst is dropped
    this.throttleCalls += 1;
  }

  // extract-code topic-buffer
  @kosTopicHandler({
    topic: '/codex/widget/burst/buffer',
    websocket: true,
    buffer: { time: 500, maxSize: 3 },
  })
  onBurstBuffered(_event: SampleEvent) {
    // called once per event, but only when the buffer flushes: at 3 events
    // or 500 ms after the first one, whichever comes first
    this.bufferItems += 1;
  }

  // extract-code topic-flow-batch
  @kosTopicHandler<ApiCallback<string>, WidgetModelImpl, BatchSummary>({
    topic: '/codex/widget/flow/batch',
    websocket: true,
    flow: {
      batch: { size: 3, window: 500 },
      // the flow path hands raw events to transform; parse them here
      transform: (events) => {
        const values = events.map((f) => (JSON.parse(f.body) as SampleEvent).n);
        return { count: values.length, sum: values.reduce((a, b) => a + b, 0) };
      },
      filter: { predicate: (event) => event.body !== '', historySize: 5 },
      backpressure: { maxConcurrent: 1, maxQueue: 10, dropPolicy: 'oldest' },
    },
  })
  onFlowBatch(summary: BatchSummary) {
    this.flowBatches += 1;
    this.flowBatchSum += summary.sum;
  }

  // extract-code topic-flow-rate-limit
  @kosTopicHandler<ApiCallback<string>>({
    topic: '/codex/widget/flow/limit',
    websocket: true,
    flow: {
      rateLimit: { maxEvents: 2, windowMs: 1000, onExceeded: 'drop' },
    },
  })
  onFlowLimited(events: ApiCallback<string>[]) {
    // without batch or transform the flow still delivers an array (of one)
    this.flowAccepted += events.length;
  }

  // extract-code topic-flow-errors
  @kosTopicHandler<ApiCallback<string>>({
    topic: '/codex/widget/flow/retry',
    websocket: true,
    flow: {
      errorHandling: {
        retry: { attempts: 2, backoffMs: 100 },
        continueOnError: true,
      },
    },
  })
  onFlowRetried(_events: ApiCallback<string>[]) {
    this.flowAttempts += 1;
    // the first attempt on every event fails; the retry succeeds
    if (this.flowAttempts % 2 === 1) {
      throw new Error('transient failure');
    }
    this.flowSucceeded += 1;
  }

  // extract-code topic-wildcard
  @kosTopicHandler({
    topic: '/codex/widget/zone/*',
    websocket: true,
    wildcardName: 'zone',
  })
  onZoneEvent(_event: SampleEvent, raw: ApiCallbackWithWildcard<string>) {
    this.wildcardPath = raw.wildcardCapture?.['zone'] ?? '';
  }

  // extract-code topic-destination
  @kosTopicHandler({
    topic: '/codex/widget/addressed',
    websocket: true,
    destinationAddress: 'codex-device',
    explicitDestination: true,
  })
  onAddressedEvent(event: SampleEvent) {
    this.addressedEvents = event.n;
  }

  // extract-code topic-model-id
  @kosTopicHandler({
    topic: '/codex/widget/{MODEL_ID}/reading',
    websocket: true,
  })
  onOwnReading(event: TemperatureEvent) {
    this.ownReadings += 1;
    this.temperature = event.value;
  }

  // extract-code topic-prop-key
  @kosTopicHandler({
    topic: TOPIC_ZONE_STATUS,
    websocket: true,
  })
  onZoneStatus(_event: SampleEvent) {
    this.zoneEvents += 1;
  }
}

export const Widget = WidgetModelImpl.Registration;
