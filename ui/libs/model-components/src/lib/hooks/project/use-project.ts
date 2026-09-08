import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Project, ProjectModel } from '@kos-codex-2/core-concept-models';

export const useProject = (id: string) => {
  const modelId = id;
  const result = useKosModel<ProjectModel>({
    modelId,
    modelType: Project.type,
    options: {},
  });

  return result;
};
