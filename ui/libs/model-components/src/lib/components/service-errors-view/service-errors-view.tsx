import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { DocumentModel } from '@kos-codex-2/core-concept-models';

import { withDocument } from '../../hooks/document';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'service-errors-view' });
log.debug('service-errors-view component loaded');

interface Props {
  id: string;
  document: DocumentModel;
}

// extract-code service-errors-view
export const ServiceErrorsView: React.FunctionComponent<Props> = kosComponent(
  ({ document }: Props) => {
    return (
      <ServiceErrorsViewContainer>
        <Readout
          rows={[
            ['loadedNote', document.loadedNote],
            ['lastError', document.lastError],
          ]}
        />
      </ServiceErrorsViewContainer>
    );
  }
);

export const ConnectedServiceErrorsView = withDocument(ServiceErrorsView);

const ServiceErrorsViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ServiceErrorsView.displayName = 'ServiceErrorsView';

export default ServiceErrorsView;
