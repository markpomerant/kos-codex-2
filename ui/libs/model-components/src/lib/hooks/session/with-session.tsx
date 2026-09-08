import { SessionModel } from '@kos-codex-2/core-concept-models';
import { useSession } from './use-session';

interface SessionProps {
  session: SessionModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Session to a component
export function withSession<T extends SessionProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithSession = (props: Omit<T, keyof SessionProps>) => {
    const { model, status, KosModelLoader } = useSession(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} session={model} />
      </KosModelLoader>
    );
  };

  ComponentWithSession.displayName = `WithSession(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithSession;
}
