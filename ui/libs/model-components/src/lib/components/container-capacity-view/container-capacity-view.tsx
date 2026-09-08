import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { ProjectModel } from '@kos-codex-2/core-concept-models';

import { withProject } from '../../hooks/project';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'container-capacity-view' });
log.debug('container-capacity-view component loaded');

interface Props {
  id: string;
  project: ProjectModel;
}

// extract-code container-capacity-view
export const ContainerCapacityView: React.FunctionComponent<Props> = kosComponent(
  ({ project }: Props) => {
    return (
      <ContainerCapacityViewContainer>
        <Readout
          rows={[
            ['tasks', project.tasks.data.length],
            ['evicted', project.evicted],
          ]}
        />
        <ul>
          {project.tasks.data.map((task) => (
            <li key={task.id}>
              {task.name} {task.done ? '(done)' : ''}
            </li>
          ))}
        </ul>
      </ContainerCapacityViewContainer>
    );
  }
);

export const ConnectedContainerCapacityView = withProject(ContainerCapacityView);

const ContainerCapacityViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ContainerCapacityView.displayName = 'ContainerCapacityView';

export default ContainerCapacityView;
