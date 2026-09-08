import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'topic-addressing-view' });
log.debug('topic-addressing-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code topic-addressing-view
export const TopicAddressingView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    return (
      <TopicAddressingViewContainer>
        <Readout
          rows={[
            ['wildcardPath', widget.wildcardPath],
            ['addressedEvents', widget.addressedEvents],
          ]}
        />
      </TopicAddressingViewContainer>
    );
  }
);

export const ConnectedTopicAddressingView = withWidget(TopicAddressingView);

const TopicAddressingViewContainer = styled.div``;

TopicAddressingView.displayName = 'TopicAddressingView';

export default TopicAddressingView;
