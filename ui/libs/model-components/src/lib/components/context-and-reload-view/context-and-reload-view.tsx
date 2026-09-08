import styled from '@emotion/styled';

import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';
import type { DocumentModel } from '@kos-codex-2/core-concept-models';

import { withDocument } from '../../hooks/document';
import { Readout } from '../../readout';

const log = KosLog.createLogger({ name: 'context-and-reload-view' });
log.debug('context-and-reload-view component loaded');

interface Props {
  id: string;
  document: DocumentModel;
}

// extract-code context-and-reload-view
export const ContextAndReloadView: React.FunctionComponent<Props> = kosComponent(
  ({ document }: Props) => {
    return (
      <ContextAndReloadViewContainer>
        <Readout
          rows={[
            ['reloads', document.reloads],
            ['notes', document.notes.data.length],
            ['contextNote', document.contextNote],
          ]}
        />
      </ContextAndReloadViewContainer>
    );
  }
);

export const ConnectedContextAndReloadView = withDocument(ContextAndReloadView);

const ContextAndReloadViewContainer = styled.div`
  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
    font-family: system-ui, sans-serif;
    font-size: 0.9rem;
  }
`;

ContextAndReloadView.displayName = 'ContextAndReloadView';

export default ContextAndReloadView;
