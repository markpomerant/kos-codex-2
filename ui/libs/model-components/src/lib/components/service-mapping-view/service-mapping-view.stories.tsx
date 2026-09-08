import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DocumentModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withDocument } from "../../hooks/document";
import { ConnectedServiceMappingView } from "./service-mapping-view";

const meta: Meta<typeof ConnectedServiceMappingView> = {
  component: ConnectedServiceMappingView,
  title: "Services/Service Mapping/Document",
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
      { label: "add note", run: () => document.addNote(`note ${(n += 1)}`) },
      { label: "reload", run: () => document.reloadNotes() },
    ]}
  />
));

// extract-code service-mapping-view-story
export const ServiceMappingStory: StoryObj<typeof ConnectedServiceMappingView> = {
  render: () => (
    <>
      <ConnectedServiceMappingView id="doc-mapping" />
      <Actions id="doc-mapping" />
    </>
  ),
};
