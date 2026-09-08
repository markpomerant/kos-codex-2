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
  kosModelEffect,
} from '@kosdev-code/kos-ui-sdk';

import type { CounterOptions } from './types';

// extract-code counter-model
export const MODEL_TYPE = 'counter-model';

// extract-code counter-bean
export type CounterModel = PublicModelInterface<CounterModelImpl>;

// Interface merging for decorator type safety
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CounterModelImpl extends KosLoggerAware {}

// extract-code counter-model
@kosModel({ modelTypeId: MODEL_TYPE, singleton: false })
// extract-code counter-logger
@kosLoggerAware()
// extract-code end counter-logger
export class CounterModelImpl implements IKosDataModel, IKosIdentifiable {
  // Registration property for type safety - actual value injected by @kosModel decorator
  // extract-code counter-bean
  static Registration: KosModelRegistrationType<CounterModel, CounterOptions>;

  id: string;
  // extract-code counter-count
  // extract-code counter-effect-state
  count: number = 0;
  // extract-code counter-effect-state
  milestone: string = '';
  // logger property is automatically provided by @kosLoggerAware decorator

  // extract-code counter-constructor
  constructor(modelId: string, options: CounterOptions) {
    this.id = modelId;
    // logger is automatically injected by @kosLoggerAware decorator
    // extract-code ignore start

    if (options) {
      // Copy options VERBATIM (this.x = options.x). Derivation belongs in
      // computed getters or the DTO mapper — never transform inputs here.
    }
    // extract-code ignore end
  }

  // extract-code counter-floor
  get isAtFloor(): boolean {
    return this.count === 0;
  }

  updateModel(_options: CounterOptions): void {
    // Rename _options to options when implementing. Copy fields in place
    // (same verbatim rule as the constructor). Cross-model reads =
    // @kosDependency + computed getters over container indexes.
  }

  // -------------------LIFECYCLE----------------------------

  // extract-code counter-lifecycle
  async init(): Promise<void> {
    this.logger.debug(`initializing counter ${this.id}`);
  }

  // extract-code counter-lifecycle
  async load(): Promise<void> {
    this.logger.debug(`loading counter ${this.id}`);
  }

  // -------------------ACTIONS------------------------------

  // extract-code counter-count
  increment(): void {
    this.count += 1;
  }

  // extract-code counter-floor
  decrement(): void {
    if (this.isAtFloor) return;
    this.count -= 1;
  }

  // extract-code counter-count
  reset(): void {
    this.count = 0;
  }

  // extract-code counter-effect
  /** Runs whenever `count` changes, and once on setup because of fireImmediately. */
  @kosModelEffect({
    dependencies: (model: CounterModel) => [model.count],
    options: { fireImmediately: true },
  })
  async onCountChanged(): Promise<void> {
    this.milestone =
      this.count === 0
        ? 'at the floor'
        : this.count % 5 === 0
          ? `multiple of five: ${this.count}`
          : `counting (${this.count})`;
  }
}

// extract-code counter-bean
export const Counter = CounterModelImpl.Registration;
