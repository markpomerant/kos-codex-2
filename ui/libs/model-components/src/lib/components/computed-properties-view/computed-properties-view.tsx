import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { ProjectModel } from '@kos-codex-2/core-concept-models';

import { withProject } from '../../hooks/project';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'computed-properties-view' });
log.debug('computed-properties-view component loaded');

interface Props {
  id: string;
  project: ProjectModel;
}

const BAND_COLOR = { cold: '#6b8fd6', warm: '#d6a23a', hot: '#c0504d' } as const;

// extract-code computed-properties-view
export const ComputedPropertiesView: React.FunctionComponent<Props> = kosComponent(
  ({ project }: Props) => {
    return (
      <ComputedPropertiesViewContainer
        parity={project.counterParity}
        band={BAND_COLOR[project.temperatureBand]}
      >
        <Readout
          rows={[
            ['teamSize (from the team)', project.teamSize],
            ['counterParity (from the counter)', project.counterParity],
            ['temperatureBand (from the widget)', project.temperatureBand],
          ]}
        />
      </ComputedPropertiesViewContainer>
    );
  }
);

export const ConnectedComputedPropertiesView = withProject(ComputedPropertiesView);

// The panel's background follows the counter's parity and its border the
// widget's temperature band: both are computed properties of the project.
const ComputedPropertiesViewContainer = styled.div<{ parity: 'even' | 'odd'; band: string }>`
  padding: 0.5rem;
  border-left: 6px solid ${(p) => p.band};
  background: ${(p) => (p.parity === 'even' ? 'rgba(107, 143, 214, 0.12)' : 'rgba(214, 162, 58, 0.15)')};
`;

ComputedPropertiesView.displayName = 'ComputedPropertiesView';

export default ComputedPropertiesView;
