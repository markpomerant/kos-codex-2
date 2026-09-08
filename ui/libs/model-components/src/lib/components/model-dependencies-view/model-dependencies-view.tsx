import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { ProjectModel } from '@kos-codex-2/core-concept-models';

import { withProject } from '../../hooks/project';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'model-dependencies-view' });
log.debug('model-dependencies-view component loaded');

interface Props {
  id: string;
  project: ProjectModel;
}

// extract-code model-dependencies-view
export const ModelDependenciesView: React.FunctionComponent<Props> = kosComponent(
  ({ project }: Props) => {
    return (
      <ModelDependenciesViewContainer>
        <Readout
          rows={[
            ['teamId', project.teamId],
            ['teamSize', project.teamSize],
            ['counterState', project.counterState],
          ]}
        />
      </ModelDependenciesViewContainer>
    );
  }
);

export const ConnectedModelDependenciesView = withProject(ModelDependenciesView);

const ModelDependenciesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ModelDependenciesView.displayName = 'ModelDependenciesView';

export default ModelDependenciesView;
