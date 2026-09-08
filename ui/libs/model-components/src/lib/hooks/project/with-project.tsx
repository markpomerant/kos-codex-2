import { ProjectModel } from '@kos-codex-2/core-concept-models';
import { useProject } from './use-project';

interface ProjectProps {
  project: ProjectModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Project to a component
export function withProject<T extends ProjectProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithProject = (props: Omit<T, keyof ProjectProps>) => {
    const { model, status, KosModelLoader } = useProject(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} project={model} />
      </KosModelLoader>
    );
  };

  ComponentWithProject.displayName = `WithProject(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithProject;
}
