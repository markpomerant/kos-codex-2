import { SprintModel } from '@kos-codex-2/core-concept-models';
import { useSprint } from './use-sprint';

interface SprintProps {
  sprint: SprintModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Sprint to a component
export function withSprint<T extends SprintProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithSprint = (props: Omit<T, keyof SprintProps>) => {
    const { model, status, KosModelLoader } = useSprint(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} sprint={model} />
      </KosModelLoader>
    );
  };

  ComponentWithSprint.displayName = `WithSprint(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithSprint;
}
