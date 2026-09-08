import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { KosConfigProperty } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel as Widget } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'config-conversion-view' });
log.debug('config-conversion-view component loaded');

interface Props {
  id: string;
  widget: Widget;
}

/** A property's derived readings throw when the backend's region settings name
 *  no unit system (Studio ships none until one is written); read them through a
 *  guard so the panel renders instead of unmounting. */
const safe = <T,>(read: () => T): T | string => {
  try {
    return read();
  } catch {
    return '(no unit system)';
  }
};

/** Every reading a config property offers, side by side. */
const PropertyReadout = ({
  title,
  prop,
}: {
  title: string;
  prop: KosConfigProperty<number> | KosConfigProperty<string>;
}) => (
  <section>
    <h4>{title}</h4>
    <Readout
      rows={[
        ['rawValue (backend)', prop.rawValue],
        ['value (display unit)', safe(() => prop.value)],
        ['significantValue', safe(() => prop.significantValue)],
        ['displayValue', safe(() => prop.displayValue)],
        ['unit', safe(() => prop.unit)],
        ['schemaType / schemaFormat', `${prop.schemaType} / ${prop.schemaFormat || '—'}`],
        ['displayOptions', safe(() => JSON.stringify(prop.displayOptions ?? null))],
        ['options', safe(() => (prop.options ?? []).map((o) => o.label).join(', ') || '—')],
      ]}
    />
  </section>
);

// extract-code config-conversion-view
export const ConfigConversionView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <ConfigConversionViewContainer>
        <Readout
          rows={[
            ['region', widget.regionName],
            ['unit system', widget.unitSystem],
            ['unit systems', widget.unitSystems],
          ]}
        />
        <PropertyReadout title="volume — no converter, format ml" prop={widget.volume} />
        <PropertyReadout title="otherVolume — explicit converter + formatter" prop={widget.otherVolume} />
        <PropertyReadout title="rangeInterval — per-unit-system options" prop={widget.rangeInterval} />
      </ConfigConversionViewContainer>
    );
  }
);

export const ConnectedConfigConversionView = withWidget(ConfigConversionView);

const ConfigConversionViewContainer = styled.div`
  display: grid;
  gap: 1rem;
  h4 {
    margin: 0 0 0.25rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ConfigConversionView.displayName = 'ConfigConversionView';

export default ConfigConversionView;
