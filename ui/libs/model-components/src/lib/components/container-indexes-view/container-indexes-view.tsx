import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { TeamModel } from '@kos-codex-2/core-concept-models';

import { withTeam } from '../../hooks/team';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'container-indexes-view' });
log.debug('container-indexes-view component loaded');

interface Props {
  id: string;
  team: TeamModel;
}

// extract-code container-indexes-view
export const ContainerIndexesView: React.FunctionComponent<Props> = kosComponent(
  ({ team }: Props) => {
    return (
      <ContainerIndexesViewContainer>
        <Readout
          rows={[
            ['admins', team.membersByRole('admin').map((u) => u.name).join(', ')],
            ['members', team.membersByRole('member').map((u) => u.name).join(', ')],
            ['initials', team.initials.join(' ')],
          ]}
        />
      </ContainerIndexesViewContainer>
    );
  }
);

export const ConnectedContainerIndexesView = withTeam(ContainerIndexesView);

const ContainerIndexesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ContainerIndexesView.displayName = 'ContainerIndexesView';

export default ContainerIndexesView;
