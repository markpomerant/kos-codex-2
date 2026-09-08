import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'topic-handlers-view' });
log.debug('topic-handlers-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code topic-handlers-view
export const TopicHandlersView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <TopicHandlersViewContainer>
        <Readout
          rows={[
            ['temperature', widget.temperature],
            ['pings', widget.pings],
            ['rawEvent', widget.rawEvent],
          ]}
        />
      </TopicHandlersViewContainer>
    );
  }
);

export const ConnectedTopicHandlersView = withWidget(TopicHandlersView);

const TopicHandlersViewContainer = styled.div``;

TopicHandlersView.displayName = 'TopicHandlersView';

export default TopicHandlersView;
