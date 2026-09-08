import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Session, SessionModel } from '@kos-codex-2/core-concept-models';

export const useSession = (id: string) => {
  const modelId = id;
  const result = useKosModel<SessionModel>({
    modelId,
    modelType: Session.type,
    options: {},
  });

  return result;
};
