import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { SessionModel } from '@kos-codex-2/core-concept-models';
import { getKosCompanionModel } from '@kosdev-code/kos-ui-sdk';
import { Timer, type TimerModel } from '@kos-codex-2/core-concept-models';
import { withSession } from '../../hooks/session';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'companion-view' });
log.debug('companion-view component loaded');

interface Props {
  id: string;
  session: SessionModel;
}

// extract-code companion-view
export const CompanionView: React.FunctionComponent<Props> = kosComponent(
  ({ session }: Props) => {
    return (
      <CompanionViewContainer>
        <Readout
          rows={[
            ['session', session.id],
            ['user', session.user],
            ['timer', getKosCompanionModel<TimerModel>(session, Timer.type)?.id ?? '(none)'],
            ['timer.sessionUser', getKosCompanionModel<TimerModel>(session, Timer.type)?.sessionUser ?? ''],
          ]}
        />
      </CompanionViewContainer>
    );
  }
);

export const ConnectedCompanionView = withSession(CompanionView);

const CompanionViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

CompanionView.displayName = 'CompanionView';

export default CompanionView;
