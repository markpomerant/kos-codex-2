import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { SessionModel } from '@kos-codex-2/core-concept-models';

import { withSession } from '../../hooks/session';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'state-machine-view' });
log.debug('state-machine-view component loaded');

interface Props {
  id: string;
  session: SessionModel;
}

// extract-code state-machine-view
export const StateMachineView: React.FunctionComponent<Props> = kosComponent(
  ({ session }: Props) => {
    return (
      <StateMachineViewContainer>
        <Readout
          rows={[
            ['currentState', session.currentState],
            ['isFsmInitialized', session.isFsmInitialized],
            ['journal', session.journal],
          ]}
        />
      </StateMachineViewContainer>
    );
  }
);

export const ConnectedStateMachineView = withSession(StateMachineView);

const StateMachineViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

StateMachineView.displayName = 'StateMachineView';

export default StateMachineView;
