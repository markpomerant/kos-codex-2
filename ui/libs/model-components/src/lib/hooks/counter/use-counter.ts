import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Counter, CounterModel } from '@kos-codex-2/core-concept-models';

// extract-code use-counter
export const useCounter = (id: string) => {
  const modelId = id;
  const result = useKosModel<CounterModel>({
    modelId,
    modelType: Counter.type,
    options: {},
  });

  return result;
};
