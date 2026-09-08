import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'config-properties-view' });
log.debug('config-properties-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code config-properties-view
export const ConfigPropertiesView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <ConfigPropertiesViewContainer>
        <Readout
          rows={[
            ['enabled', widget.enabled?.value],
            ['colors', widget.colors?.value],
            ['colors options', (widget.colors?.options ?? []).map((o) => o.label).join(', ')],
            ['bean keys', (widget.codexConfig?.schemaKeys ?? []).join(', ')],
          ]}
        />
      </ConfigPropertiesViewContainer>
    );
  }
);

export const ConnectedConfigPropertiesView = withWidget(ConfigPropertiesView);

const ConfigPropertiesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ConfigPropertiesView.displayName = 'ConfigPropertiesView';

export default ConfigPropertiesView;
