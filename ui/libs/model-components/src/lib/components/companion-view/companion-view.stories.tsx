import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SessionModel } from "@kos-codex-2/core-concept-models";

import { EventPublisher } from "../../event-publisher";
import { withSession } from "../../hooks/session";
import { ConnectedCompanionView } from "./companion-view";

const meta: Meta<typeof ConnectedCompanionView> = {
  component: ConnectedCompanionView,
  title: "Relationships/Companion Models/Session",
  tags: ["!dev", "!autodocs"],
};

export default meta;

let n = 0;

// Story apparatus: the "user" strip calls methods on the same model instance
// the view renders. It receives the model through the generated HOC too.
const Actions = withSession((_props: { id: string; session: SessionModel }) => (
  <EventPublisher
    label="user"
    actions={[
      { label: "(the timer was created with the session)", run: () => undefined },
    ]}
  />
));

// extract-code companion-view-story
export const CompanionStory: StoryObj<typeof ConnectedCompanionView> = {
  render: () => (
    <>
      <ConnectedCompanionView id="session-companion" />
      <Actions id="session-companion" />
    </>
  ),
};
