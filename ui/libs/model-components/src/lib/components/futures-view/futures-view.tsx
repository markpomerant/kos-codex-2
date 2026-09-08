import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { TaskModel } from '@kos-codex-2/core-concept-models';

import { withTask } from '../../hooks/task';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'futures-view' });
log.debug('futures-view component loaded');

interface Props {
  id: string;
  task: TaskModel;
}

// extract-code futures-view
export const FuturesView: React.FunctionComponent<Props> = kosComponent(
  ({ task }: Props) => {
    return (
      <FuturesViewContainer>
        <Readout
          rows={[
            ['status', task.status],
            ['progress', `${task.progress ?? 0}%`],
            ['isRunning', task.isRunning],
            ['isCancelled', task.isCancelled],
            ['lastUpdate', task.lastUpdate],
            ['done', task.done],
          ]}
        />
      </FuturesViewContainer>
    );
  }
);

export const ConnectedFuturesView = withTask(FuturesView);

const FuturesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

FuturesView.displayName = 'FuturesView';

export default FuturesView;
