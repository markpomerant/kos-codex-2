import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { TeamModel } from '@kos-codex-2/core-concept-models';

import { withTeam } from '../../hooks/team';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'container-models-view' });
log.debug('container-models-view component loaded');

interface Props {
  id: string;
  team: TeamModel;
}

// extract-code container-models-view
export const ContainerModelsView: React.FunctionComponent<Props> = kosComponent(
  ({ team }: Props) => {
    return (
      <ContainerModelsViewContainer>
        <Readout
          rows={[
            ['id', team.id],
            ['leadName', team.leadName],
            ['members', team.data.length],
          ]}
        />
        <ul>
          {team.data.map((user) => (
            <li key={user.id}>
              {user.name} <i>({user.role})</i>
            </li>
          ))}
        </ul>
      </ContainerModelsViewContainer>
    );
  }
);

export const ConnectedContainerModelsView = withTeam(ContainerModelsView);

const ContainerModelsViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ContainerModelsView.displayName = 'ContainerModelsView';

export default ContainerModelsView;
