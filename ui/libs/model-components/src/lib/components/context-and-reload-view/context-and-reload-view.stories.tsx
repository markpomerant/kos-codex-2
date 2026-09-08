import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DocumentModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withDocument } from "../../hooks/document";
import { ConnectedContextAndReloadView } from "./context-and-reload-view";

const meta: Meta<typeof ConnectedContextAndReloadView> = {
  component: ConnectedContextAndReloadView,
  title: "Lifecycle/Context And Reload/Document",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withDocument(({ document }: { id: string; document: DocumentModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "reload()", run: () => document.reload() },
      { label: "describeContext()", run: () => document.describeContext(`call ${(n += 1)}`) },
    ]}
  />
));

// extract-code context-and-reload-view-story
export const ContextAndReloadStory: StoryObj<typeof ConnectedContextAndReloadView> = {
  render: () => (
    <>
      <ConnectedContextAndReloadView id="doc-context" />
      <Actions id="doc-context" />
    </>
  ),
};
