import { UserModel } from '@kos-codex-2/core-concept-models';
import { useUser } from './use-user';

interface UserProps {
  user: UserModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a User to a component
export function withUser<T extends UserProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithUser = (props: Omit<T, keyof UserProps>) => {
    const { model, status, KosModelLoader } = useUser(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} user={model} />
      </KosModelLoader>
    );
  };

  ComponentWithUser.displayName = `WithUser(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithUser;
}
