/**
 * UI-only state for the WidgetTemperature view, held beside the KOS data models it
 * reads rather than inside them. A ViewModel is not registered and is
 * not part of the model graph; create one per component with
 * `useViewModel(() => new WidgetTemperatureViewModel(widget))`.
 */
import {
  kosViewModel,
  kosLoggerAware,
  type KosViewModelLoggerAware,
} from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '../widget/widget-model';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface WidgetTemperatureViewModel extends KosViewModelLoggerAware {}

// extract-code view-model-decorator
@kosViewModel({ typeId: 'widget-temperature' })
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
  // extract-code end view-model-action
}
