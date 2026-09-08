import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'topic-rate-view' });
log.debug('topic-rate-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code topic-rate-view
export const TopicRateView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <TopicRateViewContainer>
        <Readout
          rows={[
            ['debounceCalls', widget.debounceCalls],
            ['debounceLastBatch', widget.debounceLastBatch],
            ['throttleCalls', widget.throttleCalls],
            ['bufferItems', widget.bufferItems],
          ]}
        />
      </TopicRateViewContainer>
    );
  }
);

export const ConnectedTopicRateView = withWidget(TopicRateView);

const TopicRateViewContainer = styled.div``;

TopicRateView.displayName = 'TopicRateView';

export default TopicRateView;
