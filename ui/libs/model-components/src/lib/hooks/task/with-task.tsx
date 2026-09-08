import { TaskModel } from '@kos-codex-2/core-concept-models';
import { useTask } from './use-task';

interface TaskProps {
  task: TaskModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Task to a component
export function withTask<T extends TaskProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithTask = (props: Omit<T, keyof TaskProps>) => {
    const { model, status, KosModelLoader } = useTask(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} task={model} />
      </KosModelLoader>
    );
  };

  ComponentWithTask.displayName = `WithTask(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithTask;
}
