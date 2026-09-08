import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { User, UserModel } from '@kos-codex-2/core-concept-models';

export const useUser = (id: string) => {
  const modelId = id;
  const result = useKosModel<UserModel>({
    modelId,
    modelType: User.type,
    options: {},
  });

  return result;
};
