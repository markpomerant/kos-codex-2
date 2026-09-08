import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DocumentModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withDocument } from "../../hooks/document";
import { ConnectedServiceErrorsView } from "./service-errors-view";

const meta: Meta<typeof ConnectedServiceErrorsView> = {
  component: ConnectedServiceErrorsView,
  title: "Services/Service Errors/Document",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;
const NAMES = ["Ada", "Grace", "Linus", "Barbara", "Ken"];

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withDocument(({ document }: { id: string; document: DocumentModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "load note 1", run: () => document.loadNote("1") },
      { label: "load note 999 (unknown id)", run: () => document.loadNote("999") },
      { label: "load note abc (malformed id)", run: () => document.loadNote("abc") },
    ]}
  />
));

// extract-code service-errors-view-story
export const ServiceErrorsStory: StoryObj<typeof ConnectedServiceErrorsView> = {
  render: () => (
    <>
      <ConnectedServiceErrorsView id="doc-errors" />
      <Actions id="doc-errors" />
    </>
  ),
};
