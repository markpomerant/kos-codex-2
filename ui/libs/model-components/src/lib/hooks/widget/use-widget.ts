import { useKosModel } from '@kosdev-code/kos-ui-sdk';
import { Widget, WidgetModel } from '@kos-codex-2/core-concept-models';

export const useWidget = (id: string) => {
  const modelId = id;
  const result = useKosModel<WidgetModel>({
    modelId,
    modelType: Widget.type,
    options: {},
  });

  return result;
};
