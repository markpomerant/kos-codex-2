import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Journal, JournalModel } from '@kos-codex-2/core-concept-models';

export const useJournal = (id: string) => {
  const modelId = id;
  const result = useKosModel<JournalModel>({
    modelId,
    modelType: Journal.type,
    options: {},
  });

  return result;
};
