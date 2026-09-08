import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { SprintModel } from '@kos-codex-2/core-concept-models';

import { withSprint } from '../../hooks/sprint';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'dedicated-container-view' });
log.debug('dedicated-container-view component loaded');

interface Props {
  id: string;
  sprint: SprintModel;
}

// extract-code dedicated-container-view
export const DedicatedContainerView: React.FunctionComponent<Props> =
  kosComponent(({ sprint }: Props) => {
    return (
      <DedicatedContainerViewContainer>
        <Readout
          rows={[
            ['sprint', sprint.id],
            ['tickets', sprint.ticketList.length],
            ['open', sprint.openCount],
          ]}
        />
        <ul>
          {sprint.ticketList.map((ticket) => (
            <li key={ticket.id} data-done={ticket.done}>
              {ticket.done ? <s>{ticket.desc}</s> : ticket.desc}{' '}
              <i>sprintId from context = {ticket.sprintId}</i>
            </li>
          ))}
        </ul>
      </DedicatedContainerViewContainer>
    );
  });

export const ConnectedDedicatedContainerView = withSprint(DedicatedContainerView);

const DedicatedContainerViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

DedicatedContainerView.displayName = 'DedicatedContainerView';

export default DedicatedContainerView;
