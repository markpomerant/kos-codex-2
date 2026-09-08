import { TeamModel } from '@kos-codex-2/core-concept-models';
import { useTeam } from './use-team';

interface TeamProps {
  team: TeamModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Team to a component
export function withTeam<T extends TeamProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithTeam = (props: Omit<T, keyof TeamProps>) => {
    const { model, status, KosModelLoader } = useTeam(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} team={model} />
      </KosModelLoader>
    );
  };

  ComponentWithTeam.displayName = `WithTeam(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithTeam;
}
