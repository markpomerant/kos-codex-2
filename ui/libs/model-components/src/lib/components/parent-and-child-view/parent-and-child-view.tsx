import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { TeamModel } from '@kos-codex-2/core-concept-models';

import { withTeam } from '../../hooks/team';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'parent-and-child-view' });
log.debug('parent-and-child-view component loaded');

interface Props {
  id: string;
  team: TeamModel;
}

// extract-code parent-and-child-view
export const ParentAndChildView: React.FunctionComponent<Props> = kosComponent(
  ({ team }: Props) => {
    return (
      <ParentAndChildViewContainer>
        <Readout rows={[['team id', team.id]]} />
        <ul>
          {team.data.map((user) => (
            <li key={user.id}>
              {user.name}: teamId from context = <b>{user.teamId}</b>; parent
              model id = <b>{user.team?.id ?? 'undefined'}</b>
            </li>
          ))}
        </ul>
      </ParentAndChildViewContainer>
    );
  }
);

export const ConnectedParentAndChildView = withTeam(ParentAndChildView);

const ParentAndChildViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ParentAndChildView.displayName = 'ParentAndChildView';

export default ParentAndChildView;
