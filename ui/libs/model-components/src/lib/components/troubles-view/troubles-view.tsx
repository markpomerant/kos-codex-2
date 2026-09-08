import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { SessionModel } from '@kos-codex-2/core-concept-models';

import { withSession } from '../../hooks/session';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'troubles-view' });
log.debug('troubles-view component loaded');

interface Props {
  id: string;
  session: SessionModel;
}

// extract-code troubles-view
export const TroublesView: React.FunctionComponent<Props> = kosComponent(
  ({ session }: Props) => {
    return (
      <TroublesViewContainer>
        <Readout
          rows={[
            ['path', session.path],
            ['troubles', session.troubles.length],
          ]}
        />
        <ul>
          {session.troubles.map((t) => (
            <li key={t.id}>
              {t.type}: {t.reason}
            </li>
          ))}
        </ul>
      </TroublesViewContainer>
    );
  }
);

export const ConnectedTroublesView = withSession(TroublesView);

const TroublesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

TroublesView.displayName = 'TroublesView';

export default TroublesView;
