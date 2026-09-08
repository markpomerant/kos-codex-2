import { DocumentModel } from '@kos-codex-2/core-concept-models';
import { useDocument } from './use-document';

interface DocumentProps {
  document: DocumentModel;
}

interface Identifiable {
  id: string;
}

// react HOC to provide a Document to a component
export function withDocument<T extends DocumentProps & Identifiable>(
  WrappedComponent: React.ComponentType<T>
) {
  const ComponentWithDocument = (props: Omit<T, keyof DocumentProps>) => {
    const { model, status, KosModelLoader } = useDocument(props.id);

    return (
      <KosModelLoader {...status}>
        <WrappedComponent {...(props as any)} document={model} />
      </KosModelLoader>
    );
  };

  ComponentWithDocument.displayName = `WithDocument(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithDocument;
}
