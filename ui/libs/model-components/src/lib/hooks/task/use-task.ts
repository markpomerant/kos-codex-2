import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Task, TaskModel } from '@kos-codex-2/core-concept-models';

export const useTask = (id: string) => {
  const modelId = id;
  const result = useKosModel<TaskModel>({
    modelId,
    modelType: Task.type,
    options: {},
  });

  return result;
};
