import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Sprint, SprintModel } from '@kos-codex-2/core-concept-models';

export const useSprint = (id: string) => {
  const modelId = id;
  const result = useKosModel<SprintModel>({
    modelId,
    modelType: Sprint.type,
    options: {},
  });

  return result;
};
