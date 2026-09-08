import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'topic-filtering-view' });
log.debug('topic-filtering-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code topic-filtering-view
export const TopicFilteringView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <TopicFilteringViewContainer>
        <Readout
          rows={[
            ['threshold', widget.threshold],
            ['alerts', widget.alerts],
            ['evenSamples', widget.evenSamples],
            ['firstEventAt', widget.firstEventAt],
            ['reading', widget.reading],
          ]}
        />
      </TopicFilteringViewContainer>
    );
  }
);

export const ConnectedTopicFilteringView = withWidget(TopicFilteringView);

const TopicFilteringViewContainer = styled.div``;

TopicFilteringView.displayName = 'TopicFilteringView';

export default TopicFilteringView;
