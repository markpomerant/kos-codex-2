import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { JournalModel } from '@kos-codex-2/core-concept-models';

import { withJournal } from '../../hooks/journal';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'topic-catch-up-view' });
log.debug('topic-catch-up-view component loaded');

interface Props {
  id: string;
  journal: JournalModel;
}

// extract-code topic-catch-up-view
export const TopicCatchUpView: React.FunctionComponent<Props> = kosComponent(
  ({ journal }: Props) => {
    return (
      <TopicCatchUpViewContainer>
        <Readout
          rows={[
            ['notes', journal.data.length],
            ['deltasApplied', journal.deltasApplied],
            ['deltasSeen', journal.deltasSeen],
          ]}
        />
      </TopicCatchUpViewContainer>
    );
  }
);

export const ConnectedTopicCatchUpView = withJournal(TopicCatchUpView);

const TopicCatchUpViewContainer = styled.div``;

TopicCatchUpView.displayName = 'TopicCatchUpView';

export default TopicCatchUpView;
