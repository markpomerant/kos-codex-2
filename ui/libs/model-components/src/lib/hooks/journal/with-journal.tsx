import { JournalModel } from '@kos-codex-2/core-concept-models';
import { useJournal } from './use-journal';

interface JournalProps {
  journal: JournalModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Journal to a component
export function withJournal<T extends JournalProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithJournal = (props: Omit<T, keyof JournalProps>) => {
    const { model, status, KosModelLoader } = useJournal(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} journal={model} />
      </KosModelLoader>
    );
  };

  ComponentWithJournal.displayName = `WithJournal(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithJournal;
}
