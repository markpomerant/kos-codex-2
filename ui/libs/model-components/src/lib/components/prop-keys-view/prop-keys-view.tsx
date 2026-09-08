import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'prop-keys-view' });
log.debug('prop-keys-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code prop-keys-view
export const PropKeysView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <PropKeysViewContainer>
        <Readout
          rows={[
            ['id', widget.id],
            ['zone (computed)', widget.zone],
            ['own reading topic', `/codex/widget/${widget.id}/reading`],
            ['zone status topic', `/codex/zone/${widget.zone}/status`],
            ['ownReadings', widget.ownReadings],
            ['zoneEvents', widget.zoneEvents],
          ]}
        />
      </PropKeysViewContainer>
    );
  }
);

export const ConnectedPropKeysView = withWidget(PropKeysView);

const PropKeysViewContainer = styled.div`
  margin-bottom: 0.75rem;
`;

PropKeysView.displayName = 'PropKeysView';

export default PropKeysView;
