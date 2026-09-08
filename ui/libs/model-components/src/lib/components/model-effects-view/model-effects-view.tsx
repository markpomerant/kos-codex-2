import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { CounterModel } from '@kos-codex-2/core-concept-models';

import { withCounter } from '../../hooks/counter';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'model-effects-view' });
log.debug('model-effects-view component loaded');

interface Props {
  id: string;
  counter: CounterModel;
}

// extract-code model-effects-view
export const ModelEffectsView: React.FunctionComponent<Props> = kosComponent(
  ({ counter }: Props) => {
    return (
      <ModelEffectsViewContainer>
        <Readout
          rows={[
            ['count', counter.count],
            ['milestone', counter.milestone],
          ]}
        />
      </ModelEffectsViewContainer>
    );
  }
);

export const ConnectedModelEffectsView = withCounter(ModelEffectsView);

const ModelEffectsViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ModelEffectsView.displayName = 'ModelEffectsView';

export default ModelEffectsView;
