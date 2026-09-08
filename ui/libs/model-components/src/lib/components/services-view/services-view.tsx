import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { DocumentModel } from '@kos-codex-2/core-concept-models';

import { withDocument } from '../../hooks/document';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'services-view' });
log.debug('services-view component loaded');

interface Props {
  id: string;
  document: DocumentModel;
}

// extract-code services-view
export const ServicesView: React.FunctionComponent<Props> = kosComponent(
  ({ document }: Props) => {
    return (
      <ServicesViewContainer>
        <Readout
          rows={[
            ['notes', document.notes.data.length],
            ['lastError', document.lastError],
          ]}
        />
        <ul>
          {document.notes.data.map((note) => (
            <li key={note.id}>
              #{note.id}: {note.desc}
            </li>
          ))}
        </ul>
      </ServicesViewContainer>
    );
  }
);

export const ConnectedServicesView = withDocument(ServicesView);

const ServicesViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ServicesView.displayName = 'ServicesView';

export default ServicesView;
