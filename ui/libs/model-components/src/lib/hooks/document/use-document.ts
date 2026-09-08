import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Document, DocumentModel } from '@kos-codex-2/core-concept-models';

export const useDocument = (id: string) => {
  const modelId = id;
  const result = useKosModel<DocumentModel>({
    modelId,
    modelType: Document.type,
    options: {},
  });

  return result;
};
