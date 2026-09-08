import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { SessionModel } from '@kos-codex-2/core-concept-models';

import { withSession } from '../../hooks/session';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'logging-view' });
log.debug('logging-view component loaded');

interface Props {
  id: string;
  session: SessionModel;
}

// extract-code logging-view
export const LoggingView: React.FunctionComponent<Props> = kosComponent(
  ({ session }: Props) => {
    return (
      <LoggingViewContainer>
        <Readout rows={[['session', session.id], ['lines logged', session.lines]]} />
      </LoggingViewContainer>
    );
  }
);

export const ConnectedLoggingView = withSession(LoggingView);

const LoggingViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

LoggingView.displayName = 'LoggingView';

export default LoggingView;
