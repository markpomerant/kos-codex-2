import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'topic-flow-view' });
log.debug('topic-flow-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code topic-flow-view
export const TopicFlowView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <TopicFlowViewContainer>
        <Readout
          rows={[
            ['flowBatches', widget.flowBatches],
            ['flowBatchSum', widget.flowBatchSum],
            ['flowAccepted', widget.flowAccepted],
            ['flowAttempts', widget.flowAttempts],
            ['flowSucceeded', widget.flowSucceeded],
          ]}
        />
      </TopicFlowViewContainer>
    );
  }
);

export const ConnectedTopicFlowView = withWidget(TopicFlowView);

const TopicFlowViewContainer = styled.div``;

TopicFlowView.displayName = 'TopicFlowView';

export default TopicFlowView;
