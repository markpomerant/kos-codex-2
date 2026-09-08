import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { SessionModel } from '@kos-codex-2/core-concept-models';
import { getKosCompanionModel } from '@kosdev-code/kos-ui-sdk';
import { Timer, type TimerModel } from '@kos-codex-2/core-concept-models';

// extract-code multi-futures-view
const timer = (session: SessionModel): TimerModel | undefined =>
  getKosCompanionModel<TimerModel>(session, Timer.type);
import { withSession } from '../../hooks/session';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'multi-futures-view' });
log.debug('multi-futures-view component loaded');

interface Props {
  id: string;
  session: SessionModel;
}

// extract-code multi-futures-view
export const MultiFuturesView: React.FunctionComponent<Props> = kosComponent(
  ({ session }: Props) => {
    return (
      <MultiFuturesViewContainer>
        <Readout
          rows={[
            ['short', `${timer(session)?.shortStatus ?? ''} ${timer(session)?.shortProgress ?? 0}%`],
            ['long', `${timer(session)?.longStatus ?? ''} ${timer(session)?.longProgress ?? 0}%`],
            ['lastUpdate', timer(session)?.lastUpdate ?? ''],
          ]}
        />
      </MultiFuturesViewContainer>
    );
  }
);

export const ConnectedMultiFuturesView = withSession(MultiFuturesView);

const MultiFuturesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

MultiFuturesView.displayName = 'MultiFuturesView';

export default MultiFuturesView;
