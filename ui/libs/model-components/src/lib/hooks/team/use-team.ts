import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Team, TeamModel } from '@kos-codex-2/core-concept-models';

export const useTeam = (id: string) => {
  const modelId = id;
  const result = useKosModel<TeamModel>({
    modelId,
    modelType: Team.type,
    options: {},
  });

  return result;
};
