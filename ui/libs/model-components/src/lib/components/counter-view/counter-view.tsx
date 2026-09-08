import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { CounterModel } from '@kos-codex-2/core-concept-models';

import { withCounter } from '../../hooks/counter';

const log = KosLog.createLogger({ name: 'counter-view' });
log.debug('counter-view component loaded');

interface Props {
  id: string;
  counter: CounterModel;
}

// extract-code counter-view
export const CounterView: React.FunctionComponent<Props> = kosComponent(
  ({ counter }: Props) => {
    return (
      <CounterViewContainer>
        <output data-testid="count">{counter.count}</output>
        <button onClick={() => counter.decrement()} disabled={counter.isAtFloor}>
          −
        </button>
        <button onClick={() => counter.increment()}>+</button>
        <button onClick={() => counter.reset()}>reset</button>
      </CounterViewContainer>
    );
  }
);

// extract-code counter-view-connected
export const ConnectedCounterView = withCounter(CounterView);

const CounterViewContainer = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  font-family: system-ui, sans-serif;
  output {
    min-width: 2.5rem;
    text-align: center;
    font-size: 1.5rem;
    font-variant-numeric: tabular-nums;
  }
`;

CounterView.displayName = 'CounterView';

export default CounterView;
