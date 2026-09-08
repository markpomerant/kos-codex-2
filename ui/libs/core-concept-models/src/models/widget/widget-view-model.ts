import {
  kosViewModel,
  kosLoggerAware,
  type KosViewModelLoggerAware,
} from '@kosdev-code/kos-ui-sdk';

import type { WidgetModel } from './widget-model';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface WidgetTemperatureViewModel extends KosViewModelLoggerAware {}

/**
 * A ViewModel holds UI-only state — the chosen unit, the alert flag the panel
 * shows — beside a data model it reads from. It is created per component
 * instance by `useViewModel`, not registered, and not part of the model graph.
 */
// extract-code view-model-decorator
@kosViewModel({
  typeId: 'widget-temperature',
  // extract-code ignore start view-model-decorator
  // extract-code view-model-devtools
  devToolsEnabled: true,
  // extract-code ignore end view-model-decorator
})
@kosLoggerAware()
// extract-code end view-model-decorator
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class WidgetTemperatureViewModel {
  // extract-code view-model-state
  unit: 'C' | 'F' = 'C';

  constructor(private readonly widget: WidgetModel) {}
  // extract-code end view-model-state

  // extract-code view-model-computed
  get display(): string {
    const c = this.widget.temperature / 10;
    return this.unit === 'C'
      ? `${c.toFixed(1)} °C`
      : `${((c * 9) / 5 + 32).toFixed(1)} °F`;
  }

  get isHot(): boolean {
    return this.widget.temperature >= 300;
  }
  // extract-code end view-model-computed

  // extract-code view-model-action
  toggleUnit(): void {
    this.unit = this.unit === 'C' ? 'F' : 'C';
    this.logger.info(`unit is now ${this.unit}`);
  }
}
