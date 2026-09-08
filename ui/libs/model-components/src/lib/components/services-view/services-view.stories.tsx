import type { Meta, StoryObj } from "@storybook/react-vite";
import type { DocumentModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withDocument } from "../../hooks/document";
import { ConnectedServicesView } from "./services-view";

const meta: Meta<typeof ConnectedServicesView> = {
  component: ConnectedServicesView,
  title: "Services/Services/Document",
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
      {
        label: "modify first",
        run: () => {
          const first = document.notes.data[0];
          if (first) void document.modifyNote(first.id);
        },
      },
      {
        label: "remove last",
        run: () => {
          const last = document.notes.data[document.notes.data.length - 1];
          if (last) void document.removeNote(last.id);
        },
      },
    ]}
  />
));

// extract-code services-view-story
export const ServicesStory: StoryObj<typeof ConnectedServicesView> = {
  render: () => (
    <>
      <ConnectedServicesView id="doc-services" />
      <Actions id="doc-services" />
    </>
  ),
};
