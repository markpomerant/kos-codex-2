import { WidgetModel } from '@kos-codex-2/core-concept-models';
import { useWidget } from './use-widget';

interface WidgetProps {
  widget: WidgetModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Widget to a component
export function withWidget<T extends WidgetProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithWidget = (props: Omit<T, keyof WidgetProps>) => {
    const { model, status, KosModelLoader } = useWidget(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} widget={model} />
      </KosModelLoader>
    );
  };

  ComponentWithWidget.displayName = `WithWidget(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithWidget;
}
