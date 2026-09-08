import { CounterModel } from '@kos-codex-2/core-concept-models';
import { useCounter } from './use-counter';

interface CounterProps {
  counter: CounterModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Counter to a component
// extract-code with-counter
export function withCounter<T extends CounterProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithCounter = (props: Omit<T, keyof CounterProps>) => {
    const { model, status, KosModelLoader } = useCounter(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} counter={model} />
      </KosModelLoader>
    );
  };

  ComponentWithCounter.displayName = `WithCounter(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithCounter;
}
