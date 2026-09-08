import styled from '@emotion/styled';

import { kosComponent, KosLog, useViewModel } from '@kosdev-code/kos-ui-sdk';
import type { WidgetModel } from '@kos-codex-2/core-concept-models';
import { WidgetTemperatureViewModel } from '@kos-codex-2/core-concept-models';

import { withWidget } from '../../hooks/widget';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'view-models-view' });
log.debug('view-models-view component loaded');

interface Props {
  id: string;
  widget: WidgetModel;
}

// extract-code view-models-view
/** The data model arrives as a prop; the ViewModel is created for this
 *  component instance and holds only what the panel needs. */
export const ViewModelsView: React.FunctionComponent<Props> = kosComponent(
  ({ widget }: Props) => {
    const { viewModel: vm } = useViewModel(
      () => new WidgetTemperatureViewModel(widget),
      [widget]
    );
    return (
      <ViewModelsViewContainer>
        <Readout
          rows={[
            ['display', vm.display],
            ['isHot', vm.isHot],
            ['unit', vm.unit],
          ]}
        />
        <button onClick={() => vm.toggleUnit()}>toggle unit</button>
      </ViewModelsViewContainer>
    );
  }
);

export const ConnectedViewModelsView = withWidget(ViewModelsView);

const ViewModelsViewContainer = styled.div``;

ViewModelsView.displayName = 'ViewModelsView';

export default ViewModelsView;
