import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { ProjectModel } from '@kos-codex-2/core-concept-models';

import { withProject } from '../../hooks/project';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'project-sync-view' });
log.debug('project-sync-view component loaded');

interface Props {
  id: string;
  project: ProjectModel;
}

// extract-code project-sync-view
export const ProjectSyncView: React.FunctionComponent<Props> = kosComponent(
  ({ project }: Props) => {
    return (
      <ProjectSyncViewContainer>
        <Readout
          rows={[
            ['status', project.status],
            ['progress', `${project.progress ?? 0}%`],
            ['isRunning', project.isRunning],
            ['lastSync', project.lastSync],
          ]}
        />
      </ProjectSyncViewContainer>
    );
  }
);

export const ConnectedProjectSyncView = withProject(ProjectSyncView);

const ProjectSyncViewContainer = styled.div``;

ProjectSyncView.displayName = 'ProjectSyncView';

export default ProjectSyncView;
