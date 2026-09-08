import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { DocumentModel } from '@kos-codex-2/core-concept-models';

import { withDocument } from '../../hooks/document';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'service-mapping-view' });
log.debug('service-mapping-view component loaded');

interface Props {
  id: string;
  document: DocumentModel;
}

// extract-code service-mapping-view
export const ServiceMappingView: React.FunctionComponent<Props> = kosComponent(
  ({ document }: Props) => {
    return (
      <ServiceMappingViewContainer>
        <Readout rows={[['notes', document.notes.data.length]]} />
        <ul>
          {document.notes.data.map((note) => (
            <li key={note.id}>
              #{note.id}: {note.desc}
            </li>
          ))}
        </ul>
      </ServiceMappingViewContainer>
    );
  }
);

export const ConnectedServiceMappingView = withDocument(ServiceMappingView);

const ServiceMappingViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ServiceMappingView.displayName = 'ServiceMappingView';

export default ServiceMappingView;
